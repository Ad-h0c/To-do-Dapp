import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import FactoryAddress from "../Global/FactoryAddress";
import todoAbi from "../../utils/todoApp.json";
import Render from "../Global/Render";
import { ethers } from "ethers";

const PendingTasks = (props) => {
  const [facAddress] = FactoryAddress();
  const [isRender, setRender] = Render();

  const toggleStatus = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(facAddress, todoAbi, signer);
      const tx = await todoContract.toggleTaskStatus(props.index.Task_index);
      await tx.wait();
      setRender(!isRender);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex container justify-center flex-row mt-2">
      <h1 className="font-Orb font-semibold flex flex-row justify-between ml-3 p-2 pt-[0.75rem] w-[30rem] h-[3rem] bg-white  text-black border-2 border-red-500 shadow-lg rounded-lg my-1 md:ml-0">
        {props.task.Task_name}
        <GiCheckMark
          className="font-Orb font-semibold text-xl fill-teal-600 hover:transition hover:ease-in-out hover:scale-150 inline md:mb-1 focus:animate-spin-fast"
          onClick={toggleStatus}
        />
      </h1>
    </div>
  );
};

export default PendingTasks;
