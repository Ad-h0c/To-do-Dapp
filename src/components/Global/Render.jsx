import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { render: false };
const { useGlobalState } = createGlobalState(initialState);

export default function Render() {
  const [isRender, setRender] = useGlobalState("render");
  return [isRender, setRender];
}
