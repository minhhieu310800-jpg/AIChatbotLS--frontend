import { Trash2, Plus, MessageSquare } from "lucide-react"

export default function Sidebar({ sessions, activeId, onNew, onSelect, onDelete }) {
  return (
    <aside style={{
      width: 260, minHeight: "100vh", background: "#111827",
      display: "flex", flexDirection: "column", padding: "16px 12px",
      borderRight: "1px solid #1f2937",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ color: "#f9fafb", fontSize: 15, fontWeight: 600, margin: "0 0 12px 4px" }}>
          🏛 Lịch sử Đảng
        </h2>
        <button onClick={onNew} style={{
          width: "100%", padding: "9px 12px", borderRadius: 8,
          background: "#1d4ed8", color: "#fff", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          fontSize: 14, fontWeight: 500,
        }}>
          <Plus size={16} /> Cuộc trò chuyện mới
        </button>
      </div>

      {/* Danh sách phiên */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {sessions.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: 13, textAlign: "center", marginTop: 32 }}>
            Chưa có cuộc trò chuyện nào
          </p>
        )}
        {sessions.map(s => (
          <div key={s.id} onClick={() => onSelect(s.id)} style={{
            padding: "9px 10px", borderRadius: 8, cursor: "pointer",
            background: s.id === activeId ? "#1f2937" : "transparent",
            display: "flex", alignItems: "center", gap: 8,
            border: s.id === activeId ? "1px solid #374151" : "1px solid transparent",
          }}>
            <MessageSquare size={14} color="#9ca3af" style={{ flexShrink: 0 }} />
            <span style={{
              flex: 1, color: "#d1d5db", fontSize: 13,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {s.title}
            </span>
            <button onClick={e => { e.stopPropagation(); onDelete(s.id) }} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#6b7280", padding: 2, borderRadius: 4, flexShrink: 0,
              display: "flex", alignItems: "center",
            }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}
