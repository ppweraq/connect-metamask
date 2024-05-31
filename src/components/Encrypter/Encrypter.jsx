import React, { useState } from "react";
import aesjs from "aes-js";

const Encrypter = () => {
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");

  const handleEncrypt = () => {
    const keyBytes = aesjs.utils.utf8.toBytes(key.padEnd(32).slice(0, 32));

    const textBytes = aesjs.utils.utf8.toBytes(inputText);

    const aesEcb = new aesjs.ModeOfOperation.ecb(keyBytes);

    const encryptedBytes = aesEcb.encrypt(aesjs.padding.pkcs7.pad(textBytes));

    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    setEncryptedText(encryptedHex);
  };

  return (
    <div className="wallet">
      <div className="wallet-content">
        <div className="decrypter">
          <h1>AES Encryption</h1>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encrypt"
          />
          <br />
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
          />
          <br />
          <div className="wallet-btn">
            <button onClick={handleEncrypt}>Encrypt</button>
          </div>
          <br />
          <textarea
            value={encryptedText}
            readOnly
            placeholder="Encrypted text will appear here"
          />
        </div>
      </div>
    </div>
  );
};

export default Encrypter;
