import React from "react";
import { useNavigate } from "react-router-dom";

function Failure() {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #fef2f2, #ffffff)",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    textAlign: "center",
  };

  const emojiStyle = {
    fontSize: "4rem",
    marginBottom: "1.5rem",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#b91c1c",
    marginBottom: "1rem",
  };

  const textStyle = {
    color: "#4b5563",
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "9999px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
  };

  const handleDashboardRedirect = () => {
    navigate("/");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={emojiStyle}>❌</div>
        <h1 style={headingStyle}>Payment Failed</h1>
        <p style={textStyle}>
          Unfortunately, your purchase could not be completed. Please try again
          or contact support if the issue persists.
        </p>
        <button style={buttonStyle} onClick={handleDashboardRedirect}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Failure;
