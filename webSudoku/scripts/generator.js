// console.log(Math.floor(Math.random()*10+1))
var sudokuArray = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];

// hàm này chạy từ 1 tới 9
var RanNum = function () {
  // từ 1 tới 10
  var num = Math.floor(Math.random() * 10 + 1);
  if (num < 10) {
    return num; // từ 1 tới 9
  }
  return num - 1; // lớn hơn 10 thì return 9.
};


var testham = function () {
  var tempp = 1;
  var delcol;
  var delrow;
  // Example : level easy is 42
  var level = 81 - 42;
  sudokuArray[4][4] = RanNum();
  sudokuArray[0][0] = RanNum();
  sudokuArray[8][8] = RanNum();
  copyOfSudokuArr();
  SolveSu();
  matrix = solveSudokuArr;
  while (tempp !== level) {
    try {
      delcol = RanNum() - 1;
      delrow = RanNum() - 1;
      solveSudokuArr[delrow][delcol] = '';
      tempp++;
    } catch (error) {
      console.log(error);
    }
    tranfer(sudokuArray, solveSudokuArr); // chuyển solvesudokuarr sang sudokuarr
    sudokuStack = [];
  }
};
testham();

// sudokuArray=matrix;
// Cái này t còn tính : nếu mà nó Random trùng với cái ô mà nó random lần trước thì
// cho nó random laik, tránh trường hợp bị trùng.
