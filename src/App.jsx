import { AuthProvider, useAuth } from "./context/AuthContext"
import { useChat } from "./hooks/useChat"
import Sidebar from "./components/Sidebar"
import ChatArea from "./components/ChatArea"
import LoginPage from "./components/LoginPage"

function AppContent() {
  const { user, loading, logout } = useAuth()
  const { sessions, activeSession, activeId, loading: chatLoading, newSession, selectSession, sendQuestion, removeSession } = useChat(user)

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#9ca3af" }}>Đang tải...</p>
    </div>
  )

  if (!user) return <LoginPage />

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Sidebar
        sessions={sessions}
        activeId={activeId}
        user={user}
        onNew={newSession}
        onSelect={selectSession}
        onDelete={removeSession}
        onLogout={logout}
      />
      <ChatArea
        session={activeSession}
        loading={chatLoading}
        onSend={sendQuestion}
      />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
