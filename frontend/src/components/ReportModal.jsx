const ReportModal = ({ data, onClose, theme = "dark" }) => {
  const isDark = theme === "dark";
  
  const getRiskColor = (level) => {
    if (isDark) {
      return level === 'High' ? '#f44336' : level === 'Medium' ? '#ff9800' : '#4caf50';
    } else {
      return level === 'High' ? '#e53e3e' : level === 'Medium' ? '#dd6b20' : '#38a169';
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)"
    }}>
      <div style={{
        backgroundColor: isDark ? "#1a1a2e" : "white",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: isDark ? 
          "0 25px 50px rgba(0,0,0,0.25)" : 
          "0 25px 50px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "550px",
        position: "relative",
        border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
        animation: "modalFadeIn 0.3s ease-out"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "25px"
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: isDark ? "#0f3460" : "#ebf8ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "15px"
          }}>
            <span style={{ fontSize: "20px" }}>🔍</span>
          </div>
          <h2 style={{ 
            fontSize: "28px", 
            fontWeight: "bold", 
            margin: 0,
            color: isDark ? "#e2e8f0" : "#2d3748"
          }}>Phishing Report</h2>
        </div>

        <div style={{
          backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#f8fafc",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{
                fontWeight: "600",
                color: isDark ? "#e2e8f0" : "#2d3748",
                marginRight: "10px"
              }}>Risk Level:</span>
              <span style={{ 
                fontWeight: "600", 
                color: getRiskColor(data.risk_level),
                backgroundColor: isDark ? 
                  `${getRiskColor(data.risk_level)}22` : 
                  `${getRiskColor(data.risk_level)}15`,
                padding: "4px 12px",
                borderRadius: "50px",
                fontSize: "14px"
              }}>
                {data.risk_level}
              </span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{
                fontWeight: "600",
                color: isDark ? "#e2e8f0" : "#2d3748",
                marginRight: "10px"
              }}>Score:</span>
              <span style={{
                fontWeight: "600",
                color: isDark ? "#e2e8f0" : "#2d3748",
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#edf2f7",
                padding: "4px 12px",
                borderRadius: "50px",
                fontSize: "14px"
              }}>
                {data.phishing_score}
              </span>
            </div>
          </div>

          <div style={{
            marginBottom: "15px"
          }}>
            <div style={{
              fontWeight: "600",
              color: isDark ? "#e2e8f0" : "#2d3748",
              marginBottom: "8px"
            }}>Keywords Detected:</div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px"
            }}>
              {data.keywords_detected && data.keywords_detected.length > 0 ? (
                data.keywords_detected.map((keyword, index) => (
                  <span key={index} style={{
                    backgroundColor: isDark ? "#16213e" : "#e6fffa",
                    color: isDark ? "#81e6d9" : "#319795",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    border: isDark ? "1px solid #234876" : "1px solid #b2f5ea"
                  }}>
                    {keyword}
                  </span>
                ))
              ) : (
                <span style={{
                  color: isDark ? "#a0aec0" : "#718096",
                  fontStyle: "italic"
                }}>None detected</span>
              )}
            </div>
          </div>

          <div style={{
            marginBottom: "15px"
          }}>
            <div style={{
              fontWeight: "600",
              color: isDark ? "#e2e8f0" : "#2d3748",
              marginBottom: "8px"
            }}>Suspicious Links:</div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px"
            }}>
              {data.suspicious_links && data.suspicious_links.length > 0 ? (
                data.suspicious_links.map((link, index) => (
                  <span key={index} style={{
                    backgroundColor: isDark ? "#3c1618" : "#fff5f5",
                    color: isDark ? "#fc8181" : "#e53e3e",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    border: isDark ? "1px solid #742a2a" : "1px solid #fed7d7"
                  }}>
                    {link}
                  </span>
                ))
              ) : (
                <span style={{
                  color: isDark ? "#a0aec0" : "#718096",
                  fontStyle: "italic"
                }}>None detected</span>
              )}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#f8fafc",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #e2e8f0"
        }}>
          <div style={{
            fontWeight: "600",
            color: isDark ? "#e2e8f0" : "#2d3748",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ marginRight: "8px" }}>Analysis</span>
            <div style={{
              height: "1px",
              flex: 1,
              backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"
            }}></div>
          </div>
          <p style={{
            color: isDark ? "#cbd5e0" : "#4a5568",
            lineHeight: "1.6",
            margin: 0
          }}>
            {data.explanation}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <button 
            onClick={onClose} 
            style={{
              padding: "10px 24px",
              backgroundColor: isDark ? "#3182ce" : "#4299e1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.2s ease",
              boxShadow: isDark ? 
                "0 4px 15px rgba(49, 130, 206, 0.3)" : 
                "0 4px 15px rgba(66, 153, 225, 0.3)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = isDark ? 
                "0 6px 20px rgba(49, 130, 206, 0.4)" : 
                "0 6px 20px rgba(66, 153, 225, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isDark ? 
                "0 4px 15px rgba(49, 130, 206, 0.3)" : 
                "0 4px 15px rgba(66, 153, 225, 0.3)";
            }}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
