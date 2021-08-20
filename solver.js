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
    //! this is mostly done just need to figure out the breaking down of the inner lists stuff!!
    var _a = getDimensions(puzzle), rows = _a[0], cols = _a[1];
    var grid = {};
    for (var g = 0; g < rows; g += 3) {
        var nums = [];
        for (var i = 0; i < cols; i += 3) {
            console.log(g, i, "outer====");
            var temp = [];
            for (var j = g; j < g + 3; j++) {
                for (var k = i; k < i + 3; k++) {
                    console.log(j, k, "inner");
                    temp.push(puzzle[j][k]);
                }
            }
            nums.push(temp);
        }
        for (var x = 0; x < nums.length; x++) {
            var key = "" + (g + x);
            grid[key] = nums[x];
        }
        // const key: string = `${g}-${g + 2}`;
        // grid[key] = nums;
    }
    return grid;
}
console.log(makeGrid(puzzle));
