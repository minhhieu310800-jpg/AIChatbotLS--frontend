import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import Message from "./Message"

export default function ChatArea({ session, loading, onSend }) {
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  // Auto scroll xuống cuối mỗi khi có message mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [session?.messages])

  const handleSend = () => {
    const q = input.trim()
    if (!q || loading) return
    setInput("")
    onSend(q)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: "#0f172a", minHeight: "100vh",
    }}>
      {/* Vùng messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20%" }}>
        {!session || session.messages.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20vh", color: "#4b5563" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏛</div>
            <h3 style={{ color: "#9ca3af", fontWeight: 600, marginBottom: 8 }}>
              Chatbot Lịch sử Đảng Cộng sản Việt Nam
            </h3>
            <p style={{ fontSize: 14 }}>
              Đặt câu hỏi về lịch sử, đường lối, sự kiện hoặc nhân vật của Đảng.
            </p>
          </div>
        ) : (
          session.messages.map((msg, i) => <Message key={i} message={msg} />)
        )}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280", fontSize: 13 }}>
            <span>🏛 Trợ lý đang soạn câu trả lời</span>
            <span style={{ animation: "blink 1s infinite" }}>...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input box */}
      <div style={{ padding: "16px 20%", borderTop: "1px solid #1f2937", background: "#0f172a" }}>
        <div style={{
          display: "flex", gap: 10, alignItems: "flex-end",
          background: "#1f2937", borderRadius: 12, padding: "10px 14px",
          border: "1px solid #374151",
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Hỏi về Lịch sử Đảng Cộng sản Việt Nam..."
            rows={1}
            style={{
              flex: 1, background: "none", border: "none", outline: "none",
              color: "#f9fafb", fontSize: 14, resize: "none", lineHeight: 1.5,
              maxHeight: 120, overflowY: "auto",
            }}
            onInput={e => {
              e.target.style.height = "auto"
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            style={{
              background: input.trim() && !loading ? "#1d4ed8" : "#374151",
              border: "none", borderRadius: 8, padding: "8px 10px",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", color: "#fff",
              transition: "background 0.2s",
            }}
          >
            <Send size={16} />
          </button>
        </div>
        <p style={{ fontSize: 11, color: "#4b5563", textAlign: "center", marginTop: 8 }}>
          Trả lời dựa trên Giáo trình Lịch sử Đảng CSVN (2019) • Enter để gửi
        </p>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}
