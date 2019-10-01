import { Attribute, StateOperator } from "../../_types";

export default function<T>(name: string): Attribute<T, Element>;
export default function<T>(
  name: string,
  value: boolean | StateOperator<T, boolean>
): Attribute<T, Element>;
export default function<T>(classList: {
  [name: string]: boolean | StateOperator<T, boolean>;
}): Attribute<T, Element>;

export default function<T>(
  classes: any,
  value?: boolean | StateOperator<T, boolean>
): Attribute<T, Element> {
  classes =
    typeof classes === "string" ? { [classes]: value || true } : classes;

  return (state, element: Element) => {
    Object.keys(classes).forEach(prop => {
      const valueOption = classes[prop];
      const value =
        typeof valueOption === "function" ? valueOption(state) : valueOption;

      if (value) {
        element.classList.add(prop);
      } else {
        element.classList.remove(prop);
      }
    });

    return element;
  };
}
