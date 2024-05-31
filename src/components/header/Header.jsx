import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { connectToMetamask } from "../Wallet/ConnectToMetamask";

const Header = () => {
  const handleConnectWallet = async () => {
    try {
      await connectToMetamask();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <header>
      <div className="main-container">
        <nav className="head_nav">
          <Link to="/" className="nav_logo">
            LOGO
          </Link>
          <ul className="nav_list">
            <li>
              <Link className="menu_link" to="/encrypter">
                encrypter
              </Link>
            </li>
            <li>
              <Link className="menu_link" to="/decrypter">
                decrypter
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/weblist">
                weblist
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/sha256">
                Generate SHA-256 Hash
              </Link>
            </li>
          </ul>

          <div className="wallet-btn">
            <button onClick={handleConnectWallet}>Сonnect Wallet</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
