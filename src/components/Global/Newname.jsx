import { createGlobalState } from "react-hooks-global-state";

const initialState = { newName: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function Newname() {
  const [newName, setNewName] = useGlobalState("newName");
  return [newName, setNewName];
}
