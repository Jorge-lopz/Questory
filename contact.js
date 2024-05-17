import { Application } from './dependencies/@splinetool/runtime/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const container3d = document.getElementById('container-3d');
const fullscreenButton = document.getElementById('fullscreenButton');

// Disables/changes a specific control -> spline._controls.gameControl.keyAssignments[8] = ['none', ' '];

var donecheckingMinigame = false;

// Start the application and load the scene
const spline = new Application(canvas);
spline.load('https://prod.spline.design/m1eKnfuIs96S75cw/scene.splinecode')
    .then(() => {
        const character = spline.findObjectById('73dc538a-348e-41bd-b216-f86e3d6a3ccd');
        const tutorialBoat = spline.findObjectById('a71a7fdd-60db-4de9-b376-342dc81249a0');
        // console.log(spline._controls);

        //spline.setVariable('completedMinigame', get from localStorage);

        setInterval(() => { //CHECK VARIABLES HERE
            if (!donecheckingMinigame) {
                if (spline.getVariable('completedMinigame') === true) enableMouseControls();
            }
        }, 100)
    });

fullscreenButton.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (container3d.classList.contains('fullscreen')) container3d.classList.remove('fullscreen');
    else container3d.classList.add('fullscreen');
}

function enableMouseControls() {
    if (container3d.classList.contains('minigame')) container3d.classList.remove('minigame');
    donecheckingMinigame = true;
}