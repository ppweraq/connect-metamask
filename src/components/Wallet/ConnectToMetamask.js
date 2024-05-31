import Web3 from "web3";

let setWeb3, setAddress, setBalance;

export const connectToMetamask = async () => {
  const ethereum = window.ethereum;

  if (typeof window !== "undefined" && typeof ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });

      const web3Instance = new Web3(ethereum);
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setAddress(accounts[0]);

      const balanceOne = web3Instance.utils.fromWei(
        await web3Instance.eth.getBalance(accounts[0]),
        "ether"
      );
      const balanceNet = parseFloat(balanceOne);
      setBalance(balanceNet.toString());
    } catch (error) {
      console.error("Ошибка при подключении MetaMask", error);
    }
  } else {
    alert("Установите расширение Metamask");
  }
};

export const initializeWalletHooks = (web3Hook, addressHook, balanceHook) => {
  setWeb3 = web3Hook;
  setAddress = addressHook;
  setBalance = balanceHook;
};
