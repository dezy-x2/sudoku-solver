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
function getDimensions(puzzle) {
    return [puzzle.length, puzzle[0].length];
}
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
function findCoord(col, row) {
    var _a = getDimensions(puzzle), rows = _a[0], cols = _a[1];
    rows /= 3;
    cols /= 3;
    var over = Math.floor(col / cols);
    var down = Math.floor(row / rows);
    // console.log(`${over}-${down}`);
    var num = down * 3 + over;
    return num;
}
console.log(makeGrid(puzzle));
console.log(findCoord(5, 2));
