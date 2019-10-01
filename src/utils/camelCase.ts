const find = /(\-\w)/g;
const convert = function(matches) {
  return matches[1].toUpperCase();
};
export default function(snakeCase: string): string {
  return snakeCase.replace(find, convert);
}
