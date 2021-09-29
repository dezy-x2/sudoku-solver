var puzzle = [
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
function getDimensions(puzzle) {
    return [puzzle.length, puzzle[0].length];
}
/**
 * @param {number[][]} puzzle
 * @returns {GridObj} a obj with each 3x3 grid in arrays (key is the coord)
 */
function makeGrid(puzzle) {
    // need to find the dimensions of the puzzle
    var _a = getDimensions(puzzle), rows = _a[0], cols = _a[1];
    // each grid is a array with the key being its coordinate
    var grid = {};
    // iterate through the rows
    for (var g = 0; g < rows; g += 3) {
        // this arr is used to keep arrs of a rows grids
        var nums = [];
        // iterate through the columns
        for (var i = 0; i < cols; i += 3) {
            // this arr holds one grid and is added to the nums arr
            var temp = [];
            // these two loops go through each num in the grid
            for (var j = g; j < g + 3; j++) {
                for (var k = i; k < i + 3; k++) {
                    temp.push(puzzle[j][k]);
                }
            }
            nums.push(temp);
        }
        // this loop breaks down the nums arr into the grid
        for (var x = 0; x < nums.length; x++) {
            var key = "" + (g + x);
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
function findCoord(col, row, sudoku) {
    if (sudoku === void 0) { sudoku = puzzle; }
    // we need to know how many rows and columns there are
    var _a = getDimensions(sudoku), rows = _a[0], cols = _a[1];
    // since each grid is 3x3 dividing the rows and columns by 3 gives us the grid num
    rows /= 3;
    cols /= 3;
    // this tells us how far over and down the coords are from 0,0
    var over = Math.floor(col / cols);
    var down = Math.floor(row / rows);
    // multiplying down by 3 moves us to the correct row and adding over gives us the correct col
    var num = down * 3 + over;
    return num;
}
/**
 * @param {number} col
 * @param {number} row
 * @returns {number[][]} it returns an arr of the row and column that the coords belong to
 */
function getRowAndCol(col, row, sudoku) {
    if (sudoku === void 0) { sudoku = puzzle; }
    var fullRow = sudoku[row];
    var fullCol = sudoku.map(function (arr) { return arr[col]; });
    return [fullCol, fullRow];
}
/**
 * @param {number[]} arr
 * @param {number} num
 * @returns {boolean} it returns true if the num is in the arr
 */
function numPresent(arr, num) {
    //! i still don't know why this won't work ive tried the tsconfig and it still doesn't work
    //// return arr.includes(num);
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var elm = arr_1[_i];
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
function legalPlacement(col, row, num, sudoku) {
    if (sudoku === void 0) { sudoku = puzzle; }
    var _a = getRowAndCol(col, row, sudoku), fullCol = _a[0], fullRow = _a[1];
    var grids = makeGrid(sudoku);
    var coord = findCoord(col, row);
    var grid = grids[coord];
    return (!numPresent(fullCol, num) &&
        !numPresent(fullRow, num) &&
        !numPresent(grid, num) &&
        sudoku[row][col] === null);
}
function generateEmptyPuzzle(colCount, rowCount) {
    var final = [];
    for (var i = 0; i < rowCount; i++) {
        var temp = [];
        for (var j = 0; j < colCount; j++) {
            temp.push(null);
        }
        final.push(temp);
    }
    return final;
}
//! theres definitely some errors here but im tired
function randomPlacer(depth) {
    var sudoku = generateEmptyPuzzle(9, 9);
    var _a = getDimensions(sudoku), row = _a[0], col = _a[1];
    var count = 0;
    for (var i = 1; i <= depth; i++) {
        while (count < 9) {
            var rowToPlace = Math.floor(Math.random() * row);
            var colToPlace = Math.floor(Math.random() * col);
            console.log(rowToPlace, colToPlace, legalPlacement(colToPlace, rowToPlace, i, sudoku), count, sudoku[rowToPlace][colToPlace]);
            if (legalPlacement(colToPlace, rowToPlace, i, sudoku)) {
                sudoku[rowToPlace][colToPlace] = i;
                count++;
            }
        }
    }
    return sudoku;
}
console.log(makeGrid(randomPlacer(1)));
// console.log(makeGrid(generateEmptyPuzzle(9, 9)));
