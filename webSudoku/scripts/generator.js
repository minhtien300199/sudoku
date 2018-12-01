//console.log(Math.floor(Math.random()*10+1));
var matrix=[["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""]];
var RanNum=function()
{
    var num=Math.floor(Math.random()*10+1);
    if (num<10)
    {
        return num;    
    }
    return num-1;
}
var operator = function(i, j, x)          //kt ma trận.
{
  var k, t;
  var tmpX, tmpY;
  //kiem tra hang thu i da co cai nao trung chua
  for (k = 0; k < max; k++) if (matrix[i][k] === x) return 0;
  //kiem tra cot thu j da co cai nao trung chua
  for (k = 0; k < max; k++) if (matrix[k][j] === x) return 0;
  //kiem tra trong o 3x3
  tmpX = i % 3;
  tmpY = j % 3;
  for (k = i - tmpX; k <= i - tmpX + 2; k++)
    for (t = j - tmpY; t <= j - tmpY + 2; t++) if (matrix[k][t] === x) return 0;
  return 1;
};
matrix[4][4]=RanNum();
matrix [0][0]= RanNum();
matrix [8][8]=RanNum();
sudokuArray=matrix;
SolveSu();
var tempp= 1;
var delcel;
var delrow;
//Example : level easy is 42
var level = 42;
//while (tempp!==level)
//{ delcol= RanNum();
 // delrow= RanNum();
 //matrix[delrow][delcol]="";
//}
//sudokuArray=matrix;
// Cái này t còn tính : nếu mà nó Random trùng với cái ô mà nó random lần trước thì cho nó random laik, tránh trường hợp bị trùng.