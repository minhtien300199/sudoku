document.addEventListener('DOMContentLoaded', function() {

    var overlay = document.getElementsByClassName('overlay')[0];
    console.log(overlay);
    overlay.addEventListener('click', function(event) {
        hideModal(this);
    });

});


function showModal() {
     //TODO: show modal
    var overlay = document.getElementsByClassName('overlay')[0];

}

function hideModal(overlay) {
    //TODO: hide modal
    console.log('hide');
    overlay.classList.add('hidden');
}