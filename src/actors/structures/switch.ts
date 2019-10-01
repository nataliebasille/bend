import { StateOperator, Actor } from "../../_types";
import createCache from "../../utils/createCache";
import convertToNodes from "../helpers/converToNodes";

type SwitchCaseCreator<T> = () => Actor<T> | Actor<T>[];

export default function<T, V>(
  operator: StateOperator<T, V>,
  defaultCase: SwitchCaseCreator<V> | null,
  cases: [{ value: V; creator: SwitchCaseCreator<V> }]
) {
  const _default = defaultCase ? defaultCase() : null;
  const cache = cases.reduce((cache, { value, creator }) => {
    cache.set(value, creator());
    return cache;
  }, createCache());

  return state => {
    const value = operator(state);

    if (cache.has(value)) {
      return convertToNodes(cache.get(value), state);
    }

    return _default ? convertToNodes(_default, state) : [];
  };
}
