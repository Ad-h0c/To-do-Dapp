import { ethers } from "ethers";
import { useState } from "react";
import Newname from "../Global/Newname";
import todoAbi from "../../utils/todoApp.json";
import FactoryAddress from "../Global/FactoryAddress";
import Render from "../Global/Render";
import useStatus from "../Global/SetStatus";

function setName() {
  const [newName, setNewName] = Newname();
  const [facAddress] = FactoryAddress();
  const [isRender, setRender] = Render();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [status, setStatus] = useStatus();
  const setname = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const todoContract = new ethers.Contract(facAddress, todoAbi, signer);
      if (newName.length === 0) {
        alert("Please enter the name!");
      } else {
        setLoadingStatus(true);
        const tx = await todoContract.changeName(newName);
        await tx.wait();
        let hash = tx.hash;
        if (hash.length > 0) {
          setRender(!isRender);
          setNewName("");
          setStatus(!status);
        }
        setLoadingStatus(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingStatus(false);
    }
  };
  return [loadingStatus, setname];
}

export default setName;
