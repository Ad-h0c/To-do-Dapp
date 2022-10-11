import { createGlobalState } from "react-hooks-global-state";

const initialState = { show: false };
const { useGlobalState } = createGlobalState(initialState);

export default function useStatus() {
  const [show, setShow] = useGlobalState("show");
  return [show, setShow];
}
