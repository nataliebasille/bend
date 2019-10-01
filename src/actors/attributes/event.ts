import { Attribute } from "../../_types";

export default function<T>(
  event: string,
  handler: (context: T & { event$: Event }) => void
): Attribute<T, Element> {
  let previousState = null;
  const eventListener = (event: Event) => {
    handler(
      new Proxy(previousState || {}, {
        get(obj, prop) {
          if (prop === "event$") {
            return event;
          }

          return obj[prop];
        },

        set(obj, prop, value) {
          if (prop !== "event$") obj[prop] = value;

          return true;
        }
      })
    );
  };

  return (state, element) => {
    previousState = state;
    element.addEventListener(event, eventListener);
    return element;
  };
}
