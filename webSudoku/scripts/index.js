// var fillNumber = function () {
//     var max = 81;
//     var slc = document.querySelectorAll(".col");
//     for (var i = 0; i < max; i++) {
//         slc[i].textContent = i;
//     }
// };

var cellNumberClass = " cell-number";
var maxCellStack = 1;
var selectedCell = [];
var maxUndoStack = 100;
var undoStack = [];
var sudokuArray = [
  [2, 3, 7, 1, 6, 5, 9, 8, 4],
  ['','', '', '', 3, '', 7, 2, 5],
  ['', 4, '', '', 7, '', 6, '', 3],
  ['', 2, '', 7, '', 4, '', '', ''],
  ['', 8, '', '', '', '', 2, 5, 7],
  ['', 7, '', 2, '', 6, '', '', ''],
  [8, '', '', '', '', '', '', 7, ''],
  [3, 1, '', '', 9, 7, '', '', 8],
  [7, 5, 2, 6, '', '', 8, '', '']
];

var undoButton=function()
{
  
};

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

// var changeNum = function(boardsArray, rowIndex, colIndex) {
//   return function() {
//     if (boardsArray[rowIndex][colIndex] === "")
//       console.log(boardsArray[rowIndex][colIndex]);
//   };
// };

var handleTouchPadCellClick = function(innderDiv, index) {
  return function() {
    var rowIndex = selectedCell[0].getAttribute("data-row");
    var colIndex = selectedCell[0].getAttribute("data-col");
    var value = index + 1;
    // console.log(innderDiv, index);
    // console.log(selectedCell);
    // TODO:
    // pass value from touchPadDiv to selectedCell
    var prevValue = parseInt(selectedCell[0].innerText);
    selectedCell[0].innerHTML = value;
    sudokuArray[rowIndex][colIndex] = value;
    var obj = {
      RowIndex: rowIndex,
      ColIndex: colIndex,
      value: value,
      preValue: prevValue
    };
    if(undoStack.length  === 0 || (undoStack[undoStack.length - 1].ColIndex!==obj.ColIndex &&undoStack[undoStack.length-1]!==obj.RowIndex)) 
    {
        undoStack.push(obj);
    }else if (undoStack[undoStack.length - 1].ColIndex!==obj.ColIndex || undoStack[undoStack.length-1].RowIndex!==obj.RowIndex)
    {
       undoStack.push(obj);
    } 
    else if (undoStack[undoStack.length - 1].value !== obj.value)
    {
      undoStack.push(obj);
    }
    else if (undoStack[undoStack.length - 1].value === obj.value) 
    {
        console.log('duplicate!');
    }
    
    console.log(undoStack);
  };
};

var handleSudokuCellClick = function(innerDiv, rowIndex, colIndex) {
  return function() {
    var classList = innerDiv.classList;
    // console.log(classList);
    if (selectedCell) {
      // flag.classList.remove('active');
      // flag = null;
      // console.log(selectedCell);
      if (selectedCell.length === maxCellStack) {
        // console.log('full stack');
        selectedCell[0].classList.remove("active");
        selectedCell.shift();
        // return;
      }
    }
    if (classList.value.indexOf("active") < 0) {
      classList.add("active");
      selectedCell.push(innerDiv);
      if (innerDiv.getAttribute("id")===null)
      {
        toggleTouchPad(true, {
          x: event.clientX,
          y: event.clientY
      });
      } else
      {
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
  for (var index = 0; index < max; index++) {
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "cell " + cellNumberClass);
    innerDiv.innerHTML = index + 1;
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

    for (colIndex = 0; colIndex < max; colIndex++) 
    {
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
        if (innerDiv.textContent!== '')
        innerDiv.setAttribute("id","base");
      } catch (ex) {
        console.log(rowIndex, colIndex);
      }

      //nhập ma trận. và xử lý nhập xuất số
      div.appendChild(innerDiv);
      //innerDiv.addEventListener("click",changeNum(boardsArray,rowIndex,colIndex,innerDiv));
      innerDiv.addEventListener(
        "click",
        handleSudokuCellClick(innerDiv, rowIndex, colIndex)
      );
    }

    container.appendChild(div);
  }

  // fillNumber();
};

var timer = 0;
var timerInterval = null;

var startTimer = function () {
    timerInterval =  setInterval(function() {
        timer += 1;
       // console.log(timer);
        // timer = new Date().getTime() - timer;        
        // console.log(new Date().getTime() - timer);
    }, 1000);

    setTimeout(() => {
        clearInterval(timerInterval);
    }, 10000);
}

document.addEventListener("DOMContentLoaded", function() {
  var max = 9;
  render(sudokuArray);
  renderNum(max);
 // startTimer();
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
/**************************************************************************************************************
 *      giải thuật.
 */

