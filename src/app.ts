import { Actor } from "./_types";
import renderer from "./renderer";

type AppOptions<T extends Object> = {
  anchor: Node;
  template: Actor | Actor[];
  state?: T;
};

type AppExtras = {
  destroy(): void;
};

export default function<T>(opt: AppOptions<T>): T & AppExtras {
  let rendered = renderer(opt.template, opt.anchor);
  const proxy = new Proxy(
    {
      destroy() {
        rendered = null;
        const { childNodes } = opt.anchor;

        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes.item(i);
          opt.anchor.removeChild(node);
        }
      }
    },
    {
      get(target, property) {
        if (property in target) {
          return target[property];
        }

        if (opt.state && property in opt.state) {
          return opt.state[property];
        }
      },

      set(target, property, value) {
        target[property] = value;

        setTimeout(() => {
          rendered(proxy);
        }, 0);

        return true;
      },

      has(target, property) {
        return property in target || (opt.state && property in opt.state);
      }
    }
  );

  rendered(proxy);

  return proxy as any;
}
