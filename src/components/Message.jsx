export default function Message({ message }) {
  const isUser = message.role === "user"

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: isUser ? "flex-end" : "flex-start",
      marginBottom: 16,
    }}>
      {/* Label */}
      <span style={{ fontSize: 11, color: "#6b7280", marginBottom: 4, fontWeight: 500 }}>
        {isUser ? "Bạn" : "🏛 Trợ lý Lịch sử Đảng"}
      </span>

      {/* Bubble */}
      <div style={{
        maxWidth: "75%", padding: "12px 16px", borderRadius: 12,
        background: isUser ? "#1d4ed8" : "#1f2937",
        color: "#f9fafb", fontSize: 14, lineHeight: 1.65,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
        borderBottomRightRadius: isUser ? 4 : 12,
        borderBottomLeftRadius: isUser ? 12 : 4,
      }}>
        {message.content}
      </div>

      {/* Nguồn trích dẫn (chỉ hiển thị với assistant và có sources) */}
      {!isUser && message.sources && message.sources.length > 0 && (
        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {message.sources.map((src, i) => (
            <span key={i} style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 99,
              background: "#111827", color: "#9ca3af",
              border: "1px solid #374151",
            }}>
              📖 {src.chuong}{src.muc ? ` — ${src.muc}` : ""} (tr.{src.page_start})
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
