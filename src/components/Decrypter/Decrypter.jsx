import React, { useState } from "react";
import aesjs from "aes-js";
import "./decrypter.css";

const Decryptor = () => {
  const [encryptedText, setEncryptedText] = useState("");
  const [key, setKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const handleDecrypt = () => {
    try {
      const keyBytes = aesjs.utils.utf8.toBytes(key.padEnd(32).slice(0, 32));
      const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

      if (encryptedBytes.length % 16 !== 0) {
        throw new Error("Encrypted text length must be a multiple of 16 bytes");
      }

      const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);
      const decryptedBytes = aesEcb.decrypt(encryptedBytes);
      const decryptedText = aesjs.utils.utf8.fromBytes(
        aesjs.padding.pkcs7.strip(decryptedBytes)
      );

      setDecryptedText(decryptedText);
    } catch (error) {
      console.error("Decryption error:", error);
      setDecryptedText("Decryption failed: " + error.message);
    }
  };

  return (
    <div className="wallet">
      <div className="wallet-content">
        <div className="decrypter">
          <h1>AES Decryption</h1>
          <textarea
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            placeholder="Enter encrypted text"
          />
          <br />
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter decryption key"
          />
          <br />
          <div className="wallet-btn">
            <button onClick={handleDecrypt}>Decrypt</button>
          </div>
          <br />
          <textarea
            value={decryptedText}
            readOnly
            placeholder="Decrypted text will appear here"
          />
        </div>
      </div>
    </div>
  );
};

export default Decryptor;
