import { StateOperator, Actor } from "../../_types";
import convertToNodes from "../helpers/converToNodes";
import createCache from "../../utils/createCache";

interface ForData<T> {
  first$: boolean;
  last$: boolean;
  index$: number;
  parent$: T;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Filter<T, U> = T extends U ? T : never;
type ForContext<
  TState extends { [key: string]: any },
  TChild extends { [key: string]: any }
> = ForData<TState> &
  Omit<TChild, keyof ForData<TState>> &
  Omit<TState, Filter<keyof TState, keyof ForData<TState> | keyof TChild>>;

export default function<T, V>(
  value: StateOperator<T, V[]>,
  childCreator: () => Actor<ForContext<T, V>> | Actor<ForContext<T, V>>[],
  trackBy?: (context: ForContext<T, V>) => any
): Actor<T> {
  trackBy = trackBy || (context => context.index$);
  let cache = createCache();

  return state => {
    const items = value(state);

    if (!items) return [];

    return items.reduce(
      (nodesList, item, index$) => {
        const context = new Proxy(
          {
            index$,
            first$: index$ === 0,
            last$: index$ === items.length - 1,
            parent$: state
          },
          {
            get(obj, prop) {
              if (prop in obj) return obj[prop];

              if (prop in item) return item[prop];

              if (prop in state) return state[prop];
            },

            set(obj, prop, value) {
              if (prop in obj) return true;

              if (prop in item) {
                item[prop] = value;
              }

              if (prop in state) {
                item[prop] = value;
              }

              return true;
            }
          }
        );

        const old = cache;
        cache = createCache();
        const trackByID = trackBy(context as any);
        const actors = old.has(trackByID) ? old.get(trackByID) : childCreator();

        if (actors) {
          cache.set(trackByID, actors);
          nodesList.push(...convertToNodes(actors, context));
        }

        return nodesList;
      },
      [] as Node[]
    );
  };
}
