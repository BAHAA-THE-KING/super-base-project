export function chunkArray<T = any>(
  array: T[],
  chunkSize: number,
  fill: boolean,
  fillValue?: () => T
) {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  const lastElement = result.at(-1);

  if (fill && lastElement && lastElement.length !== chunkSize) {
    for (let i = lastElement.length - 1; i < chunkSize - 1; i++)
      lastElement.push(fillValue!());
    result[result.length - 1] = lastElement;
  }
  return result;
}
