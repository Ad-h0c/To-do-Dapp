import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { newTask: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function NewTask() {
  const [newTask, setNewTask] = useGlobalState("newTask");
  return [newTask, setNewTask];
}
