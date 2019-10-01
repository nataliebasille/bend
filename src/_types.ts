export interface Attribute<TState = any, TElement = any> {
  (state: TState, element: TElement): TElement;
}

export type Attributes<TState> = Attribute<TState, any>[];

export type State = { [key: string]: any };
export type StateOperator<T = any, V = any> = (state: T) => V;
export type Actor<T = any> = (state: T) => Node[];
export type Context<T, Parent> =
  | { [key in keyof T]: T[key] }
  | { [key in keyof Parent]: Parent }
  | (Parent extends undefined ? {} : { parent$: Parent });

export type Template<T> = Actor<T> | Actor<T>[];
export type Bindings<T, C> = { [P in keyof C]?: (state: T) => C[P] };
export type Component<TController> = <TParent>(
  state: TParent,
  opt: {
    bindings?: Bindings<TParent, TController> | null;
  }
) => Node;
