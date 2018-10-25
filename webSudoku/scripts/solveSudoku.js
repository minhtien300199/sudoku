/**************************************************************************************************************
 *      giải thuật.
 */
var key, tempCol, tempRow;
var Checksudoku = function(ob) {
  //check hàng ngang.
  var parsRow = parseInt(ob.RowIndex);
  var parsCol = parseInt(ob.ColIndex);
  var colCheck,
    rowCheck,
    max = 9;
  for (colCheck = 0; colCheck < max; colCheck++) {
    if (parsCol !== colCheck && ob.value === sudokuArray[parsRow][colCheck]) {
      return false;
    }
  }
  //check hàng dọc.
  for (rowCheck = 0; rowCheck < max; rowCheck++) {
    if (parsRow !== rowCheck && ob.value === sudokuArray[rowCheck][parsCol]) {
      return false;
    }
  }
  //kt ô 3x3:
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (sudokuArray[tempRow + i][tempCol + j] > 0) {
        if (
          sudokuSearch(
            tempCol,
            tempRow,
            sudokuArray[tempRow + i][tempCol + j]
          ) === false
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

var Checksudoku1 = function(ob) {
  //check hàng ngang.
  var i= parseInt(ob.RowIndex);
  var j = parseInt(ob.ColIndex);
  var x=parseInt(ob.value);
    var k, t;
    var tmpX, tmpY;
    //kiem tra hang thu i da co cai nao trung chua
    for (k = 0; k < max; k++) 
      if (sudokuArray[i][k] === x &&  k!=j) 
      {
        return 0;
      }
    //kiem tra cot thu j da co cai nao trung chua
    for (k = 0; k < max; k++) 
      if (sudokuArray[k][j] === x && k!=i)
      {
        return 0;
      }
    //kiem tra trong o 3x3
    tmpX = i % 3;
    tmpY = j % 3;
    for (k = i - tmpX; k <= i - tmpX + 2; k++)
      for (t = j - tmpY; t <= j - tmpY + 2; t++) 
        if (sudokuArray[k][t] === x && (k!=i && t!=j)) 
        {
          return 0;
        }
  return 1;
};


var chuyenvung = function(key) {
  switch (key) {
    case 0:
      {
        tempRow = 1;
        tempCol = 1;
      }
      break;
    case 1:
      {
        tempRow = 1;
        tempCol = 4;
      }

      break;
    case 2:
      {
        tempRow = 1;
        tempCol = 7;
      }

      break;
    case 3:
      {
        tempCol = 1;
        tempRow = 4;
      }

      break;
    case 4:
      {
        tempCol = 4;
        tempRow = 4;
      }

      break;
    case 5:
      {
        tempCol = 7;
        tempRow = 4;
      }
      break;
    case 6:
      {
        tempRow = 7;
        tempCol = 1;
      }

      break;
    case 7:
      {
        tempRow = 7;
        tempCol = 4;
      }

      break;
    case 8:
      {
        tempRow = 7;
        tempCol = 7;
      }
      break;
    default:
      break;
  }
};

var ktixj = function(row, col) {
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (row + i === 1) {
        if (col + j == 1) {
          key = 0;
          return chuyenvung(key);
        } else if (col + j === 4) {
          key = 1;
          return chuyenvung(key);
        } else if (col + j === 7) {
          key = 2;
          return chuyenvung(key);
        }
      } else if (row + i === 4) {
        if (col + j === 1) {
          key = 3;
          return chuyenvung(key);
        } else if (col + j === 4) {
          key = 4;
          return chuyenvung(key);
        } else if (col + j === 7) {
          key = 5;
          return chuyenvung(key);
        }
      } else if (row + i === 7) {
        if (col + j === 1) {
          key = 6;
          return chuyenvung(key);
        } else if (col + j === 4) {
          key = 7;
          return chuyenvung(key);
        } else if (col + j === 7) {
          key = 8;
          return chuyenvung(key);
        }
      }
    }
  }
};
var sudokuSearch = function(col, row, mark) {
  var dem = 0;
  for (var i = -1; i <= 1; i++)
    for (var j = -1; j <= 1; j++) {
      if (mark == sudokuArray[row + i][col + j]) dem++;
    }
  if (dem == 1) return true;
  else return false;
};

var copyOfSudokuArr=function()
{
  for (var rowIndex=0;rowIndex<max;rowIndex++)
    for (var colIndex=0;colIndex<max;colIndex++)
    {
      solveSudokuArr[rowIndex][colIndex]=sudokuArray[rowIndex][colIndex];
    }
};

//hàm giải cả 1 sudoku

var isOK = function(i, j, x)          //kt ma trận.
{
  var k, t;
  var tmpX, tmpY;
  //kiem tra hang thu i da co cai nao trung chua
  for (k = 0; k < max; k++) if (solveSudokuArr[i][k] === x) return 0;
  //kiem tra cot thu j da co cai nao trung chua
  for (k = 0; k < max; k++) if (solveSudokuArr[k][j] === x) return 0;
  //kiem tra trong o 3x3
  tmpX = i % 3;
  tmpY = j % 3;
  for (k = i - tmpX; k <= i - tmpX + 2; k++)
    for (t = j - tmpY; t <= j - tmpY + 2; t++) if (solveSudokuArr[k][t] === x) return 0;
  return 1;
};


//hàm giải
var SolveSu = function() 
{
  for (var rowIndex = 0; rowIndex < n; rowIndex++) 
  {
    // console.log('check row:', rowIndex);
    for (var colIndex = 0; colIndex < n; colIndex++) 
    {
      //
      var k = 1;
      if (solveSudokuArr[rowIndex][colIndex] === "")
      {
        //nếu là ô trống thì làm.
        while (k <= 9)
          {
          if (isOK(rowIndex, colIndex, k)) {
            //nếu đúng thì ghi số đó vào mảng,lưu vào stack
            solveSudokuArr[rowIndex][colIndex] = k;
            sudokuStack.push(new StackNode(rowIndex, colIndex, k));
            k=0;
            //kt số tiếp theo:
            break;
          }
          else
          {
            if (k < 9)  //nếu k chưa bằng 9 thì
            {
              k++;
              continue;
            }
            else
            {
              //là khi k=9 mà không thỏa
              var lastNode = sudokuStack.pop();   //gọi số trước của nó
              if (lastNode) {     //kt stack còn k?
                if (lastNode.value !== 9)     //nếu ô trc khác 9 thì tăng k lên 1 và làm tiếp
                {
                  solveSudokuArr[rowIndex][colIndex] = ""; //set ô trước đó bằng 0
                  rowIndex = lastNode.curRow; //gán lại ô trc đó
                  colIndex = lastNode.curCol;//gán lại ô trước đó
                  k = lastNode.value + 1;     //tăng k lên +1 và giải tiếp
                  continue;                   //giải tiếp
                } else                        // nếu ô trước bằng 9 thì skip ô này. qua ô trước đó nữa tăng k và tiếp tục giải
                {
                  // debugger;
                  solveSudokuArr[rowIndex][colIndex]="";
                  rowIndex = lastNode.curRow;   //gán lại ô trc đó
                  colIndex = lastNode.curCol;   //gán lại ô trc đó
                  solveSudokuArr[rowIndex][colIndex] = "";  //set ô đang xét =0
                  lastNode = sudokuStack.pop();  //set ô trước đó bằng 0
                  rowIndex = lastNode.curRow;   //gán lại ô trc đó
                  colIndex = lastNode.curCol;   //gán lại ô trc đó
                  solveSudokuArr[rowIndex][colIndex] = "";  //set ô đang xét =0
                  k = lastNode.value + 1;       //tăng k và giải tiếp
                  continue;
                }
              } else
              {
                console.log("Buoc di cuoi cung");
                // rowIndex = colIndex = 0;
                //  k++;
                //return 1;
                //TODO: het stack reset lai tu dau
                return -1;
              }
            }
          }
          k++;
        }
      }
    }
  }
  //return 1;
};
