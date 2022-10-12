import { GridLoader, ScaleLoader, BarLoader } from "react-spinners";
import { FcSettings } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";

//Component imports
import ConnectWallet from "./connectWallet";
import FactoryAddress from "./Global/FactoryAddress";

//Hooks

import PendingTasks from "./Tasks/PendingTasks";
import CompletedTasks from "./Tasks/CompletedTasks";
import Render from "./Global/Render";
import Completedtasks from "./Global/Completedtasks";
import AllTasks from "./Global/Alltasks";
import Pendingtasks from "./Global/Pendingtasks";
import GetAllTasks from "./Tasks/getAllTasks";
import getTodoAddress from "./Tasks/getTodoAddress";
import GetUserName from "./Tasks/getUserName";
import NewTask from "./Global/NewTask";
import CreateNewTask from "./Tasks/CreateNewTask";
import Newname from "./Global/Newname";
import setName from "./Tasks/setName";
import useStatus from "./Global/SetStatus";

const Todo = () => {
  //State Hooks
  const [completedTasks] = Completedtasks([]);
  const [pendingTasks] = Pendingtasks([]);
  const [Alltasks] = AllTasks([]);
  const [facAddress] = FactoryAddress();
  const [isRender] = Render();
  const [currentAccount, connectWallet] = ConnectWallet();
  const [fetchedName, getUserName] = GetUserName();
  const [newTask, setNewTask] = NewTask();
  const [newName, setNewName] = Newname();
  const [show, setShow] = useStatus();
  const [copyStatus, setStatus] = useState("Copy Address");

  //Functions
  const getTasks = GetAllTasks();
  const getFactoryAddress = getTodoAddress();
  const [isloading, createNewTask] = CreateNewTask();
  const [loadingStatus, setname] = setName();

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

  useEffect(() => {
    getFactoryAddress();
    getTasks();
    getUserName();
  }, [facAddress, isRender]);

  return (
    <div>
      {show ? (
        <div className="fixed w-80 h-80 ml-10 mt-20 md:mt-44 md:ml-64 self-center cursor-pointer rounded-md drop-shadow-2xl bg-white border-2 border-Orange">
          <div className="font-Orb flex flex-col justify-center">
            <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
              <ImCross
                className="fill-white hover:transition hover:ease-in-out hover:scale-110"
                onClick={() => {
                  setShow(!show);
                }}
              />
            </p>
            <h1 className="ml-4 mt-14 -mb-7 self-start font-extrabold text-black">
              New name
            </h1>
            <input
              type="text"
              value={newName}
              placeholder="Enter the new name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              className="w-72 h-10 p-2 mt-9 self-center rounded-md text-black caret-Orange border-2 border-Orange font-bold bg-white shadow-inner"
            />
            <button
              className="mt-4 bg-white w-52 text-black h-10 p-2 self-center font-bold hover:shadow-md rounded-full hover:transition hover:scale-105 hover:ease-in-out border-darkBlue border-2"
              onClick={setname}
            >
              {loadingStatus ? (
                <BarLoader className="self-center h-6 mt-1 ml-10" />
              ) : (
                "Submit"
              )}
            </button>
            <div className="flex basis-1/2 text-black mt-16 justify-around">
              <p
                className="hover:text-black/50 font-semibold"
                onClick={copyAddress}
              >
                {copyStatus}
              </p>
              <p
                className="hover:text-black/50 font-semibold"
                onClick={() => {
                  EtherScan();
                }}
              >
                View on explorer
              </p>
              {/* <a
                href="javascript:EtherScan()"
                className="hover:text-black/50 font-semibold"
              >
                View on explorer
              </a> */}
            </div>
          </div>
        </div>
      ) : null}
      {!currentAccount ? (
        <div className="w-80 h-80 mt-[3rem] border-2 border-Orange self-center cursor-pointer rounded-md shadow-2xl drop-shadow-2xl md:mt-[9rem]">
          <div className="flex flex-col justify-center">
            <p className="self-center border-[20px] rounded-l-full rounded-r-full rounded-t-none border-black bg-black mr-3 -mt-4">
              <Link to="/">
                <ImCross className="fill-white hover:animate-spin-fast"></ImCross>
              </Link>
            </p>
            <button
              className="p-2 w-60 border-2 text-lg mt-[6rem] self-center rounded-full border-darkBlue bg-white hover:scale-105 hover:transition hover:ease-in-out text-black font-bold "
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : Alltasks.length == 0 ? (
        <GridLoader
          className="mt-40 self-center"
          color="hsl(25, 97%, 53%)"
          size={30}
        />
      ) : (
        <div className="min-w-[350px] md:min-w-[52rem] md:max-w-[60rem] md:min-h-[40rem]">
          <div className="flex flex-row  justify-between h-16 items-center border-2 border-transparent rounded-lg md:shadow-lg md:shadow-LightGrey">
            <h1 className="font-Orb font-semibold text-xl ml-4 cursor-default">
              Welcome,{" "}
              <p className="text-Orange font-extrabold inline">{fetchedName}</p>
            </h1>
            <div className="font-Orb font-semibold text-xl mr-8 overflow-hidden cursor-pointer md:mb-1">
              <FcSettings
                className="text-4xl active:animate-spin-fast text-black hover:fill-red-800"
                onClick={() => {
                  setShow(!show);
                }}
              />
            </div>
          </div>
          <div className="flex-wrap justify-between p-4 md:flex-row">
            <div className="flex flex-col m-4 self-center md:mr-4 md:flex-row">
              <input
                type="text"
                value={newTask}
                placeholder="Enter the task name"
                onChange={(e) => setNewTask(e.target.value)}
                className="font-overpass h-12 p-2 self-center text-lg w-[20rem] text-veryDarkBlue border-2 bg-white border-indigo-100 rounded-md font-bold focus:outline-none md:w-[35rem]"
              />
              <button
                className="font-Orb font-bold p-2 mx-2 ml-4 mt-4 pb-2 w-[9rem] h-12 text-black border-indigo-100 self-center border-2 rounded-full border-transparent transition hover:scale-105 ease-in-out md:mt-0"
                onClick={createNewTask}
              >
                {isloading ? (
                  <ScaleLoader color="hsl(215, 51%, 70%)" height={20} />
                ) : (
                  "New task"
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center px-5 md:pl-0" id="Pending">
            <div className="flex-grow-[0.5] bg bg-darkBlueNormal/50 h-0.5"></div>
            <div className="flex-grow-0 mx-5 text-lg font-Orb font-semibold tracking-widest">
              Pending
            </div>
            <div className="flex-grow-[0.5] bg bg-darkBlueNormal/50 h-0.5"></div>
          </div>
          <div className="flex flex-col mt-2">
            {pendingTasks.map((task, index) => {
              return <PendingTasks key={index} task={task} index={task} />;
            })}
          </div>
          <div className="flex items-center px-5 mt-5 md:pl-0" id="Completed">
            <div className="flex-grow-[0.5] bg bg-darkBlueNormal/50 h-0.5"></div>
            <div className="flex-grow-0 mx-5 text-lg font-Orb font-semibold tracking-widest">
              Completed
            </div>
            <div className="flex-grow-[0.5] bg bg-darkBlueNormal/50 h-0.5"></div>
          </div>
          <div className="flex flex-col mt-2">
            {completedTasks.map((task, index) => {
              return <CompletedTasks key={index} task={task} index={task} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
