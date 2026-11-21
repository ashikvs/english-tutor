export function shuffleWordIndexes(count: number, seed: number, answer: number[]): number[] {
  const indexes = Array.from({ length: count }, (_, index) => index);
  let state = seed >>> 0;

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [indexes[index], indexes[swapIndex]] = [indexes[swapIndex], indexes[index]];
  }

  const isAnswerOrder = indexes.length === answer.length
    && indexes.every((value, index) => value === answer[index]);
  if (isAnswerOrder && indexes.length > 1) {
    const first = indexes.shift();
    if (first !== undefined) indexes.push(first);
  }

  return indexes;
}
