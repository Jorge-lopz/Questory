// LOGO 

document.getElementById('logo').addEventListener('click', function () {
  this.style.animation = 'none';
  if (!this.children[0].classList.contains('rotating')) {
    this.children[0].classList.add('rotating');
  }
  setTimeout(() => { this.style.animation = 'rotate360 0.8s cubic-bezier(.62,.31,.39,.98) forwards' }, 0);
  setTimeout(() => { this.children[0].classList.remove('rotating') }, 400);

});

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

// TODO -> Add logic to modify the notification position if the device is touch only 
// (so that the keyboard is on-screen and covering the default bottom notification)
function showMessage() {
  if (document.getElementById('name-input').value == "") {
    iziToast.info({
      message: 'The chosen name will also be used in-game',
      position: 'bottomLeft',
      backgroundColor: '#a7e1ff',
      displayMode: 2
    });
  }
}