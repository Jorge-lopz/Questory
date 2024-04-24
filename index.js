
// NAME CHANGE INFORMATION POPUP
function showMessage() {
  iziToast.info({
    message: 'The chosen name will also be used in-game',
    position: 'bottomLeft',
    backgroundColor: '#a7e1ff',
    displayMode: 2
  });
}

// NAME LENGTH CHECK
// Everytime you type while chosing your name it checks that it is not longer than 12 letters
var input = document.getElementById('name-input');
input.addEventListener('input', function (event) {
  var characterCount = input.value.length;

  if (characterCount > 12) {
    iziToast.error({
      message: 'Name length limit reached.',
      position: 'topRight',
      backgroundColor: '#fcb4b8',
      displayMode: 1
    });
    input.value = input.value.substring(0, input.value.length - 1);
  }
});