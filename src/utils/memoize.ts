export default function<T extends any[], U>(
  fn: (...args: T) => U
): (...args: T) => U {
  let previousArgs: T | null = null;
  let previousResult: U | null = null;
  return (...args: T) => {
    const update = needsUpdate(previousArgs, args);

    if (update) {
      previousArgs = args;
      previousResult = fn(...args);
    }

    return previousResult;
  };
}

function needsUpdate(prev: any[] | null, current: any[]) {
  if (prev === null) return true;

  if (prev.length !== current.length) return true;

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== current[i]) return true;
  }

  return false;
}
