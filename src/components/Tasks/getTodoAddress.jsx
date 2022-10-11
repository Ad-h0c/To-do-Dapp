import FactoryAddress from "../Global/FactoryAddress";
import factoryAbi from "../../utils/Factory.json";
import { ethers } from "ethers";

export default function getTodoAddress() {
  const [facAddress, setAddress] = FactoryAddress();
  const getFactoryAddress = async () => {
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
      const address = await factoryContract.getFactoryAddress(
        await signer.getAddress()
      );
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  return getFactoryAddress;
}
