import React, { useEffect, useState } from "react";
import { toWei, fromWei } from "web3-utils";
import "./maintoken.css";

const MainToken = (address, web3) => {
  const [recipientAddress, setRecipientAddress] = useState("");

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const [totalCost, setTotalCost] = useState("0");
  const [gasPrice, setGasPrice] = useState("0");
  const [weiAmount, setWeiAmount] = useState("0");

  const gasLimit = 21000;

  useEffect(() => {
    const fetchGasPrice = async () => {
      if (web3 && web3.eth) {
        try {
          const price = await web3.eth.getGasPrice();
          setGasPrice(price);
        } catch (error) {
          console.error("Error fetching gas price:", error);
        }
      } else {
        console.error("web3 is not initialized");
      }
    };
    fetchGasPrice();
  }, [web3]);

  const calculateTransactionCost = (amount, gasPrice, gasLimit) => {
    const gasFee = Number(gasPrice) * gasLimit;
    const weiAmount = toWei(amount, "ether");
    setWeiAmount(weiAmount);
    const totalCost =
      Number(fromWei(weiAmount, "ether")) +
      Number(fromWei(String(gasFee), "ether"));
    setTotalCost(String(totalCost));
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    calculateTransactionCost(newAmount, gasPrice, gasLimit);
  };

  const handleSendTransaction = async () => {
    if (!web3 || !recipientAddress || !amount || amount <= 0) {
      console.error("Invalid transaction parameters");
      return;
    }

    try {
      const tx = {
        from: address,
        to: recipientAddress,
        value: weiAmount,
        gas: gasLimit,
        gasPrice: gasPrice,
      };

      const transaction = await web3.eth.sendTransaction(tx);
      await transaction.wait();

      setStatus(`Transaction successful: ${transaction.hash}`);

      console.log("Transaction sent:", transaction.transactionHash);
      console.log("Coins sent successfully! Total cost:", totalCost);
    } catch (error) {
      console.error("Error sending coins:", error);
    }
  };

  return (
    <div>
      <h3>Main Token</h3>
      <div className="maintoken">
        <input
          type="text"
          placeholder="Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <div className="wallet-btn">
          <button onClick={handleSendTransaction}>Send</button>
        </div>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default MainToken;
