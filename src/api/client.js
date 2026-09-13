const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"
const HEADERS = { "ngrok-skip-browser-warning": "true" }

export async function createConversation(userId) {
  const res = await fetch(`${API_URL}/history/new`, {
    method: "POST",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  })
  return (await res.json()).conversation_id
}

export async function sendMessage(conversationId, question, userId) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { ...HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ conversation_id: conversationId, question, user_id: userId }),
  })
  return res.json()
}

export async function getHistory(conversationId) {
  const res = await fetch(`${API_URL}/history/${conversationId}`, { headers: HEADERS })
  return res.json()
}

export async function getUserConversations(userId) {
  const res = await fetch(`${API_URL}/conversations/${userId}`, { headers: HEADERS })
  return res.json()
}

export async function deleteConversation(conversationId) {
  await fetch(`${API_URL}/history/${conversationId}`, { method: "DELETE", headers: HEADERS })
}
