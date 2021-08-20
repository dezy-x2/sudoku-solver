const puzzle: number[][] = [
  [9, null, null, 6, 4, null, null, null, 3],
  [2, 7, null, null, 9, null, 5, 8, null],
  [null, 1, null, 5, 8, null, null, null, null],
  [null, 9, null, null, null, null, 7, null, null],
  [null, null, 7, 9, 6, 5, 8, null, null],
  [null, null, 2, null, null, null, null, 4, null],
  [null, null, null, null, 5, 3, null, 6, null],
  [null, 5, 1, null, 7, null, null, 2, 8],
  [4, null, null, null, 1, 6, null, null, 5],
];

function getDimensions(puzzle: number[][]): [number, number] {
  return [puzzle.length, puzzle[0].length];
}

function makeGrid(puzzle: number[][]): { [key: string]: number[] } {
  const [rows, cols] = getDimensions(puzzle);
  const grid: { [key: string]: number[] } = {};
  for (let g = 0; g < rows; g += 3) {
    let nums: number[][] = [];
    for (let i: number = 0; i < cols; i += 3) {
      console.log(g, i, "outer====");
      let temp: number[] = [];
      for (let j: number = g; j < g + 3; j++) {
        for (let k: number = i; k < i + 3; k++) {
          console.log(j, k, "inner");
          temp.push(puzzle[j][k]);
        }
      }
      nums.push(temp);
    }
    for (let x = 0; x < nums.length; x++) {
      const key: string = `${g + x}`;
      grid[key] = nums[x];
    }
  }
  return grid;
}

console.log(makeGrid(puzzle));
