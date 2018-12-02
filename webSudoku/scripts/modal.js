document.addEventListener('DOMContentLoaded', function () {

    var overlay = document.getElementsByClassName('overlay')[0];
    console.log(overlay);
    overlay.addEventListener('click', function (event) {
        hideModal(this);
    });

});


function showModal() {
    //TODO: show modal
    var overlay = document.getElementsByClassName('overlay')[0];
    overlay.classList.remove('hidden');
}

function hideModal(overlay) {
    //TODO: hide modal
    console.log(event.target);
    if (event.target.classList.contains("startgame")) {
        overlay.classList.add('hidden');
        startTimer();
    }

}