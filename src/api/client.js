const API_URL = "https://unsightly-lived-polymer.ngrok-free.dev"; // "http://localhost:8000"

const headers = { "ngrok-skip-browser-warning": "true" }

export async function createConversation() {
  const res = await fetch(`${API_URL}/history/new`, { method: "POST", headers })
  const data = await res.json()
  return data.conversation_id
}

export async function sendMessage(conversationId, question) {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ conversation_id: conversationId, question }),
  })
  return res.json()
}

export async function getHistory(conversationId) {
  const res = await fetch(`${API_URL}/history/${conversationId}`, { headers })
  return res.json()
}

export async function deleteConversation(conversationId) {
  await fetch(`${API_URL}/history/${conversationId}`, { method: "DELETE", headers })
}
