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
  // need to find the dimensions of the puzzle
  const [rows, cols] = getDimensions(puzzle);
  // each grid is a array with the key being its coordinate
  const grid: { [key: string]: number[] } = {};
  // iterate through the rows
  for (let g = 0; g < rows; g += 3) {
    // this arr is used to keep arrs of a rows grids
    let nums: number[][] = [];
    // iterate through the columns
    for (let i: number = 0; i < cols; i += 3) {
      // this arr holds one grid and is added to the nums arr
      let temp: number[] = [];
      // these two loops go through each num in the grid
      for (let j: number = g; j < g + 3; j++) {
        for (let k: number = i; k < i + 3; k++) {
          temp.push(puzzle[j][k]);
        }
      }
      nums.push(temp);
    }
    // this loop breaks down the nums arr into the grid
    for (let x = 0; x < nums.length; x++) {
      const key: string = `${g + x}`;
      grid[key] = nums[x];
    }
  }
  return grid;
}

console.log(makeGrid(puzzle));
