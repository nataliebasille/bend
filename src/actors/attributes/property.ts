import { StateOperator, Attribute } from "../../_types";

export default function<T>(
  name: string,
  value: string | StateOperator<T, any>
): Attribute<T, any> {
  return (state, element) => {
    element[name] = typeof value === "function" ? value(state) : value;

    return element;
  };
}
