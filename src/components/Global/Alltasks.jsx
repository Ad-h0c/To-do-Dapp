import { createGlobalState } from "react-hooks-global-state";

const initialState = { Alltasks: [] };
const { useGlobalState } = createGlobalState(initialState);

export default function AllTasks() {
  const [Alltasks, setAllTasks] = useGlobalState("Alltasks");
  return [Alltasks, setAllTasks];
}
