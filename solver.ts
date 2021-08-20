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

/**
 * @param {number[][]} puzzle
 * @returns {number[]} a list with the amount of rows and columns in the puzzle
 */
function getDimensions(puzzle: number[][]): [number, number] {
  return [puzzle.length, puzzle[0].length];
}

type GridObj = { [key: string]: number[] };

/**
 * @param {number[][]} puzzle
 * @returns {GridObj} a obj with each 3x3 grid in arrays (key is the coord)
 */
function makeGrid(puzzle: number[][]): GridObj {
  // need to find the dimensions of the puzzle
  const [rows, cols] = getDimensions(puzzle);
  // each grid is a array with the key being its coordinate
  const grid: GridObj = {};
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

/**
 * @param {number} col
 * @param {number} row
 * @returns {number} it returns the coordinate that the col and row are in
 */
function findCoord(col: number, row: number): number {
  // we need to know how many rows and columns there are
  let [rows, cols] = getDimensions(puzzle);
  // since each grid is 3x3 dividing the rows and columns by 3 gives us the grid num
  rows /= 3;
  cols /= 3;
  // this tells us how far over and down the coords are from 0,0
  const over = Math.floor(col / cols);
  const down = Math.floor(row / rows);
  // multiplying down by 3 moves us to the correct row and adding over gives us the correct col
  const num: number = down * 3 + over;
  return num;
}
