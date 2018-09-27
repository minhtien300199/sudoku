
// var fillNumber = function () {
//     var max = 81;
//     var slc = document.querySelectorAll(".col");
//     for (var i = 0; i < max; i++) {
//         slc[i].textContent = i;
//     }
// };

var array = [
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9],
    [1, 2, 3, 4 ,5 ,6, 7, 8,9], 
];


var render = function (boardsArray) {
    // console.log(boardsArray);
    var container = document.getElementById('app');
    var max = 9;
    // console.log(container);
    for (var rowIndex = 0; rowIndex < max; rowIndex++) {
        var div = document.createElement("div");
        if ((rowIndex + 1) % 3 === 0) {
            div.setAttribute('class', 'row row-even')
        } else {
            if (rowIndex === 0) {
                div.setAttribute('class', 'row row-even-2');
            } else div.setAttribute('class', 'row');
        }

        for (colIndex = 0; colIndex < max; colIndex++) {

            var innerDiv = document.createElement("div");
            if ((colIndex + 1) % 3 === 0) {
                innerDiv.setAttribute('class', 'col col-even');

            } else {
                if (colIndex === 0) {
                    innerDiv.setAttribute('class', 'col col-even-2');
                } else {
                    innerDiv.setAttribute('class', 'col');
                }
            }
            try {
                innerDiv.innerText = boardsArray[rowIndex][colIndex];
            }
            catch( ex) {
                console.log(rowIndex, colIndex);
            }
            //nhập ma trận. và xử lý nhập xuất số
            div.appendChild(innerDiv);
        }
        container.appendChild(div);
    }
    // fillNumber();
};

document.addEventListener("DOMContentLoaded", function() {
    render(array);
});
