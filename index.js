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
      if (currentIndex <= targetText.length) {
        loaderText.innerText = targetText.slice(0, currentIndex);
        currentIndex++;
        setTimeout(updateText, 200); // Continue adding characters
      }
    }
  }

  updateText();
}

// NAME INPUT FONT SIZE

document.getElementById('name-input').addEventListener('input', adjustFontSize);
document.getElementById('name-input').addEventListener('input', restrictInput);
document.getElementById('name-input').addEventListener('blur', showMessage);

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

function restrictInput() {
  const invalidChars = /[ \t><*(){}]/g; // Blocks spaces and tabs
  name_input = document.getElementById('name-input')

  if (invalidChars.test(name_input.value)) {
    name_input.value = name_input.value.replace(invalidChars, '');
  }
}

function showMessage() {
  if (document.getElementById('name-input').value.trim() == "") {
    iziToast.warning({
      message: 'The name cannot be empty',
      position: 'bottomLeft',
      backgroundColor: '#f7af8e',
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

function isPrimaryInputTouch() {

  const hasTouchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0; // Checks if touch events have occurred
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches; // Checks if any-pointer is coarse, associated with touch screens
  const cannotHover = window.matchMedia('(hover: none)').matches; // Checks if the primary input method allows hover, which touch does not

  return hasTouchEvents && hasCoarsePointer && cannotHover;
}

// ISLAND NAMES SLIDER
const islandNames = document.querySelectorAll('.island-name');
const islandsContent = document.querySelectorAll('.content');
const islandsContainer = document.querySelector('.islands-container');

var slide = new Glide('.glide', {
  type: 'carousel', // I could use 'carousel' to make it loop seamlsessly, but it produces a weird glitch
  animationDuration: 300,
  focusAt: 'center',
  startAt: islandNames.length / 2, // To start at the center
  keyboard: false,
  perView: window.innerWidth > 1000 ? 3 : 1,
});

const updateSelectedIsland = function () {
  // Remove selected class to all island names
  islandNames.forEach(islandName => { islandName.classList.remove('selected'); });
  // Add selected class to the currrently selected island
  islandNames[Math.abs(slide.index)].classList.add('selected');

  islandsContent.forEach(islandContent => { islandContent.classList.remove('selected'); });
  islandsContent[Math.abs(slide.index) < 5 ? Math.abs(slide.index) : (Math.abs(slide.index % 5))].classList.add('selected');
};

slide.on('run', updateSelectedIsland) // Detect when selected name changes
slide.mount(); // Builds the slider

islandNames[Math.abs(slide.index)].classList.add('selected'); //Initial selection styling
islandsContent[Math.abs(slide.index) < 5 ? Math.abs(slide.index) : (Math.abs(slide.index % 5))].classList.add('selected'); //Initial selection styling

// Function to handle keyboard navigation
function handleKeyboardNavigation(event) {
  if (event.keyCode === 37) { // <-
    slide.go('<');
  } else if (event.keyCode === 39) { // ->
    slide.go('>');
  }
}

islandsContainer.addEventListener('mouseover', () => { document.addEventListener('keydown', handleKeyboardNavigation); });
islandsContainer.addEventListener('mouseout', () => { document.removeEventListener('keydown', handleKeyboardNavigation); });

/* Add event listener for window resize */
window.addEventListener('resize', function () {
  slide.update({
    perView: window.innerWidth > 1000 ? 3 : 1
  });
});

// ISLAND NAMES SLIDER OVERLAY POSITION
function updatePseudoElementPosition() {
  const rect = document.querySelector('.glide').getBoundingClientRect();
  document.documentElement.style.setProperty('--pseudo-before-width', `${rect.width + 4}px`);
  document.documentElement.style.setProperty('--pseudo-before-left', `${rect.left - 2}px`);
  document.documentElement.style.setProperty('--pseudo-before-top', `${rect.top}px`);
}
window.addEventListener('DOMContentLoaded', updatePseudoElementPosition);
window.addEventListener('resize', updatePseudoElementPosition);
window.addEventListener('scroll', updatePseudoElementPosition);