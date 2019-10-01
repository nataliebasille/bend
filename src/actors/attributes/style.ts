import { StateOperator, Attribute } from "../../_types";
import camelCase from "../../utils/camelCase";

export default function<T>(
  property: string,
  value: string | StateOperator<T>
): Attribute<T, HTMLElement>;
export default function<T>(styles: {
  [property: string]: string | StateOperator<T>;
}): Attribute<T, HTMLElement>;
export default function<T>(styles, value?): Attribute<T, HTMLElement> {
  styles =
    typeof styles === "function"
      ? { [camelCase(styles)]: value }
      : Object.keys(styles).reduce((s, prop) => {
          s[camelCase(prop)] = styles[prop];
          return s;
        }, {});

  return (state, element) => {
    Object.keys(styles).forEach(prop => {
      const value = styles[prop];

      element.style[prop] = typeof value === "function" ? value(state) : value;
    });

    return element;
  };
}
