import { Actor, StateOperator } from "../_types";

export default function<T>(value: StateOperator<T> | string): Actor<T> {
  const textNode = document.createTextNode("");

  return state => {
    const output = typeof value === "function" ? value(state) : value;
    textNode.textContent = output;
    return [textNode];
  };
}
