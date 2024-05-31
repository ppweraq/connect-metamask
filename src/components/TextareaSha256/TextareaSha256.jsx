import React, { useState } from "react";
import { sha256 } from "js-sha256";

const TextareaSha256 = () => {
  const [inputText, setInputText] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");

  const handleCalculateHash = () => {
    try {
      const hash = sha256(inputText);
      setSha256Hash(hash);
    } catch (error) {
      console.error("Error calculating SHA256 hash:", error);
      setSha256Hash("Error calculating hash");
    }
  };

  return (
    <div className="wallet">
      <div className="wallet-content">
        <div className="decrypter">
          <h1>SHA256 Hash Calculator</h1>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text"
          />
          <br />
          <div className="wallet-btn">
            <button onClick={handleCalculateHash}>Generate</button>
          </div>
          <br />
          <div>
            <strong>Hash:</strong> {sha256Hash}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextareaSha256;
