import { ethers } from "ethers";
import FactoryAddress from "../Global/FactoryAddress";
import NewTask from "../Global/NewTask";
import Render from "../Global/Render";
import todoAbi from "../../utils/todoApp.json";
import { useState } from "react";

function CreateNewTask() {
  const [newTask, setNewTask] = NewTask();
  const [facAddress] = FactoryAddress();
  const [isRender, setRender] = Render();
  const [isloading, setLoading] = useState(false);

  const createNewTask = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(facAddress, todoAbi, signer);
      if (newTask.length === 0) {
        alert("Enter the task name");
      } else {
        const tx = await todoContract.addTask(newTask);
        setLoading(true);
        await tx.wait();
        let hash = tx.hash;
        if (hash.length > 0) {
          setRender(!isRender);
          setNewTask("");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return [isloading, createNewTask];
}

export default CreateNewTask;
