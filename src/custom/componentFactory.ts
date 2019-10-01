import { Actor, Component } from "../_types";
import convertToNodes from "../actors/helpers/converToNodes";
import render from "../utils/render";

export default function<TController>(
  tag: string,
  controller: TController,
  template: Actor<TController> | Actor<TController>[]
): Component<TController> {
  const element = document.createElement(tag);

  return (state, { bindings = {} } = {}) => {
    Object.keys(bindings).forEach(prop => {
      controller[prop] = bindings[prop](state);
    });

    render(convertToNodes(template, controller), element);

    return element;
  };
}
