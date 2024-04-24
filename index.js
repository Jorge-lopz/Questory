
// NAME CHANGE INFORMATION POPUP

function showMessage() {
  ;
  if (document.getElementById('name-input').value == "") {
    iziToast.info({
      message: 'The chosen name will also be used in-game',
      position: 'bottomLeft',
      backgroundColor: '#a7e1ff',
      displayMode: 2
    });
  }
}


//HEADER

const mapIcon = document.getElementById('map-icon');

const maxPulseDistance = mapIcon.width * 2.2;

document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {

  const rect = mapIcon.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const distanceToCenter = Math.sqrt((mouseX - (rect.width / 2)) ** 2 + (mouseY - (rect.height / 2)) ** 2);

  if (distanceToCenter < maxPulseDistance) {
    mapIcon.style.animationIterationCount = 'infinite';
    if (!mapIcon.classList.contains('map-icon-animation')) {
      mapIcon.classList.add('map-icon-animation');
    }
  } else {
    mapIcon.style.animationIterationCount = '1';
    mapIcon.addEventListener('animationend', function handler() {
      mapIcon.classList.remove('map-icon-animation');

      // Remove the event listener to clean up
      mapIcon.removeEventListener('animationend', handler);
    });
  }
}

