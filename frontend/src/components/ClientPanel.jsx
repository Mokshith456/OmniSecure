const ClientPanel = ({ sms, theme = "dark" }) => {
    const isDark = theme === "dark";
    
    return (
        <div style={{ 
            height: "100vh", 
            backgroundColor: isDark ? "#0f3460" : "#e8f5e9", 
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
                top: "15%",
                right: "10%",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: isDark ? "rgba(46, 213, 115, 0.05)" : "rgba(46, 213, 115, 0.1)",
                filter: "blur(40px)",
                zIndex: 0
            }}></div>
            
            <div style={{
                position: "absolute",
                bottom: "10%",
                left: "15%",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                background: isDark ? "rgba(46, 213, 115, 0.08)" : "rgba(46, 213, 115, 0.15)",
                filter: "blur(30px)",
                zIndex: 0
            }}></div>
            
            <div style={{
                zIndex: 1,
                textAlign: "center",
                position: "relative",
                width: "100%",
                maxWidth: "500px"
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
                        backgroundColor: isDark ? "#2ed573" : "#1e9651",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "15px",
                        boxShadow: isDark ? "0 0 15px rgba(46, 213, 115, 0.5)" : "0 0 10px rgba(46, 213, 115, 0.3)"
                    }}>
                        <span style={{ fontSize: "20px" }}>📱</span>
                    </div>
                    <h2 style={{ 
                        fontSize: "36px", 
                        fontWeight: "bold",
                        color: isDark ? "#ffffff" : "#333333",
                        marginBottom: "0"
                    }}>Client Panel</h2>
                </div>
                
                <div style={{
                    backgroundColor: isDark ? "#1e2a3a" : "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: isDark ? 
                        "0 8px 30px rgba(0, 0, 0, 0.3)" : 
                        "0 8px 30px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    transition: "all 0.3s ease",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "none"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}>
                        <div style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: sms ? "#2ed573" : "#f1c40f",
                            marginRight: "10px"
                        }}></div>
                        <h3 style={{
                            fontWeight: "600",
                            fontSize: "22px",
                            color: isDark ? "#e2e8f0" : "#2d3748",
                            margin: 0
                        }}>Incoming SMS:</h3>
                    </div>
                    
                    <div style={{
                        backgroundColor: isDark ? "rgba(0, 0, 0, 0.2)" : "#f8f9fa",
                        padding: "20px",
                        borderRadius: "8px",
                        border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid #e2e8f0",
                        minHeight: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <p style={{
                            color: isDark ? "#cbd5e0" : "#4a5568",
                            fontSize: "18px",
                            margin: 0,
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }}>
                            {sms || 
                                <span style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0.7
                                }}>
                                    <span style={{ marginRight: "10px" }}>Waiting for message...</span>
                                    <span className="loading-dots" style={{
                                        display: "inline-block",
                                        width: "16px",
                                        textAlign: "left"
                                    }}>
                                        <span style={{
                                            animation: "loadingDot 1.4s infinite",
                                            animationDelay: "0s"
                                        }}>.</span>
                                        <span style={{
                                            animation: "loadingDot 1.4s infinite",
                                            animationDelay: "0.2s"
                                        }}>.</span>
                                        <span style={{
                                            animation: "loadingDot 1.4s infinite",
                                            animationDelay: "0.4s"
                                        }}>.</span>
                                    </span>
                                </span>
                            }
                        </p>
                    </div>
                    
                    <div style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        opacity: 0.7
                    }}>
                        <div style={{
                            fontSize: "12px",
                            color: isDark ? "#a0aec0" : "#718096"
                        }}>
                            Security Status: Protected
                        </div>
                        <div style={{
                            fontSize: "12px",
                            color: isDark ? "#a0aec0" : "#718096"
                        }}>
                            OmniSecure v1.0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPanel;
