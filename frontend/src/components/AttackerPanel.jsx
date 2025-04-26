const AttackerPanel = ({ sendSms, theme = "dark" }) => {
    const isDark = theme === "dark";
    
    return (
        <div style={{ 
            height: "100vh", 
            backgroundColor: isDark ? "#16213e" : "#ffebee", 
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Decorative elements */}
            <div style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: isDark ? "rgba(255, 0, 0, 0.05)" : "rgba(255, 0, 0, 0.1)",
                filter: "blur(40px)",
                zIndex: 0
            }}></div>
            
            <div style={{
                position: "absolute",
                bottom: "15%",
                right: "15%",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: isDark ? "rgba(255, 0, 0, 0.08)" : "rgba(255, 0, 0, 0.15)",
                filter: "blur(30px)",
                zIndex: 0
            }}></div>
            
            <div style={{
                zIndex: 1,
                textAlign: "center",
                position: "relative"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "30px"
                }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: isDark ? "#f44336" : "#d32f2f",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        boxShadow: isDark ? "0 0 15px rgba(244, 67, 54, 0.5)" : "0 0 10px rgba(244, 67, 54, 0.3)"
                    }}>
                        <span style={{ fontSize: "20px" }}>⚠️</span>
                    </div>
                    <h2 style={{ 
                        fontSize: "36px", 
                        fontWeight: "bold",
                        color: isDark ? "#ffffff" : "#333333",
                        marginBottom: "0"
                    }}>Attacker Panel</h2>
                </div>
                
                <p style={{
                    color: isDark ? "#b3b3b3" : "#666666",
                    marginBottom: "40px",
                    maxWidth: "400px"
                }}>
                    Launch a simulated phishing attack to test security awareness and response
                </p>
                
                <button
                    onClick={sendSms}
                    style={{
                        backgroundColor: isDark ? "#f44336" : "#d32f2f",
                        color: "white",
                        padding: "16px 32px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: isDark ? "0 4px 20px rgba(244, 67, 54, 0.3)" : "0 4px 15px rgba(211, 47, 47, 0.25)",
                        fontSize: "18px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        position: "relative",
                        overflow: "hidden"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = isDark ? 
                            "0 6px 25px rgba(244, 67, 54, 0.4)" : 
                            "0 6px 20px rgba(211, 47, 47, 0.35)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = isDark ? 
                            "0 4px 20px rgba(244, 67, 54, 0.3)" : 
                            "0 4px 15px rgba(211, 47, 47, 0.25)";
                    }}
                >
                    <span style={{ marginRight: "10px" }}>Launch Phishing SMS</span>
                    <span>🚀</span>
                </button>
            </div>
        </div>
    );
};

export default AttackerPanel;
