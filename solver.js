var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
/**
 * @param {number} colCount number of items in the col
 * @param {number} rowCount number of items in the row
 * @returns {number[]} it returns 2d arr will null values
 */
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
/**
 *
 * @param depth the amount of numbers you want to put in the puzzle (1-9)
 * @returns a puzzle with the amount of numbers you want
 */
function randomPlacer(depth) {
    // this is just to keep track of fails not actually important
    var failCount = 0;
    // we need this to know whether to break or not
    var failed = false;
    var sudoku;
    // this loop is here in place of recursion because the recursion would be too deep
    while (true) {
        // need to make sure that it is false before we start
        failed = false;
        // the set makes sure that we don't repeat any numbers
        var uniquePairArr = new Set();
        // creates the puzzle that we will be populating
        sudoku = generateEmptyPuzzle(9, 9);
        var _a = getDimensions(sudoku), row = _a[0], col = _a[1];
        var count = 0;
        // i is the the number that we are trying to place in the sudoku
        for (var i = 1; i <= depth; i++) {
            // keep trying to place i until it has been placed 9 times
            while (count < 9) {
                // generate a random row and column
                var rowToPlace = Math.floor(Math.random() * row);
                var colToPlace = Math.floor(Math.random() * col);
                // add the row and column to the set
                uniquePairArr.add(makeUniquePair([rowToPlace, colToPlace]));
                // we need to check if it is legal to place the number here
                if (legalPlacement(colToPlace, rowToPlace, i, sudoku)) {
                    sudoku[rowToPlace][colToPlace] = i;
                    count++;
                }
                else if (isIllegalBoard(uniquePairArr)) {
                    failCount++;
                    console.log("FAIL #" + failCount);
                    // since it failed we need to mark it as failed so it exits properly
                    failed = true;
                    break;
                }
            }
            // resets old values
            uniquePairArr = new Set();
            count = 0;
            // if it failed we need to completely reset the puzzle
            if (failed) {
                break;
            }
        }
        // if it is here and hasn't failed that means it was completed
        if (!failed) {
            break;
        }
    }
    return sudoku;
}
function makeUniquePair(_a) {
    var a = _a[0], b = _a[1];
    return a + b * 10;
}
function isIllegalBoard(arr) {
    return arr.size === 81;
}
function puzzlefy(sudoku, numEliminated) {
    if (numEliminated === void 0) { numEliminated = 9; }
    var _a = getDimensions(sudoku), row = _a[0], col = _a[1];
    for (var i = 0; i < numEliminated; i++) {
        var rowToPlace = Math.floor(Math.random() * row);
        var colToPlace = Math.floor(Math.random() * col);
        // randomly picks a number and nullifys it
        sudoku[rowToPlace][colToPlace] = null;
    }
    return sudoku;
}
function getNumberCount(sudoku) {
    // our values start at 9 so we can subtract from them and find out how many are less rather than how many there are
    var countObj = {
        "1": 9,
        "2": 9,
        "3": 9,
        "4": 9,
        "5": 9,
        "6": 9,
        "7": 9,
        "8": 9,
        "9": 9
    };
    for (var i = 0; i < sudoku.length; i++) {
        for (var j = 0; j < sudoku[i].length; j++) {
            if (sudoku[i][j] !== null) {
                // if its not null then we need to subtract 1 from that specific numbers count
                var currNum = sudoku[i][j];
                countObj[currNum] -= 1;
            }
        }
    }
    return countObj;
}
function solvePuzzle(sudoku) {
    // this is just to keep track of fails not actually important
    var failCount = 0;
    // we need this to know whether to break or not
    var failed = false;
    // we need to manipulate a copy of the puzzle so we can still restart cleanly
    var sudokuCopy;
    // this loop is here in place of recursion because the recursion would be too deep
    while (true) {
        // need to make sure that it is false before we start
        failed = false;
        // we need to make sure that we copy the puzzle on both layers
        sudokuCopy = sudoku.map(function (arr) { return __spreadArray([], arr); });
        // we need to know how many of each number is left to solve
        var numberCount = getNumberCount(sudokuCopy);
        // the set makes sure that we don't repeat any numbers
        var uniquePairArr = new Set();
        var _a = getDimensions(sudokuCopy), row = _a[0], col = _a[1];
        var count = 0;
        // i is the the number that we are trying to place in the sudoku
        for (var i = 1; i <= 9; i++) {
            // keep trying to place i until it has been placed the amount of times it is missing
            while (count < numberCount[i]) {
                // generate a random row and column
                var rowToPlace = Math.floor(Math.random() * row);
                var colToPlace = Math.floor(Math.random() * col);
                // add the row and column to the set
                uniquePairArr.add(makeUniquePair([rowToPlace, colToPlace]));
                // we need to check if it is legal to place the number here
                if (legalPlacement(colToPlace, rowToPlace, i, sudokuCopy)) {
                    sudokuCopy[rowToPlace][colToPlace] = i;
                    count++;
                }
                else if (isIllegalBoard(uniquePairArr)) {
                    failCount++;
                    console.log("FAIL #" + failCount);
                    // since it failed we need to mark it as failed so it exits properly
                    failed = true;
                    break;
                }
            }
            // resets old values
            uniquePairArr = new Set();
            count = 0;
            // if it failed we need to completely reset the puzzle
            if (failed) {
                break;
            }
        }
        // if it is here and hasn't failed that means it was completed
        if (!failed) {
            break;
        }
    }
    return sudokuCopy;
}
// const generatedPuzzle: number[][] = randomPlacer(9);
// console.log(makeGrid(generatedPuzzle));
// console.log(makeGrid(puzzlefy(generatedPuzzle)));
// console.log(getNumberCount(puzzle));
console.log(makeGrid(solvePuzzle(puzzle)));
