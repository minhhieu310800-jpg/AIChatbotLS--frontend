import Sidebar from "./components/Sidebar"
import ChatArea from "./components/ChatArea"
import { useChat } from "./hooks/useChat"

export default function App() {
  const { sessions, activeSession, loading, newSession, selectSession, sendQuestion, removeSession } = useChat()

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Sidebar
        sessions={sessions}
        activeId={activeSession?.id}
        onNew={newSession}
        onSelect={selectSession}
        onDelete={removeSession}
      />
      <ChatArea
        session={activeSession}
        loading={loading}
        onSend={sendQuestion}
      />
    </div>
  )
}
