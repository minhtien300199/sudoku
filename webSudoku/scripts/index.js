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
  if (!showTouchPad) {
    touchPad.classList.add("hidden");
  } else {
    touchPad.classList.remove("hidden");
    //console.log(touchPad.style.left, touchPad.style.top );
  }
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
var startTimer = function() {
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
};

document.addEventListener("DOMContentLoaded", function() {
  var max = 9;
  copyOfSudokuArr();
  render(sudokuArray);
  renderNum(max);
  renderDrafts(max);
});

document.addEventListener("click", function(event) {
  SolveSu();    //hàm giải
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