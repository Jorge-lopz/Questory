/*function startAnimation(element) {
  element.classList.add("heartBeatAnimation");
}

function endAnimation(element) {
  element.classList.remove("heartBeatAnimation");
  element.addEventListener("animationend", () => {
    element.classList.remove("heartBeatAnimation");
  });
}*/

const lockboxes = document.getElementsByClassName('box');

for (let i = 0; i < lockboxes.length; i++) {
  lockboxes[i].addEventListener('mouseover', mouseoverbox);
  lockboxes[i].addEventListener('mouseout', mouseoutbox);
}

function mouseoverbox(event) {
  var lockIcon = event.target.querySelector('.lock');
  lockIcon.style.animationIterationCount = 'infinite';
  if (!lockIcon.classList.contains('lock-icon-animation')) {
    lockIcon.classList.add('lock-icon-animation');
  }
}

function mouseoutbox(event) {
  var lockIcon = event.target.querySelector('.lock');
  lockIcon.style.animationIterationCount = '1';
  lockIcon.addEventListener("animationend", () => {
    lockIcon.classList.remove("lock-icon-animation");
  });
};

const progress = document.querySelector(".progress");

progress.addEventListener("load", () => {
  const value = Math.floor(Math.random() * 100);
  progress.style.setProperty("--progress", `${value}%`);
});

