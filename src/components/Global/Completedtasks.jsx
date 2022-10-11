import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { completedTasks: [] };
const { useGlobalState } = createGlobalState(initialState);

export default function Completedtasks() {
  const [completedTasks, setcompletedTasks] = useGlobalState("completedTasks");
  return [completedTasks, setcompletedTasks];
}
