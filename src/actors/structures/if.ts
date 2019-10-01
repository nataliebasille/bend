import { StateOperator, Actor } from "../../_types";
import convertToNodes from "../helpers/converToNodes";

export default function<T>(
  value: StateOperator<T>,
  forTrue: () => Actor<T> | Actor<T>[],
  forFalse?: () => Actor<T> | Actor<T>[]
): Actor<T> {
  const trueNodes = forTrue();
  const falseNodes = forFalse && forFalse();

  return state => {
    if (value(state)) {
      return convertToNodes(trueNodes, state);
    }

    return (falseNodes && convertToNodes(falseNodes, state)) || [];
  };
}
