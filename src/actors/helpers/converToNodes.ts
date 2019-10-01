import { Actor } from "../../_types";

export default function convertToNodes<T = any>(
  actors: Actor<T> | Actor<T>[],
  state: T
) {
  actors = actors instanceof Array ? actors : [actors];

  return actors.reduce(
    (list, a) => {
      list.push(...a(state));
      return list;
    },
    [] as Node[]
  );
}
