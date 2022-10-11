import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { userName: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function UserName() {
  const [userName, setUserName] = useGlobalState("userName");
  return [userName, setUserName];
}
