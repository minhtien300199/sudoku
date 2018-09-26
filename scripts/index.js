

var render = function () {    
    var container = document.getElementById('app');
    var max = 9;
    // console.log(container);
    for(var rowIndex = 0; rowIndex < max; rowIndex++) {
        var div = document.createElement("div");
        if ((rowIndex+1)%3===0)
        {
            div.setAttribute('class', 'row row-even')
        } else {
            if(rowIndex===0) {
                div.setAttribute('class','row row-even-2');
            } else div.setAttribute('class', 'row');
        }

        for(colIndex =0; colIndex < max; colIndex++) {
        
            var innerDiv =  document.createElement("div");
            if((colIndex +1) % 3 === 0) {
                innerDiv.setAttribute('class', 'col col-even');

            } else {
                if (colIndex===0)
                {
                    innerDiv.setAttribute('class', 'col col-even-2');
                } else {
                    innerDiv.setAttribute('class', 'col');
                }
            }
            div.appendChild(innerDiv);
        }
        container.appendChild(div);
    }

};

document.addEventListener("DOMContentLoaded", render);
