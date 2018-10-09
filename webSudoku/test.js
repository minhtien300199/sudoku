var lastK;
var n=9;

var a = [
    ["", "", 3, "", 8, "", 9, 6, ""],
    ["", "", "", 1, "", "", "", "", 7],
    [7, 5, "", "", "", 3, "", "", ""],
    [3, 1, 5, 8, "", "", "", 4, ""],
    [4, 6, 2, 7, "", 1, 8, 9, 5],
    ["", 9, "", "", "", 5, 3, 2, 1],
    ["", "", "", 9, "", "", "", 1, 3],
    [5, "", "", "", "", 2, "", "", ""],
    ["", 8, 1, "", 7, "", 6, "", ""]
  ];
  var sudokuStack=[];
  var ob=
  {
    curRow:this.curRow,
    curCol:this.curCol,
    value:this.value
  };

var isOK=function(i,j,x)
{
    var k, t;
    var tmpX, tmpY;
    //kiem tra hang thu i da co cai nao trung chua
    for (k=0; k<n; k++)
        if (a[i][k] === x)
            return 0;
    //kiem tra cot thu j da co cai nao trung chua
    for (k=0; k<n; k++)
        if (a[k][j] === x)
            return 0;
 
    //kiem tra trong o 3x3
    tmpX = i%3; tmpY = j%3;
    for (k=i-tmpX; k<=i-tmpX+2; k++)
        for (t=j-tmpY; t<=j-tmpY+2; t++)
            if (a[k][t] === x)
                return 0;
    return 1;
};
var SolveSu=function(startRow,startCol)
{
    var rowIndex=0,colIndex=0,k=1;
    for (;rowIndex<n;rowIndex++)
    {
        for (;colIndex<n;colIndex++)
        {
            if( a[startRow][startCol]==='')
            {
                for (;k<=9;k++)
                {
                            //điền 1 ô và lưu bc đi
                    if (isOK(startRow,startCol,k)===1)
                    {
                        a[startRow][startCol]=k;
                        ob.value=k;
                        ob.CurRow=startRow;
                        ob.curCol=startCol;
                        sudokuStack.push(ob);
                        
                    }
                    else
                    {
                        a[startRow][startCol]='';
                    }
                    if (k===9 && a[startRow][startCol]===0)
                    {
                        sudokuStack.pop(ob);
                        rowIndex=sudokuStack[sudokuStack.length-1].CurRow;
                        colIndex=sudokuStack[sudokuStack.length-1].curCol; 
                        k=sudokuStack[sudokuStack.length-1].value;
                    }
                }
    
            }

            if (startRow===n-1 && startCol===n-1)
            {
                console.log(a);
                return 1;
            }
        }
    }

};

if (SolveSu(0,0)===1)
{
    console.log("can run");
}
else console.log('can not run');