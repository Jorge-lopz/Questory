
// NAME CHANGE INFORMATION POPUP
function showMessage() {
  var message = document.getElementById("message-alert");

  // Sets initiaal opacity
  message.style.opacity = 1;

  setTimeout(function() {
    message.style.opacity = 0;
  }, 5000); 
}

// NAME LENGTH CHECK
// Everytime you type while chosing your name 
// it checks that it is not longer than 12 letters
var input = document.getElementById('input');
input.addEventListener('input', function(event) {
  var characterCount = input.value.length;

  if(characterCount > 12){
    window.alert('Name length limit reached');
    input.value = input.value.substring(0,input.value.length - 1);
  }
});
