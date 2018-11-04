var solveFullMatrix =function()
{
  var sure=confirm("bạn chắc có muốn solve?");
  if (sure===true)
  {
    SolveSu();    //hàm giải
    var flag=0;
    //so sánh 2 ma trận bằng vòng lặp
    for(var rowIndex=8;rowIndex>=0;rowIndex--)
    {
      for (var colIndex=8;colIndex>=0;colIndex--)
      {
    //nếu trên ma trận sai hoặc chưa có thì put vào từ bên solvesudokuarr.
        if (sudokuArray[rowIndex][colIndex]!==solveSudokuArr[rowIndex][colIndex])
        {
          var cache=sudokuStack.pop();
          sudokuArray[rowIndex][colIndex]=cache.value;
          flag=1; //gắn id =base
        }
          //in ra html
        var popResult=solveStack.pop();
        if (popResult)
        {
          popResult.innerHTML=sudokuArray[rowIndex][colIndex];
          if (flag===1)
          {
            popResult.setAttribute("id", "base");
            flag=0;
          }
        }
        else
        {
          return;
        }
      }
    }  
  }
};

var resetButton= function()
{
  //set mọi thứ về 0;
  while (undoStack.length!=0)
  {
    undoButton();
  }
  undoStack=[];
  undoSelectedCell=[];
  redoStack=[];
  redoSelectedCell=[];
};

var redoButton =function()        //hàm redo
{
  if (redoStack!=0)
  {
    var  obj=redoStack.pop();
    undoStack.push(obj);
    var container = redoSelectedCell.pop();
    undoSelectedCell.push(container);
    if (Checksudoku1(obj)===1)
    {
      container.classList.remove("wrong");
    }
    else
    {
      container.classList.add("wrong");
    }
    container.innerHTML=obj.value;
    sudokuArray[obj.RowIndex][obj.ColIndex]=obj.value;
  }
};

var undoButton = function() {         //hàm undo.
  if (undoStack!=0)
  {
  var  obj=undoStack.pop();
  var preobj=undoStack[undoStack.length-1];
  var row=obj.RowIndex;
  var col=obj.ColIndex;
    redoStack.push(obj);      //redostack;
    var container=undoSelectedCell.pop();
    redoSelectedCell.push(container);
    if (undoStack.length==0)
    {
      container.innerHTML="";
      sudokuArray[obj.RowIndex][obj.ColIndex]="";
    }
    else 
    {
      if (isNaN(obj.preValue)==true)
      {
        container.innerHTML=""; 
        sudokuArray[obj.RowIndex][obj.ColIndex]="";
      }
      else 
      {
        container.innerHTML=obj.preValue; 
        sudokuArray[obj.RowIndex][obj.ColIndex]=obj.preValue;

        if (Checksudoku1(preobj)!=1)
        {
          container.classList.add("wrong");
        }
        else
        {
          container.classList.remove("wrong");
        }
      }
    }
  }
};
var axy;
var clearSelectedCell = function() {
  if (selectedCell && selectedCell.length > 0) {
    selectedCell[0].classList.remove("active");
    selectedCell = [];
  }
};

var toggleTouchPad = function(showTouchPad, rowIndex, colIndex) {
  // console.log(position);
  var touchPad = document.getElementById("touchpad");
  //var draftPad = document.getElementById("drafts");
  if (!showTouchPad) {
    touchPad.classList.add("hidden");
    //draftPad.classList.add("hidden");
  } else {
    touchPad.classList.remove("hidden");
    //draftPad.classList.remove("hidden");
    //console.log(touchPad.style.left, touchPad.style.top );
  }
};

var handleDraftCellClick= function(innderDiv)
{
  return function() {
    var rowIndex = selectedCell[0].getAttribute("data-row");
    var colIndex = selectedCell[0].getAttribute("data-col");
    for (var i=0;i<9;i++)
    {
      var indv =document.createElement("div");
      indv.setAttribute("class","draftCell");
      indv.innerHTML=i+1;
      selectedCell[0].appendChild(indv);
    }
  };
};

var handleTouchPadCellClick = function(innderDiv, index) {      //xử lý nhập từ bảng số
  return function() {
    var rowIndex = selectedCell[0].getAttribute("data-row");
    var colIndex = selectedCell[0].getAttribute("data-col");
    var value = index + 1;
    var classList=selectedCell[0].classList;
    // console.log(innderDiv, index);
    // console.log(selectedCell);
    // TODO:
    // pass value from touchPadDiv to selectedCell
    if (value<10)             //nếu bé hơn 10 thì làm
    {
      var prevValue = parseInt(selectedCell[0].innerText);
      selectedCell[0].innerHTML = value;
      sudokuArray[rowIndex][colIndex] = value;
      var obj = {
        RowIndex: rowIndex,
        ColIndex: colIndex,
        value: value,
        preValue: prevValue
      };
      if (
        undoStack.length === 0 ||
        (undoStack[undoStack.length - 1].ColIndex !== obj.ColIndex &&
          undoStack[undoStack.length - 1] !== obj.RowIndex)
      ) {

        if (Checksudoku1(obj)===1)
        {
          if (classList.value.indexOf("wrong")>0)
            classList.remove("wrong");
        } else 
        {
          //báo sai.
          //if (classList.indexOf("wrong")<0)
          classList.add("wrong");
        }
        undoStack.push(obj);
        undoSelectedCell.push(selectedCell[0]);
      } else if (
        undoStack[undoStack.length - 1].ColIndex !== obj.ColIndex ||
        undoStack[undoStack.length - 1].RowIndex !== obj.RowIndex
      ) {
        if (Checksudoku1(obj)===1)
        {
          if (classList.value.indexOf("wrong")>0)
          classList.remove("wrong");
        }
        else 
        {
          //báo sai.
          //if (classList.indexOf("wrong")<0)
            classList.add("wrong");
        }
        undoStack.push(obj);
        undoSelectedCell.push(selectedCell[0]);
      } else if (undoStack[undoStack.length - 1].value !== obj.value) {
        if (Checksudoku1(obj)===1)
        {
          if (classList.value.indexOf("wrong")>0)
          classList.remove("wrong");

        }
        else 
        {
          //báo sai.
          //if (classList.indexOf("wrong")<0)
          classList.add("wrong");
        }
        undoStack.push(obj);
        undoSelectedCell.push(selectedCell[0]);
      } else if (undoStack[undoStack.length - 1].value === obj.value) {
        console.log("duplicate!");
      }
      console.log(undoStack);
    }
    else 
    {
      if (value==10)
      {
      //nhấp vào del thì sẽ kiểm tra có sô ở ô đang nhấp k.
      if (sudokuArray[rowIndex][colIndex]!=="")
      {
        //xóa innerhtml
        selectedCell[0].innerHTML="";
        //xóa trong mảng.
        sudokuArray[rowIndex][colIndex]="";
      }
      //nếu có thì xóa khỏi sudokuarray. nếu không thì không làm gì.
      }
      else if (value>10)
      {
        var cf=confirm("are you really want to solve this cell?");
        if (cf===true)
        {
          SolveSu();
          sudokuArray[rowIndex][colIndex]=solveSudokuArr[rowIndex][colIndex];
          selectedCell[0].innerHTML=solveSudokuArr[rowIndex][colIndex];
          selectedCell[0].setAttribute("id", "base");
          if (classList.value.indexOf("wrong")>0)
            classList.remove("wrong");
            toggleTouchPad(false,rowIndex,colIndex);  
        }
      }
    }
  };
};

var handleSudokuCellClick = function(innerDiv, rowIndex, colIndex) {
  return function() {

    var classList = innerDiv.classList;
    // console.log(classList);
    if (selectedCell) {
      if (selectedCell.length === maxCellStack) {
        // console.log('full stack');
        selectedCell[0].classList.remove("active");
        selectedCell.shift();
      }
    }
    if (classList.value.indexOf("active") < 0) {
      classList.add("active");
      selectedCell.push(innerDiv);
      if (innerDiv.getAttribute("id") === null) {
        toggleTouchPad(true, {
          x: event.clientX,
          y: event.clientY
        });
      } else {
        toggleTouchPad(false);
      }
    } else {
      // flag = false;
      classList.remove("active");
      toggleTouchPad(false);
    }
  };
};


var t = new Date();
var timer = 0;
var timerInterval = null;
var min = 0,hour = 0;
var timeFlag=0;
var startTimer = function() {
  if (timeFlag===0)
  {
    timerInterval = setInterval(function() {
      timer += 1;
      if (timer === 60) {
        if (min >= 59) {
          hour += 1;
          min = 0;
        } else if (min < 10) {
          min += 1;
          if (timer <= 9) {
            document.getElementById("time").innerHTML =
              hour + ":0" + min + ":0" + timer;
          } else if (timer >= 10) {
            document.getElementById("time").innerHTML =
              hour + ":0" + min + ":" + timer;
          }
        } else if (min >= 10) {
          min += 1;
          if (timer < 10) {
            document.getElementById("time").innerHTML =
              hour + ":" + min + ":0" + timer;
          } else if (timer >= 10) {
            document.getElementById("time").innerHTML =
              hour + ":" + min + ":" + timer;
          }
        }
        timer = 0;
      }
      if (timer < 10) {
        document.getElementById("time").innerHTML =
          hour + ":" + min + ":0" + timer;
      } else if (timer >= 10) {
        document.getElementById("time").innerHTML =
          hour + ":" + min + ":" + timer;
      }
      //console.log(hour+':'+min+':'+timer);
    }, 1000);
    // setTimeout(() => {
    //     clearInterval(timerInterval);
    // }, 10000);
  timeFlag=1;
  }
};

var Stopbtn=function()
{
  if (timeFlag===1)
  {
    //clearInterval(timerInterval);
    clearInterval(timerInterval);
    timeFlag=2;
  }
  else
  if (timeFlag===2)
  {
    timeFlag=0;
    startTimer();
    timeFlag=1;
  }
};


document.addEventListener("DOMContentLoaded", function() {
  var max = 9;
  copyOfSudokuArr();
  render(sudokuArray);
  renderNum(max);
  renderDrafts(max);
});

document.addEventListener("click", function(event) {
  // console.log(event);
  if (
    event.target &&
    (event.target.classList.contains("col") ||
      event.target.classList.contains("cell"))
  ) {
    // ko lam gi het
    // event.preventDefault();
    return;
  } else {
    toggleTouchPad(false);
    clearSelectedCell();
  }
});