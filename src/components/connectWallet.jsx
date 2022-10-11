import { useEffect } from "react";
import { createGlobalState } from "react-hooks-global-state";
import Render from "./Global/Render";

const initialState = { currentAccount: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function ConnectWallet() {
  // const [currentAccount, setCurrentAccount] = useState("");
  const [currentAccount, setCurrentAccount] = useGlobalState("currentAccount");
  const checkIfAccountChanged = async () => {
    try {
      const { ethereum } = window;
      ethereum.on("accountsChanged", (accounts) => {
        // console.log("Account changed to:", accounts[0]);
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("get metamask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log("connected!", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfAccountChanged();
  });
  return [currentAccount, connectWallet];
}
