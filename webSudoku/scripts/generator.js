// console.log(Math.floor(Math.random()*10+1))
// hàm này chạy từ 1 tới 9
var RanNum = function () {
  // từ 1 tới 10
  var num = Math.floor(Math.random() * 10 + 1);
  if (num < 10) {
    return num; // từ 1 tới 9
  }
  return num - 1; // lớn hơn 10 thì return 9.
};


var matrixGenerator = function () {
  var index = 1;
  var delcol;
  var delrow;
  // Example : level easy is 42
  var blank = 81 - level;
  sudokuArray[4][4] = RanNum();
  sudokuArray[0][0] = RanNum();
  sudokuArray[8][8] = RanNum();
  sudokuArray[2][7] = RanNum();
  sudokuArray[7][2] = RanNum();
  copyOfSudokuArr();
  SolveSu();
  matrix = solveSudokuArr;
  while (index <= blank) {
    try {
      delcol = RanNum() - 1;
      delrow = RanNum() - 1;
      if (solveSudokuArr[delrow][delcol] != '')
      {
        solveSudokuArr[delrow][delcol] = '';
        index++;
      }
    } catch (error) {
      console.log(error);
    }
    tranfer(sudokuArray, solveSudokuArr); // chuyển solvesudokuarr sang sudokuarr
    sudokuStack = [];
  }
};


