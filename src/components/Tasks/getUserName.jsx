import { ethers } from "ethers";
import { useState } from "react";
import todoAbi from "../../utils/todoApp.json";
import FactoryAddress from "../Global/FactoryAddress";

function GetUserName() {
  const [fetchedName, setFetchedName] = useState("UserXYZ");
  const [facAddress] = FactoryAddress();

  const getUserName = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
      );
      await provider.send("eth_accounts", []);
      const todoContract = new ethers.Contract(facAddress, todoAbi, provider);
      const userName = await todoContract.userName();
      setFetchedName(userName);
    } catch (error) {
      console.log(error);
    }
  };
  return [fetchedName, getUserName];
}

export default GetUserName;
