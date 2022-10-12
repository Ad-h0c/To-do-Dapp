// Libraries starts
import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

//ABI Imports Starts
import factoryAbi from "../utils/Factory.json";

//Components imports
import ConnectWallet from "./connectWallet";

// Function
export default function Hero() {
  //Hooks
  const [isloading, setLoading] = useState(false);
  const [upStatus, setUpStatus] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  //Imports
  const [currentAccount, connectWallet] = ConnectWallet();

  const checkAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const factoryAddress = "0x54c0e39E78F9Ad7241892c80DFf989B8aB80aA8c";
      const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryAbi,
        provider
      );
      let tx = await factoryContract.s_AccountCreated(
        await signer.getAddress()
      );
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const loginLoader = async () => {
    try {
      setLoading(true);
      const value = await checkAccount();
      if (value === true) {
        navigate("/login", { replace: true });
        setLoading(false);
      } else if (value === false) {
        setTimeout(() => {
          alert("You do not have an account");
        }, 500);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signupLoader = async () => {
    try {
      setUpStatus(true);
      const value = await checkAccount();
      if (value === true) {
        setTimeout(() => {
          alert("You already have an account");
        }, 500);
        setUpStatus(false);
      } else if (value === false) {
        navigate("/SignUp");
        setUpStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="animate-fade-in-down flex flex-col items-center container">
      <div className="flex flex-col text-center md:w-[1200px] -mt-10 md:mt-10 md:pr-10 md:pl-10">
        <h1 className="text-3xl w-80 my-4 self-center font-bold md:font-extrabold md:w-[40rem] md:text-4xl md:tracking-widest">
          Now the life is better than ever.
        </h1>
        <h2 className="text-2xl px-10 font-semibold self-center my-10 md:px-60 leading-10">
          Use the <p className="inline text-Orange"> Todo App</p> to stay
          organised, and focused. Powered by blockchain, zero down-time and
          seamless experience.
        </h2>
        <button
          className={
            show
              ? "hidden"
              : "p-2 mx-4 my-1 w-80 border-2 border-Orange self-center rounded-full text-Orange font-bold hover:scale-105 hover:duration-100 hover:transition hover:ease-in-out"
          }
          onClick={(e) => {
            setShow(!show);
          }}
        >
          Get Started
        </button>
        {show ? (
          !currentAccount ? (
            <div className="animate-fade-in-down w-80 h-80 top-1/4 border-2 border-Orange self-center cursor-pointer rounded-md shadow-2xl drop-shadow-2xl">
              <div className="flex flex-col justify-center">
                <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
                  <ImCross
                    className="hover:scale-110 fill-white"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
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
            <div className="animate-fade-in-down border-Orange border-2 w-80 h-80 top-1/4 self-center cursor-pointer rounded-md shadow-2xl drop-shadow-2xl">
              <div className="flex flex-col text-center justify-center">
                <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
                  <ImCross
                    className="hover:scale-105 hover:transition hover:ease-in-out fill-white"
                    onClick={() => setShow(!show)}
                  />
                </p>
                <Link
                  className="p-2 w-60 border-2 border-darkBlue my-12 self-center rounded-full bg-white text-black hover:scale-105 hover:transition hover:ease-in-out hover:shadow-md hover:delay-100 font-bold"
                  onClick={signupLoader}
                >
                  {upStatus ? (
                    <BarLoader
                      className="self-center my-2 ml-12 bg-white"
                      width={120}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Link>
                <Link
                  className="p-2 w-60 border-2 mt-3 self-center rounded-full border-darkBlue bg-white text-black hover:scale-105 hover:shadow-md hover:transition hover:ease-in-out hover:delay-100 font-bold"
                  onClick={loginLoader}
                >
                  {isloading ? (
                    <BarLoader
                      className="self-center my-2 ml-12 bg-white"
                      width={120}
                    />
                  ) : (
                    "Sign In"
                  )}
                </Link>
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
