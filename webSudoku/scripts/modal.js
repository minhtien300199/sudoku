

        document.addEventListener('DOMContentLoaded', function () {
            var overlay = document.getElementsByClassName('overlay')[0];
            console.log(overlay);
            document.getElementById('selector').addEventListener('click',renderLevelSelect);
            document.getElementById('btn-start').addEventListener('click',function()
            {
                startTimer();
                hideModal(document.getElementsByClassName('overlay')[0]);
                render(sudokuArray);
                renderNum(max);
                renderDrafts(max);
            });
            // overlay.addEventListener('click', function (event) {
            //     hideModal(this);
            // });
        });
function showModal() {
    //TODO: show modal
    var overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.remove('hidden');
}

function hideModal(overlay) {
    //TODO: hide modal
    console.log(event.target);
    overlay.classList.add('hidden');
    // if (event.target.classList.contains("startgame")) {
    //     overlay.classList.add('hidden');

    // }

}