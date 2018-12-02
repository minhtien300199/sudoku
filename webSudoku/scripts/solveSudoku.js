/**************************************************************************************************************
 *      giải thuật.
 */
var key, tempCol, tempRow;

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

var copyOfSudokuArr=function()  //chuyển sudokuarray sang solvesudokuarr để giải
{
  for (var rowIndex=0;rowIndex<max;rowIndex++)
    for (var colIndex=0;colIndex<max;colIndex++)
    {
      solveSudokuArr[rowIndex][colIndex]=sudokuArray[rowIndex][colIndex];
    }
};
var tranfer=function(matrixA,matrixB) //mt B cần coppy. mt A là mt coppy
{
  for (var rowIndex=0;rowIndex<max;rowIndex++)
  for (var colIndex=0;colIndex<max;colIndex++)
  {
    matrixA[rowIndex][colIndex]=matrixB[rowIndex][colIndex];
  }
}
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
var checkCell = function(i, j, x)          //kt ma trận.
{
  var k, t;
  var tmpX, tmpY;
  //kiem tra hang thu i da co cai nao trung chua
  for (k = 0; k < max; k++) if (sudokuArray[i][k] === x) return 0;
  //kiem tra cot thu j da co cai nao trung chua
  for (k = 0; k < max; k++) if (sudokuArray[k][j] === x) return 0;
  //kiem tra trong o 3x3
  tmpX = i % 3;
  tmpY = j % 3;
  for (k = i - tmpX; k <= i - tmpX + 2; k++)
    for (t = j - tmpY; t <= j - tmpY + 2; t++) if (sudokuArray[k][t] === x) return 0;
  return 1;
};

var checkDraftCell = function(i, j, x)          //kt ma trận.
{
  var k, t;
  var tmpX, tmpY;
  //kiểm tra dòng coi có cell nào viết nháp k
  var row = parseInt(selectedCell[0].getAttribute("data-row"));
  var col = parseInt(selectedCell[0].getAttribute("data-col"));
  var container = document.getElementById("app");
  var tempIndex = x-1;
for (k = 0; k < max; k++)
    if (sudokuArray[i][k] === "")   //ô đó không có số
    {
      if (container.childNodes[row].childNodes[k].hasChildNodes()===true)    //đây là có draft.
      {
        var RowIndex=Math.floor(parseInt(tempIndex)/3);
        var ColIndex=parseInt(tempIndex)%3;
        //check value: số vừa ghi có số draft ko.
        if (parseInt(container.childNodes[row].childNodes[k].childNodes[RowIndex].childNodes[ColIndex].textContent)===x)
        {
          container.childNodes[row].childNodes[k].childNodes[RowIndex].childNodes[ColIndex].innerHTML="";   //xóa số drafts
        }
      }
    }
  //kiểm tra cột nháp.
  for (k = 0; k < max; k++)
    if (sudokuArray[k][j] === "")   //ô đó không có số
    {
      if (container.childNodes[k].childNodes[col].hasChildNodes()===true)    //đây là có draft.
      {
        tempIndex = x-1;
        RowIndex=Math.floor(parseInt(tempIndex)/3);
        ColIndex=parseInt(tempIndex)%3;
        //check value: số vừa ghi có số draft ko.
        if (parseInt(container.childNodes[k].childNodes[col].childNodes[RowIndex].childNodes[ColIndex].textContent)===x)
        {
          container.childNodes[k].childNodes[col].childNodes[RowIndex].childNodes[ColIndex].innerHTML="";   //xóa số drafts
        }
      }
    }
  //kiem tra trong o 3x3
  tmpX = i % 3;
  tmpY = j % 3;
  for (k = i - tmpX; k <= i - tmpX + 2; k++)
    for (t = j - tmpY; t <= j - tmpY + 2; t++) 
    {
      if (sudokuArray[k][t] === "")       //nếu không có số
      {
        if (container.childNodes[k].childNodes[t].hasChildNodes()===true) //nếu có drafts
        {
          tempIndex = x-1;
          RowIndex=Math.floor(parseInt(tempIndex)/3);
          ColIndex=parseInt(tempIndex)%3;
          if (parseInt(container.childNodes[k].childNodes[t].childNodes[RowIndex].childNodes[ColIndex].textContent)===x)
        {
          container.childNodes[k].childNodes[t].childNodes[RowIndex].childNodes[ColIndex].innerHTML="";   //xóa số drafts
        }
        }
      }
    }
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
          k++; //tăng k
        }
      }
    }
  }
  //return 1;
  
};
