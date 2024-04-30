// LOGO 

document.getElementById('logo').addEventListener('click', function () {
  this.style.animation = 'none';
  if (!this.children[0].classList.contains('rotating')) {
    this.children[0].classList.add('rotating');
  }
  setTimeout(() => { this.style.animation = 'rotate360 0.8s cubic-bezier(.62,.31,.39,.98) forwards' }, 0);
  setTimeout(() => { this.children[0].classList.remove('rotating') }, 400);
});

// HERO LOADER

// document.getElementById('3d').addEventListener('load', loadedSpline)
setTimeout(() => { // TODO -> Replace this setTimeout with the actual 3D loading detection above
  loadedSpline()
}, 3000)

function loadedSpline() {

  const loaderText = document.getElementById('loader-state');
  const targetText = "Ready!";
  let currentIndex = loaderText.innerText.length;
  let removing = true; // Start by removing characters

  function updateText() {

    document.getElementById('loader-gif').style.animation = 'hide 0.8s ease-in forwards';
    document.querySelector('.loader').style.paddingLeft = '1.1rem';
    loaderText.style.marginLeft = '-2rem';

    if (removing) {
      currentIndex--;
      loaderText.innerText = loaderText.innerText.slice(0, currentIndex);
      setTimeout(updateText, 100); // Faster character removal speed
      if (currentIndex <= 0) {
        removing = false; // Switch to adding characters once all are removed
      }
    } else {
      loaderText.innerText = targetText.slice(0, currentIndex);
      currentIndex++;
      setTimeout(updateText, 200); // Slower character addition speed
      if (currentIndex > targetText.length) { //Extra actions when finished text animation
        return;
      }
    }
  }

  updateText();
}

// NAME INPUT FONT SIZE

document.getElementById('name-input').addEventListener('input', adjustFontSize);

function adjustFontSize() {
  let fontSize = parseFloat(window.getComputedStyle(this, null).getPropertyValue('font-size'));

  // Reduce font size only when necessary
  if (this.scrollWidth > this.offsetWidth) {
    while (this.scrollWidth > this.offsetWidth && fontSize > 1) {
      fontSize -= 0.5;
      this.style.fontSize = `${fontSize}px`;
    }
  } else {
    // Gently increase font size if there is space and it is not already at max
    let previousFontSize = fontSize;
    while (this.scrollWidth <= this.offsetWidth && fontSize < 45) {
      previousFontSize = fontSize;
      fontSize += 0.5;
      this.style.fontSize = `${fontSize}px`;
      if (this.scrollWidth > this.offsetWidth || fontSize >= 45) {
        fontSize = previousFontSize; // Revert to the last good size
        this.style.fontSize = `${fontSize}px`;
        break;
      }
    }
  }
}

// NAME CHANGE INFORMATION POPUP

function showMessage() {
  if (document.getElementById('name-input').value == "") {
    if (isPrimaryInputTouch()) {
      iziToast.info({
        message: 'The chosen name will also be used in-game',
        position: 'center',
        backgroundColor: '#a7e1ff',
        displayMode: 2
      });
    } else {
      iziToast.info({
        message: 'The chosen name will also be used in-game',
        position: 'bottomLeft',
        backgroundColor: '#a7e1ff',
        displayMode: 2
      });
    }
  }
}

function isPrimaryInputTouch() {

  const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0; // Checks if touch events have occurred
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches; // Checks if any-pointer is coarse, associated with touch screens
  const cannotHover = window.matchMedia('(hover: none)').matches; // Checks if the primary input method allows hover, which touch does not

  return hasTouchEvents && hasCoarsePointer && cannotHover;
}

// ISLAND NAMES SLIDER

const islandNames = document.querySelectorAll('.island-name');
var slide = new Glide('.glide', {
  type: 'carousel', // I could use 'carousel' to make it loop seamlsessly, but it produces a weird glitch
  animationDuration: 300,
  focusAt: 'center',
  startAt: islandNames.length / 2, // To start at the center
  perView: window.innerWidth > 1000 ? 3 : 1,
});
const updateSelectedIsland = function () {
  for (let i = 0; i < islandNames.length; i++) {
    if (islandNames[i].classList.contains('selected'))
      islandNames[i].classList.remove('selected');
  };
  islandNames[Math.abs(slide.index)].classList.add('selected');
};
slide.on('run', updateSelectedIsland) // Detect when selected name changes
slide.mount(); // Builds the slider
islandNames[Math.abs(slide.index)].classList.add('selected'); //Initial selection styling
/* Add event listener for window resize */
window.addEventListener('resize', function () {
  slide.update({
    perView: window.innerWidth > 1000 ? 3 : 1
  });
});

// ISLAND NAMES SLIDER OVERLAY POSITION
function updatePseudoElementPosition() {
  const rect = document.querySelector('.glide').getBoundingClientRect();
  document.documentElement.style.setProperty('--pseudo-before-width', `${rect.width}px`);
  document.documentElement.style.setProperty('--pseudo-before-left', `${rect.left}px`);
  document.documentElement.style.setProperty('--pseudo-before-top', `${rect.top}px`);
}
window.addEventListener('DOMContentLoaded', updatePseudoElementPosition);
window.addEventListener('resize', updatePseudoElementPosition);
window.addEventListener('scroll', updatePseudoElementPosition);

/*<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Carousel with JavaScript</title>
<style>
  .carousel {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    display: flex;
  }

  .item {
    flex: 0 0 100%;
    scroll-snap-align: center;
    max-width: 30%;
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>
</head>
<body>
<div class="carousel" id="carousel">
  <div class="item">Slide 1</div>
  <div class="item">Slide 2</div>
  <div class="item">Slide 3</div>
  <div class="item">Slide 3</div>
  <div class="item">Slide 3</div>

  <!-- Añade más elementos de deslizamiento según sea necesario -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');

  carousel.addEventListener('scroll', function() {
    const containerWidth = carousel.offsetWidth;
    const scrollLeft = carousel.scrollLeft;

    var num = 500;
    var num2 = -500;
    var itemSelected;
    document.querySelectorAll('.item').forEach(function(item) {
      const rect = item.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      var distanceToRightEdge = windowWidth - rect.right;
      var distanceToLeftEdge = rect.left;
      const distanceToEdge = distanceToRightEdge - distanceToLeftEdge;

      item.style.backgroundColor = 'red';

      if (distanceToLeftEdge > 0.2 * window.innerWidth && distanceToRightEdge > 0.2 * window.innerWidth) {
      item.style.backgroundColor = 'blue';
    }


      
    });
  });
});
</script>
</body>
</html>

*/