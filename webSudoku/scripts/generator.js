// console.log(Math.floor(Math.random()*10+1))
// hàm này chạy từ 1 tới 9
var randomize = function () {
  // từ 1 tới 10
  var num = Math.floor(Math.random() * 10 + 1);        
  return (num < 10 ? num : 9); // từ 1 tới 9          
};


var matrixGenerator = function () {
  var index = 1;
  var delcol;
  var delrow;
  // Example : level easy is 42
  var blank = 81 - level;
  // console.log(sudokuArray);
  sudokuArray[4][4] = randomize();
  sudokuArray[0][0] = randomize();
  sudokuArray[8][8] = randomize();
  sudokuArray[2][7] = randomize();
  sudokuArray[7][2] = randomize();
  // console.log(sudokuArray);
  copyOfSudokuArr();  //chuyển sudokuarr qua solvesudokuarr để xử lý
  SolveSu();
  //matrix = solveSudokuArr;
  while (index <= blank) {
    try {
      delcol = randomize() - 1;
      delrow = randomize() - 1;
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


