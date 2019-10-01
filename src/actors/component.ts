import { Component, Bindings, Actor } from "../_types";

export function component<TState, TComponent>(
  component: Component<TComponent>,
  options: {
    bindings?: Bindings<TState, TComponent>;
  } = {}
): Actor<TState> {
  return state => {
    return [component(state, options)];
  };
}
