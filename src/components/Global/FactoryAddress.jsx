import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { facAddress: "" };
const { useGlobalState } = createGlobalState(initialState);

export default function FactoryAddress() {
  const [facAddress, setAddress] = useGlobalState("facAddress");
  return [facAddress, setAddress];
}
