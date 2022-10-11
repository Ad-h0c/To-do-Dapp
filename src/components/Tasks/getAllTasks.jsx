import FactoryAddress from "../Global/FactoryAddress";
import AllTasks from "../Global/Alltasks";
import todoAbi from "../../utils/todoApp.json";
import Completedtasks from "../Global/Completedtasks";
import { ethers } from "ethers";
import Pendingtasks from "../Global/Pendingtasks";

const GetAllTasks = () => {
  const [Alltasks, setAllTasks] = AllTasks([]);
  const [facAddress, setAddress] = FactoryAddress();
  const [completedTasks, setcompletedTasks] = Completedtasks();
  const [pendingTasks, setPendingTasks] = Pendingtasks();

  const getTasks = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`
    );
    const todoContract = new ethers.Contract(facAddress, todoAbi, provider);
    const tasks = await todoContract.displayAllTasks();
    setAllTasks(tasks);
    let pTasks = [];
    let cTasks = [];
    tasks.forEach((task, index) => {
      if (task.status === true) {
        cTasks.push({
          Task_name: task.taskName,
          Task_status: task.status,
          Task_index: index,
        });
      } else if (task.status === false) {
        pTasks.push({
          Task_name: task.taskName,
          Task_status: task.status,
          Task_index: index,
        });
      }
    });
    setcompletedTasks(cTasks);
    setPendingTasks(pTasks);
  };
  return getTasks;
};

export default GetAllTasks;
