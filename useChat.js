import { useState, useCallback } from "react"
import { createConversation, sendMessage, getHistory, deleteConversation } from "../api/client"

export function useChat() {
  const [sessions, setSessions] = useState([])          // [{id, title, messages[]}]
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(false)

  const activeSession = sessions.find(s => s.id === activeId) || null

  // Tạo phiên mới
  const newSession = useCallback(async () => {
    const id = await createConversation()
    const session = { id, title: "Cuộc trò chuyện mới", messages: [] }
    setSessions(prev => [session, ...prev])
    setActiveId(id)
    return id
  }, [])

  // Chọn phiên cũ + load lịch sử
  const selectSession = useCallback(async (id) => {
    setActiveId(id)
    const session = sessions.find(s => s.id === id)
    if (session && session.messages.length === 0) {
      const data = await getHistory(id)
      setSessions(prev => prev.map(s =>
        s.id === id ? { ...s, messages: data.messages || [] } : s
      ))
    }
  }, [sessions])

  // Gửi câu hỏi
  const sendQuestion = useCallback(async (question) => {
    let convId = activeId

    // Nếu chưa có phiên nào, tạo mới
    if (!convId) {
      convId = await newSession()
    }

    // Thêm message user vào UI ngay (optimistic update)
    const userMsg = { role: "user", content: question }
    setSessions(prev => prev.map(s =>
      s.id === convId
        ? {
            ...s,
            title: s.title === "Cuộc trò chuyện mới" ? question.slice(0, 40) : s.title,
            messages: [...s.messages, userMsg],
          }
        : s
    ))

    setLoading(true)
    try {
      const data = await sendMessage(convId, question)
      const assistantMsg = {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
      }
      setSessions(prev => prev.map(s =>
        s.id === convId
          ? { ...s, messages: [...s.messages, assistantMsg] }
          : s
      ))
    } catch (err) {
      const errMsg = { role: "assistant", content: "Lỗi kết nối tới server. Vui lòng thử lại." }
      setSessions(prev => prev.map(s =>
        s.id === convId ? { ...s, messages: [...s.messages, errMsg] } : s
      ))
    } finally {
      setLoading(false)
    }
  }, [activeId, newSession])

  // Xóa phiên
  const removeSession = useCallback(async (id) => {
    await deleteConversation(id)
    setSessions(prev => prev.filter(s => s.id !== id))
    if (activeId === id) setActiveId(null)
  }, [activeId])

  return { sessions, activeSession, activeId, loading, newSession, selectSession, sendQuestion, removeSession }
}
