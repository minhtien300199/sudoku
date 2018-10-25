
var redoButton =function()
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

var renderNum = function(max) {
  var container = document.getElementById("touchpad");
  for (var index = 0; index < 10; index++) {
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "cell " + cellNumberClass);
    if (index==max)
    {
      innerDiv.innerHTML="Del";
    } else
    {
      innerDiv.innerHTML = index + 1;
    }
    innerDiv.addEventListener(
      "click",
      handleTouchPadCellClick(innerDiv, index)
    );
    container.appendChild(innerDiv);
    //innerDiv.getElementsByClassName('numSet').addEventListener('Click',);
  }
};

var render = function(boardsArray) {
  // console.log(boardsArray);
  var container = document.getElementById("app");
  var max = 9;
  // console.log(container);
  for (var rowIndex = 0; rowIndex < max; rowIndex++) {
    var div = document.createElement("div");
    // var addClass=document.querySelector('.col').classList;
    if ((rowIndex + 1) % 3 === 0) {
      div.setAttribute("class", "row row-even");
    } else {
      if (rowIndex === 0) {
        div.setAttribute("class", "row row-even-2");
      } else div.setAttribute("class", "row");
    }

    for (colIndex = 0; colIndex < max; colIndex++) {
      var innerDiv = document.createElement("div");
      var colClass = "col" + cellNumberClass;
      innerDiv.setAttribute("data-row", rowIndex);
      innerDiv.setAttribute("data-col", colIndex);
      if ((colIndex + 1) % 3 === 0) {
        innerDiv.setAttribute("class", colClass + " col-even");
      } else {
        if (colIndex === 0) {
          innerDiv.setAttribute("class", colClass + " col-even-2");
        } else {
          innerDiv.setAttribute("class", colClass);
        }
      }
      try {
        innerDiv.innerText = boardsArray[rowIndex][colIndex];
        if (innerDiv.textContent !== "") innerDiv.setAttribute("id", "base");
      } catch (ex) {
        console.log(rowIndex, colIndex);
      }
      //nhập ma trận. và xử lý nhập xuất số
      div.appendChild(innerDiv);
      innerDiv.addEventListener(
        "click",
        handleSudokuCellClick(innerDiv, rowIndex, colIndex)
      );
    }
    container.appendChild(div);
  }
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