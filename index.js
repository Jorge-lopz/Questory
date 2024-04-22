
// NAME MESSAGE ALERT
function showMessage() {
  var message = document.getElementById("message-alert");

  // Establecer la opacidad inicial
  message.style.opacity = 1;

  setTimeout(function() {
    message.style.opacity = 0;
  }, 5000); 
}

// NAME LENGTH TESER
// Everytime you type while chosing your name 
// it checks that it is no longer than 12 letters
var input = document.getElementById('input');
input.addEventListener('input', function(event) {
  var cantidadCaracteres = input.value.length;

  if(cantidadCaracteres > 12){
    window.alert('Máximo número de caracteres alcanzado');
    input.value = input.value.substring(0,input.value.length - 1);
  }
});
