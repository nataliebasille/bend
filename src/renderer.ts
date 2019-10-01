import { Actor } from "./_types";
import render from "./utils/render";
import convertToNodes from "./actors/helpers/converToNodes";

export default function<T>(actors: Actor<T> | Actor<T>[], anchor: Node) {
  return (state: T) => {
    const newNodes: Node[] = convertToNodes(actors, state);

    render(newNodes, anchor);
  };
}
