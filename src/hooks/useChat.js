import { useState, useCallback, useEffect } from "react"
import {
  createConversation, sendMessage, getHistory,
  getUserConversations, deleteConversation,
} from "../api/client"

export function useChat(user) {
  const [sessions, setSessions] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading]   = useState(false)

  const activeSession = sessions.find(s => s.id === activeId) || null

  useEffect(() => {
    if (!user) { setSessions([]); setActiveId(null); return }
    getUserConversations(user.uid).then(data => {
      const convs = (data.conversations || []).map(c => ({ id: c.id, title: c.title, messages: [] }))
      setSessions(convs)
    })
  }, [user])

  const newSession = useCallback(async () => {
    if (!user) return
    const id = await createConversation(user.uid)
    setSessions(prev => [{ id, title: "Cuộc trò chuyện mới", messages: [] }, ...prev])
    setActiveId(id)
    return id
  }, [user])

  const selectSession = useCallback(async (id) => {
    setActiveId(id)
    const session = sessions.find(s => s.id === id)
    if (session && session.messages.length === 0) {
      const data = await getHistory(id)
      setSessions(prev => prev.map(s => s.id === id ? { ...s, messages: data.messages || [] } : s))
    }
  }, [sessions])

  const sendQuestion = useCallback(async (question) => {
    if (!user) return
    let convId = activeId
    if (!convId) convId = await newSession()

    setSessions(prev => prev.map(s => s.id === convId ? {
      ...s,
      title: s.title === "Cuộc trò chuyện mới" ? question.slice(0, 40) : s.title,
      messages: [...s.messages, { role: "user", content: question }],
    } : s))

    setLoading(true)
    try {
      const data = await sendMessage(convId, question, user.uid)
      setSessions(prev => prev.map(s => s.id === convId ? {
        ...s, messages: [...s.messages, { role: "assistant", content: data.answer, sources: data.sources || [] }],
      } : s))
    } catch {
      setSessions(prev => prev.map(s => s.id === convId ? {
        ...s, messages: [...s.messages, { role: "assistant", content: "Lỗi kết nối. Vui lòng thử lại." }],
      } : s))
    } finally {
      setLoading(false)
    }
  }, [activeId, user, newSession])

  const removeSession = useCallback(async (id) => {
    await deleteConversation(id)
    setSessions(prev => prev.filter(s => s.id !== id))
    if (activeId === id) setActiveId(null)
  }, [activeId])

  return { sessions, activeSession, activeId, loading, newSession, selectSession, sendQuestion, removeSession }
}
