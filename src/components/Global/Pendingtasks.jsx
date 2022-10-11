import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { pendingTasks: [] };
const { useGlobalState } = createGlobalState(initialState);

export default function Pendingtasks() {
  const [pendingTasks, setPendingTasks] = useGlobalState("pendingTasks");
  return [pendingTasks, setPendingTasks];
}
