import React, { useEffect, useState } from "react";
import "./wallet.css";
import { connectToMetamask, initializeWalletHooks } from "./ConnectToMetamask";

const Wallet = () => {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    initializeWalletHooks(setWeb3, setAddress, setBalance);
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectToMetamask();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  return (
    <div className="wallet">
      <div className="wallet-content">
        <h1>Test App</h1>
        <div className="wallet-btn">
          <button className="" variant="outlined" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        </div>

        {web3 && address && (
          <div>
            <div>
              <p>{`Address: ${address}`}</p>
              <p>{`Balance: ${balance}`}</p>
            </div>
            {/* <MainToken address={address} web3={web3} /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
