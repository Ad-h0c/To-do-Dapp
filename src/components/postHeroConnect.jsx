import React, { useRef, useState, useEffect } from "react";
import ConnectWallet from "./connectWallet";
import { ImCross } from "react-icons/im";
import "animate.css";
import Contract from "./contract";
import { Link, Outlet } from "react-router-dom";

const PostHeroConnect = () => {
  const [show, setShow] = useState(false);
  const [currentAccount, connectWallet] = ConnectWallet();
  overRef = useRef();
  // console.log("Is Re", isRecieved);
  // console.log("Is Re", !isRecieved);

  // useEffect(() => {
  //   const handler = (event) => {
  //     if (!overRef.current?.contains(event.target)) {
  //       setShow(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);

  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });

  return (
    <div className="flex flex-col mt-[18%]">
      <button
        className={
          show
            ? "hidden"
            : "bg-slate-200 p-2 w-80 border-2 border-black hover:border-white self-center rounded-full text-black font-bold mr-4 mt-1 hover:bg-black hover:text-white"
        }
        onClick={(e) => {
          setShow(!show);
        }}
      >
        Create Account
      </button>
      {show ? (
        !currentAccount ? (
          <div
            ref={overRef}
            className="bg-slate-400 w-80 h-80 top-1/4 self-center cursor-pointer rounded-md drop-shadow-2xl"
          >
            <div className="flex flex-col justify-center">
              <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-white bg-white mr-3 -mt-4">
                <ImCross
                  className="hover:fill-blue-400"
                  onClick={() => {
                    setShow(!show);
                  }}
                />
              </p>
              <button
                className="p-2 w-56 border-2 mt-24 self-center rounded-full border-white bg-white text-black hover:bg-blue-300 hover:text-white font-bold "
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        ) : (
          <div
            ref={overRef}
            className="bg-slate-400 w-80 h-80 top-1/4 self-center cursor-pointer rounded-md drop-shadow-2xl"
          >
            <div className="flex flex-col text-center justify-center">
              <Link
                to="/SignUp"
                className="p-2 w-56 border-2 mt-24 self-center rounded-full border-white bg-white text-black hover:bg-blue-300 hover:text-white font-bold"
              >
                Sign Up
              </Link>
              <Link
                to=":login"
                className="p-2 w-56 border-2 mt-24 self-center rounded-full border-white bg-white text-black hover:bg-blue-300 hover:text-white font-bold"
              >
                Sign In
              </Link>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default PostHeroConnect;
