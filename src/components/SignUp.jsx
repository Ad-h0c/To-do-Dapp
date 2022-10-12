import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, redirect, useNavigate } from "react-router-dom";
import ConnectWallet from "./connectWallet";
import UserName from "./Global/UserName";
import factoryAbi from "../utils/Factory.json";
import { ethers } from "ethers";
import BarLoader from "react-spinners/BarLoader";

export default function SignUp() {
  const [userName, setUserName] = UserName("");
  const [firstTask, setFirstTask] = useState("");
  const [copyStatus, setStatus] = useState("Copy Address");
  const [isloading, setLoading] = useState(false);
  const [currentAccount, connectWallet] = ConnectWallet();
  const navigate = useNavigate();

  const EtherScan = async () => {
    const { ethereum } = window;
    const chain_Id = await ethereum.request({ method: "net_version" });
    console.log(chain_Id);
    switch (chain_Id) {
      case "1":
        window.open(`https://etherscan.io/address/${currentAccount}`);
        break;
      case "5":
        window.open(`https://goerli.etherscan.io/address/${currentAccount}`);
        break;
      case "56":
        window.open(`https://bscscan.com/address/${currentAccount}`);
        break;
      case "97":
        window.open(`https://testnet.bscscan.com/address/${currentAccount}`);
        break;
    }
  };
  const copyAddress = () => {
    navigator.clipboard.writeText(currentAccount);
    setStatus("Copied");
    setInterval(() => {
      setStatus("Copy address");
    }, 1000);
  };

  const createAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const factoryAddress = "0x54c0e39E78F9Ad7241892c80DFf989B8aB80aA8c";
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        signer
      );
      setLoading(true);
      let tx = await factoryContract.createNewAccount(userName, firstTask);
      await tx.wait();
      let hash = tx.hash;
      if (hash.length > 0) {
        navigate("/login", { replace: true });
        setUserName("");
        setFirstTask("");
      }
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setLoading(false);
      setTimeout(() => {
        alert(error.reason);
      }, 500);
    }
  };

  const accountCreate = () => {
    if (userName == "" || firstTask == "") {
      alert("Enter the details!");
    } else {
      createAccount();
    }
  };
  return (
    <div className="flex flex-col items-center container">
      <div className="flex flex-col text-center md:w-[1200px] mt-10 md:pr-10 md:pl-10">
        <h1 className="text-3xl w-80 my-4 self-center font-bold md:font-extrabold md:w-[40rem] md:text-4xl md:tracking-widest">
          Now the life is better than ever.
        </h1>
        <h2 className="text-2xl px-10 font-semibold self-center my-10 md:px-60 leading-10">
          Use the <p className="inline text-Orange"> Todo App</p> to stay
          organised, and focused. Powered by blockchain, zero down-time and
          seamless experience.
        </h2>
        {!currentAccount ? (
          <div className="animate-fade-in-down w-80 h-80 top-1/4 border-2 border-Orange self-center cursor-pointer rounded-md shadow-2xl drop-shadow-2xl">
            <div className="flex flex-col justify-center">
              <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
                <Link to="/">
                  <ImCross className="fill-white hover:transition hover:ease-in-out hover:scale-110"></ImCross>
                </Link>
              </p>
              <button
                className="p-2 w-60 border-2 text-lg mt-24 self-center rounded-full border-darkBlue bg-white hover:scale-105 hover:transition hover:ease-in-out text-black font-bold "
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-down w-80 h-80 top-1/4 self-center cursor-pointer rounded-md drop-shadow-2xl select-none border-2 border-Orange">
            <div className="flex flex-col">
              <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
                <Link to="/">
                  <ImCross className="fill-white hover:transition hover:ease-in-out hover:scale-110"></ImCross>
                </Link>
              </p>
              <div className="flex flex-col mb-4">
                <h1 className="animate-fade-in-down ml-4 -mb-8 mt-3 self-start font-bold text-black">
                  User name
                </h1>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  className="animate-fade-in-down w-72 h-10 p-2 mt-9 self-center rounded-md text-black caret-Orange border-2 border-Orange font-bold bg-white shadow-inner"
                />
                <h1 className="ml-4 -mb-8 mt-3 self-start font-bold text-black">
                  Task name
                </h1>
                <input
                  type="text"
                  value={firstTask}
                  onChange={(e) => {
                    let taskName = e.target.value;
                    setFirstTask(taskName);
                  }}
                  className="animate-fade-in-down w-72 h-10 p-2 mt-9 self-center rounded-md text-black caret-Orange border-2 border-Orange font-bold bg-white shadow-inner"
                />
              </div>
              <Link
                className="animate-fade-in-down xmt-4 bg-white w-52 text-black h-10 p-2 self-center font-bold hover:shadow-md rounded-full hover:transition hover:scale-105 hover:ease-in-out border-darkBlue border-2"
                onClick={accountCreate}
              >
                {isloading ? (
                  <BarLoader className="self-center mt-2 ml-10" />
                ) : (
                  "Create Account"
                )}
              </Link>

              <div className="animate-fade-in-down flex basis-1/2 text-black mt-4 justify-around">
                <p
                  className="hover:text-black/50 font-semibold"
                  onClick={copyAddress}
                >
                  {copyStatus}
                </p>
                <p
                  className="animate-fade-in-down hover:text-black/50 font-semibold"
                  onClick={EtherScan}
                >
                  View on explorer
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
