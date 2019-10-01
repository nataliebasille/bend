import { Attributes, Actor } from "../_types";
import render from "../utils/render";
import convertToNodes from "./helpers/converToNodes";

export default function<T>(
  tag: string,
  attributes?: Attributes<T>,
  children?: Actor<T> | Actor<T>[]
): Actor<T> {
  const element = document.createElement(tag);

  return state => {
    (attributes || []).forEach(value => value(state, element));

    if (children) {
      const nodes = convertToNodes(children, state);

      render(nodes, element);
    }

    return [element];
  };
}
