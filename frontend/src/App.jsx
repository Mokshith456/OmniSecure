import { useState, useEffect } from "react";
import AttackerPanel from "./components/AttackerPanel";
import ClientPanel from "./components/ClientPanel";
import ReportModal from "./components/ReportModal";

function App() {
  const [smsData, setSmsData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const sendSms = async () => {
    const res = await fetch("http://localhost:5000/send_sms", {
      method: "POST",
    });
    const data = await res.json();
    setSmsData(data); // 📨 show the SMS immediately
    setTimeout(() => {
      setShowModal(true); // ⏳ after 2 seconds, show the report popup
    }, 10000);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="app-container" style={{
      display: "grid",
      gridTemplateColumns: "50% 50%",
      height: "100vh",
      width: "100%",
      margin: 0,
      padding: 0,
      overflow: "hidden",
      position: "relative",
      background: theme === "dark" ? "#1a1a2e" : "#f5f5f5",
      transition: "background 0.3s ease"
    }}>

      <div className="theme-toggle" style={{
        position: "absolute",
        top: "15px",
        right: "15px",
        zIndex: 100
      }}>
        <button onClick={toggleTheme} style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          color: theme === "dark" ? "#fff" : "#333"
        }}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{
        borderRight: "1px solid",
        borderColor: theme === "dark" ? "#2d3748" : "#e2e8f0",
        height: "100vh",
        transition: "border-color 0.3s ease"
      }}>
        <AttackerPanel sendSms={sendSms} theme={theme} />
      </div>

      <div style={{ height: "100vh" }}>
        <ClientPanel sms={smsData?.sms} theme={theme} />
      </div>

      {showModal && smsData && (
        <ReportModal
          data={smsData}
          onClose={() => setShowModal(false)}
          theme={theme}
        />
      )}
    </div>
  );
}

export default App;
