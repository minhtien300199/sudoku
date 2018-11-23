var solveFullMatrix = function() {
  resetButton(); //
  var sure = confirm("bạn chắc có muốn solve?");
  if (sure === true) {
    SolveSu(); //hàm giải
    var flag = 0;
    //so sánh 2 ma trận bằng vòng lặp
    for (var rowIndex = 8; rowIndex >= 0; rowIndex--) {
      for (var colIndex = 8; colIndex >= 0; colIndex--) {
        //nếu trên ma trận sai hoặc chưa có thì put vào từ bên solvesudokuarr.
        if (
          sudokuArray[rowIndex][colIndex] !== solveSudokuArr[rowIndex][colIndex]
        ) {
          var cache = sudokuStack.pop();

          sudokuArray[rowIndex][colIndex] = cache.value;
          flag = 1; //gắn id =base
        }
        //in ra html
        var popResult = solveStack.pop();
        var classList = popResult.classList;
        if (classList.value.indexOf("wrong") > 0) classList.remove("wrong");
        if (popResult) {
          popResult.innerHTML = sudokuArray[rowIndex][colIndex];
          if (flag === 1) {
            popResult.setAttribute("id", "base");
            flag = 0;
          }
        } else {
          return;
        }
      }
    }
  }
};

var resetButton = function() {
  //set mọi thứ về 0;

  while (undoStack.length != 0) {
    undoButton();
  }

  undoStack = [];
  undoSelectedCell = [];
  redoStack = [];
  redoSelectedCell = [];
  //xóa nháp
  var container= document.getElementById("app");
  for (var row=0;row<9;row++)
    for (var col=0;col<9;col++)
    {
      if (sudokuArray[row][col]=="")
      {
        if (container.childNodes[row].childNodes[col].hasChildNodes()==true  )  //nghĩa là có con
        {
          container.childNodes[row].childNodes[col].innerHTML="";
        }
      }

    }
};

var redoButton = function() //hàm redo
{
  if (redoStack != 0) {
    var obj = redoStack.pop();
    undoStack.push(obj);
    var container = redoSelectedCell.pop();
    undoSelectedCell.push(container);
    if (Checksudoku1(obj) === 1) {
      container.classList.remove("wrong");
    } else {
      container.classList.add("wrong");
    }
    container.innerHTML = obj.value;
    sudokuArray[obj.RowIndex][obj.ColIndex] = obj.value;
  }
};

var undoButton = function() {
  //hàm undo.
  if (undoStack != 0) {
    var obj = undoStack.pop();
    var preobj = undoStack[undoStack.length - 1];
    var row = obj.RowIndex;
    var col = obj.ColIndex;
    redoStack.push(obj); //redostack;
    var container = undoSelectedCell.pop();
    redoSelectedCell.push(container);
    if (undoStack.length == 0) {
      container.innerHTML = "";
      sudokuArray[obj.RowIndex][obj.ColIndex] = "";
    } else {
      if (isNaN(obj.preValue) == true) {
        container.innerHTML = "";
        sudokuArray[obj.RowIndex][obj.ColIndex] = "";
      } else {
        container.innerHTML = obj.preValue;
        sudokuArray[obj.RowIndex][obj.ColIndex] = obj.preValue;

        if (Checksudoku1(preobj) != 1) {
          container.classList.add("wrong");
        } else {
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
  var draftPad = document.getElementById("drafts");
  if (!showTouchPad) {
    touchPad.classList.add("hidden");
    draftPad.classList.add("hidden");
  } else {
    touchPad.classList.remove("hidden");
    draftPad.classList.remove("hidden");
    //console.log(touchPad.style.left, touchPad.style.top );
  }
};

var createDraftsBlank = function(index) {
  var container = selectedCell[0];
  //kt nếu có  mark rồi hay chưa
  if (container.hasChildNodes() != true) {
    if (container.classList.value.indexOf("wrong") > 0) //nếu có tag wrong thì gỡ ra
      container.classList.remove("wrong");
    //nếu chưa có con  thì tạo
    //container.classList.add("mark");
    //tạo 9 ô.
    for (var i = 0; i < 3; i++) {
      var indivRow = document.createElement("div");
      indivRow.setAttribute("class","row-drafts");
      indivRow.setAttribute("rowPos", i);
      for (var j = 0; j < 3; j++) {
        var indivCol = document.createElement("div");
        indivCol.setAttribute("class", "cell-drafts");
        indivCol.setAttribute("colPos", j);
        indivRow.appendChild(indivCol);
      }
      container.append(indivRow);
    }
  } else 
    {
      if (container.hasChildNodes() === true) {
        //nếu đã tạo rồi thì để yên.
        return 0;
      }
    }
};

var handleDraftCellClick = function(innderDiv, index) {
  return function() {
    createDraftsBlank(index);
    var rowIndex = parseInt(selectedCell[0].getAttribute("data-row"));
    var colIndex = parseInt(selectedCell[0].getAttribute("data-col"));
    //nếu số vừa nhập thỏa 1 div nào đó:
    // if (selectedCell[0].getAttribute("pos") == index)
    //   console.log(selectedCell[0]);
    var value = index + 1;
    if (value<10)
    {
      var row=Math.floor(parseInt(index)/3);
      var col=parseInt(index)%3;
      // if (selectedCell[0].textContent!="") return 0;
      if (sudokuArray[rowIndex][colIndex]!="") return 0;
      if (parseInt(selectedCell[0].children[row].children[col].innerText)==value) //nếu mà ô đó có số thì xóa.
      {
        selectedCell[0].children[row].children[col].innerHTML="";
      }
      else
      {
          if (checkCell(rowIndex,colIndex,value)==1) //nếu thỏa thì cho ghi
          selectedCell[0].children[row].children[col].innerHTML=value;
      }
    }
    else if (value==10)   //nút xóa
    {
    //nhấp vào del thì sẽ kiểm tra có sô ở ô đang nhấp k.
      if (sudokuArray[rowIndex][colIndex]=="")
      {
        //xóa innerhtml
        selectedCell[0].innerHTML="";
        //xóa trong mảng.
      }
    }
  };
};

var handleTouchPadCellClick = function(innderDiv, index) {
  //xử lý nhập từ bảng số
  return function() {
    var rowIndex = selectedCell[0].getAttribute("data-row");
    var colIndex = selectedCell[0].getAttribute("data-col");
    var value = index + 1;
    var classList = selectedCell[0].classList;
    // console.log(innderDiv, index);
    // console.log(selectedCell);
    // TODO:
    // pass value from touchPadDiv to selectedCell
    if (value < 10) {
      //nếu bé hơn 10 thì làm
      var prevValue = parseInt(selectedCell[0].innerText);
      selectedCell[0].innerHTML = value;
      sudokuArray[rowIndex][colIndex] = value;
      var obj = {           //tạo object để lưu vào stack
        RowIndex: rowIndex,
        ColIndex: colIndex,
        value: value,
        preValue: prevValue
      };
      if (Checksudoku1(obj) === 1)
      checkDraftCell(parseInt(obj.RowIndex),parseInt(obj.ColIndex),value);
      
      if (
        undoStack.length === 0 ||
        (undoStack[undoStack.length - 1].ColIndex !== obj.ColIndex &&
          undoStack[undoStack.length - 1] !== obj.RowIndex)
      ) {
        if (Checksudoku1(obj) === 1)  //kt nếu thỏa 
        {
          if (classList.value.indexOf("wrong") > 0)
          {
            classList.remove("wrong");
          }
        } else {
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
        if (Checksudoku1(obj) === 1) {
          if (classList.value.indexOf("wrong") > 0) 
          {
            classList.remove("wrong");
          }
        } else {
          //báo sai.
          //if (classList.indexOf("wrong")<0)
          classList.add("wrong");
        }
        undoStack.push(obj);
        undoSelectedCell.push(selectedCell[0]);
      } else if (undoStack[undoStack.length - 1].value !== obj.value) {
        if (Checksudoku1(obj) === 1) {
          if (classList.value.indexOf("wrong") > 0) 
          {
            classList.remove("wrong");
          }
        } else {
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
    } else {
      if (value == 10) {
        //nhấp vào del thì sẽ kiểm tra có sô ở ô đang nhấp k.
        if (sudokuArray[rowIndex][colIndex] !== "") {
          //xóa innerhtml
          selectedCell[0].innerHTML = "";
          //xóa trong mảng.
          sudokuArray[rowIndex][colIndex] = "";
        }
        //nếu có thì xóa khỏi sudokuarray. nếu không thì không làm gì.
      } else if (value > 10) {
        var cf = confirm("are you really want to solve this cell?");
        if (cf === true) {
          SolveSu();
          sudokuArray[rowIndex][colIndex] = solveSudokuArr[rowIndex][colIndex];
          selectedCell[0].innerHTML = solveSudokuArr[rowIndex][colIndex];
          selectedCell[0].setAttribute("id", "base");
          if (classList.value.indexOf("wrong") > 0) classList.remove("wrong");
          toggleTouchPad(false, rowIndex, colIndex);
        }
      }
    }
  };
};

var handleSudokuCellClick = function(innerDiv, rowIndex, colIndex) {
  return function(event) {
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
var min = 0,
  hour = 0;
var timeFlag = 0;
var startTimer = function() {
  if (timeFlag === 0) {
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
    timeFlag = 1;
  }
};

var Stopbtn = function() {
  if (timeFlag === 1) {
    //clearInterval(timerInterval);
    clearInterval(timerInterval);
    timeFlag = 2;
  } else if (timeFlag === 2) {
    timeFlag = 0;
    startTimer();
    timeFlag = 1;
  }
};
//render dom
document.addEventListener("DOMContentLoaded", function() {
  var max = 9;
  copyOfSudokuArr();
  render(sudokuArray);
  renderNum(max);
  renderDrafts(max);
  //renderModal(max);

  document.addEventListener("click", function(event) {
    // console.log(event);
    if (
      event.target &&
      (event.target.classList.contains("col") ||
        event.target.classList.contains("cell"))||event.target.classList.contains("cell-drafts")
    ) {
      // ko lam gi het
      // event.preventDefault();
      return;
    } else {
      toggleTouchPad(false);
      clearSelectedCell();
    }
  });
  
});


