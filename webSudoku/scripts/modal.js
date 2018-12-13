document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.getElementsByClassName('overlay')[0];
    console.log(overlay);
    document.getElementById('selector').addEventListener('click', renderLevelSelect);
    // document.getElementById('btn-start').addEventListener('click', function () {
    // });
    document.getElementById('startForm').addEventListener('submit', handleSubmit);

    // overlay.addEventListener('click', function (event) {
    //     hideModal(this);
    // });
});
function handleSubmit(event) {
    event.preventDefault();
    // console.log(event);
    if (document.getElementById('selector').selectedIndex !== 0 &&
            document.getElementById('textBox').value !== "") {
                hideModal(document.getElementsByClassName('overlay')[0]);
                matrixGenerator();
                startTimer();                                    
                render(sudokuArray);
                renderNum(max);
                renderDrafts(max);
            
    }
    return false;
}

function showModal() {
    //TODO: show modal
    var overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.remove('hidden');
}

function hideModal(overlay) {
    //TODO: hide modal
    // console.log(event.target);
    overlay.classList.add('hidden');
    // if (event.target.classList.contains("startgame")) {
    //     overlay.classList.add('hidden');

    // }

}