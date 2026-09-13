import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const { login } = useAuth()

  return (
    <div style={{
      minHeight: "100vh", background: "#0f172a",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "#1f2937", borderRadius: 16, padding: "48px 40px",
        textAlign: "center", maxWidth: 400, width: "100%",
        border: "1px solid #374151",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🏛</div>
        <h1 style={{ color: "#f9fafb", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          Chatbot Lịch sử Đảng
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          Trợ lý AI chuyên về Lịch sử Đảng Cộng sản Việt Nam.<br />
          Đăng nhập để lưu lịch sử trò chuyện của bạn.
        </p>
        <button onClick={login} style={{
          width: "100%", padding: "12px 24px", borderRadius: 10,
          background: "#fff", color: "#111827", border: "none",
          cursor: "pointer", fontSize: 15, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google" width={20} height={20}
          />
          Đăng nhập bằng Google
        </button>
      </div>
    </div>
  )
}
