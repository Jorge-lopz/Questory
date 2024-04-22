function mostrarMensaje() {
  var message = document.getElementById("message-alert");

  // Establecer la opacidad inicial
  message.style.opacity = 1;

  setTimeout(function() {
    message.style.opacity = 0;
  }, 5000); 
}

var input = document.getElementById('input');

input.addEventListener('input', function(event) {
  var cantidadCaracteres = input.value.length;

  if(cantidadCaracteres > 12){
    window.alert('Máximo número de caracteres alcanzado');
    input.value = input.value.substring(0,input.value.length - 1);
  }
});
