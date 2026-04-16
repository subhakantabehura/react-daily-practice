import { useState } from "react";

function SecretMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div >
      <h2>Secret Message</h2>

      <label>
        <input
          type="checkbox"
          onChange={(e) => setIsVisible(e.target.checked)}
        />
        Show Secret
      </label>

      {/* Conditional Rendering */}
      {isVisible && (
        <p style={{ marginTop: "10px", color: "green" }}>
          🤫 **Top Secret:** I will confirm you Tomorrow!
        </p>
      )}
    </div>
  );
}

export default SecretMessage;