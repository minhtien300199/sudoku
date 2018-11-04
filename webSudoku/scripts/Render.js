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
        solveStack.push(innerDiv);
        innerDiv.addEventListener(
        "click",
        handleSudokuCellClick(innerDiv, rowIndex, colIndex)
        );
    }
    container.appendChild(div);
    }
};

var renderNum = function(max) {
    var container = document.getElementById("touchpad");
    for (var index = 0; index < 11; index++) {
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "cell " + cellNumberClass);
    if (index==9)
    {
        innerDiv.innerHTML="Del";
    } else 
    {
        if (index<max)
        innerDiv.innerHTML = index + 1;
        else if (index>9)
        {
            innerDiv.innerHTML="Solve";
        }
    }
    innerDiv.addEventListener(
        "click",
        handleTouchPadCellClick(innerDiv, index)
    );
    container.appendChild(innerDiv);
    }
};

var renderDrafts=function(max)         //hàm dựng viết nháp.
{
var container=document.getElementById("drafts");
for (var index=0;index<10;index++)
{
    var innderDiv=document.createElement("div");
    innderDiv.setAttribute("class","draft-num");
    if (index===max)
    {
    innderDiv.innerHTML="Del";
    }
    else
    {
    innderDiv.innerHTML=index+1;
    }
    container.appendChild(innderDiv);
}
};
