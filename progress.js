var count = 0;

// document.documentElement.style.setProperty('--currentPercentage', (count * 100) / 7);
// document.documentElement.style.setProperty('--currentPercentagePixels', (150 - (1.48 * ((count * 100) / 7))) + "px");

const lockboxes = document.getElementsByClassName('box');

for (let i = 0; i < lockboxes.length; i++) {
  lockboxes[i].addEventListener('mouseover', mouseoverbox);
  lockboxes[i].addEventListener('mouseout', mouseoutbox);
}

function mouseoverbox(event) {
  var lockIcon = event.target.querySelector('.lock');
  try {
    lockIcon.style.animationIterationCount = 'infinite';
    if (!lockIcon.classList.contains('lock-icon-animation')) {
      lockIcon.classList.add('lock-icon-animation');
    }
  } catch (e) { }
};

function mouseoutbox(event) {
  var lockIcon = event.target.querySelector('.lock');
  try {
    lockIcon.style.animationIterationCount = '1';
    lockIcon.addEventListener("animationend", () => {
      lockIcon.classList.remove("lock-icon-animation");
    });
  } catch (e) { }
};

function achievement(id) {
  if (!document.getElementById("lock-" + id).classList.contains("enabled")) {
    count = count + 1;
    document.documentElement.style.setProperty('--currentPercentage', parseInt((count * 100) / 7));
    document.documentElement.style.setProperty('--currentPercentagePixels', (137 - (1.48 * ((count * 100) / 7))) + "px");
  }
  document.getElementById("lock-" + id).classList.add("enabled");
  document.getElementById("achievement-" + id).classList.add("enabled");
}

setInterval(() => {
  if (localStorage.getItem('goldenCoinsCollected') == 5) achievement(1);
  if (localStorage.getItem('collectableHat')) achievement(2);
  if (localStorage.getItem('wilson')) achievement(3);
  if (localStorage.getItem('exploded')) achievement(4);
  if (localStorage.getItem('sheriffStar')) achievement(5);
  if (localStorage.getItem('objectsCollected') == 3) achievement(6);
  if (localStorage.getItem('cow')) achievement(7);

}, 1000);


