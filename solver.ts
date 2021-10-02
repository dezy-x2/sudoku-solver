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
function findCoord(
  col: number,
  row: number,
  sudoku: number[][] = puzzle
): number {
  // we need to know how many rows and columns there are
  let [rows, cols] = getDimensions(sudoku);
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

/**
 * @param {number} col
 * @param {number} row
 * @returns {number[][]} it returns an arr of the row and column that the coords belong to
 */
function getRowAndCol(
  col: number,
  row: number,
  sudoku: number[][] = puzzle
): number[][] {
  const fullRow = sudoku[row];
  const fullCol = sudoku.map((arr) => arr[col]);
  return [fullCol, fullRow];
}

/**
 * @param {number[]} arr
 * @param {number} num
 * @returns {boolean} it returns true if the num is in the arr
 */
function numPresent(arr: number[], num: number): boolean {
  //! i still don't know why this won't work ive tried the tsconfig and it still doesn't work
  //// return arr.includes(num);
  for (let elm of arr) {
    if (elm === num) {
      return true;
    }
  }
  return false;
}

/**
 * @param {number} col
 * @param {number} row
 * @param {number} num
 * @returns {boolean} it returns true if a num can be placed in a specific spot
 */
function legalPlacement(
  col: number,
  row: number,
  num: number,
  sudoku: number[][] = puzzle
): boolean {
  const [fullCol, fullRow] = getRowAndCol(col, row, sudoku);
  const grids: GridObj = makeGrid(sudoku);
  const coord: number = findCoord(col, row);
  const grid: number[] = grids[coord];
  return (
    !numPresent(fullCol, num) &&
    !numPresent(fullRow, num) &&
    !numPresent(grid, num) &&
    sudoku[row][col] === null
  );
}

/**
 * @param {number} colCount number of items in the col
 * @param {number} rowCount number of items in the row
 * @returns {number[]} it returns 2d arr will null values
 */
function generateEmptyPuzzle(colCount: number, rowCount: number): number[][] {
  const final = [];
  for (let i = 0; i < rowCount; i++) {
    const temp = [];
    for (let j = 0; j < colCount; j++) {
      temp.push(null);
    }
    final.push(temp);
  }
  return final;
}

/**
 *
 * @param depth the amount of numbers you want to put in the puzzle (1-9)
 * @returns a puzzle with the amount of numbers you want
 */
function randomPlacer(depth: number): number[][] {
  let failCount: number = 0;
  let failed: boolean = false;
  let finalSudoku: number[][];
  while (true) {
    failed = false;
    let uniquePairArr: any = new Set();
    // creates the puzzle that we will be populating
    const sudoku: number[][] = generateEmptyPuzzle(9, 9);
    const [row, col] = getDimensions(sudoku);
    let count: number = 0;
    // i is the the number that we are trying to place in the sudoku
    for (let i: number = 1; i <= depth; i++) {
      // keep trying to place i until it has been placed 9 times
      while (count < 9) {
        // generate a random row and column
        const rowToPlace: number = Math.floor(Math.random() * row);
        const colToPlace: number = Math.floor(Math.random() * col);
        // console.log(
        //   legalPlacement(colToPlace, rowToPlace, i, sudoku),
        //   i,
        //   count,
        //   rowToPlace,
        //   colToPlace,
        //   uniquePairArr.size === 81
        // );
        uniquePairArr.add(makeUniquePair([rowToPlace, colToPlace]));
        // we need to check if it is legal to place the number here
        if (legalPlacement(colToPlace, rowToPlace, i, sudoku)) {
          sudoku[rowToPlace][colToPlace] = i;
          count++;
        } else if (isIllegalBoard(uniquePairArr)) {
          failCount++;
          console.log(`FAIL #${failCount}`);
          failed = true;
          break;
        }
      }
      uniquePairArr = new Set();
      count = 0;
      if (failed) {
        break;
      }
    }
    if (!failed) {
      finalSudoku = sudoku;
      break;
    }
  }
  return finalSudoku;
}

function makeUniquePair([a, b]: [a: number, b: number]): number {
  return a + b * 10;
}

function isIllegalBoard(arr: any): boolean {
  return arr.size === 81;
}

console.log(makeGrid(randomPlacer(9)));
// console.log(makeGrid(generateEmptyPuzzle(9, 9)));
