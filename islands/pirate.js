import { Application } from '../dependencies/@splinetool/runtime/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const container3d = document.getElementById('container-3d');
const fullscreenButton = document.getElementById('fullscreenButton');
const secrets = document.getElementById('secrets');

//localStorage.clear();

var donecheckingMinigame = false;

localStorage.setItem('TimePirate', '0');
if (localStorage.getItem('TimePirate') !== null) document.getElementById('time').innerHTML = localStorage.getItem('TimePirate').replace(/^0+(?=\d)/, '') || 0;
updateSecrets();

// Start the application and load the scene

const spline = new Application(canvas);
spline.load('https://prod.spline.design/m1eKnfuIs96S75cw/scene.splinecode')
    .then(() => {

        // SPLINE - Wilson touch sound
        // SPLINE - Coins disabling with variebal to true

        updateSplineVariables();

        loadedSpline();

        setInterval(() => { //CHECK VARIABLES HERE;
            if (spline.getVariable('Time') != "00:00:00")
                localStorage.setItem('TimePirate', (parseInt(spline.getVariable('Time').split(':')[1]) + parseInt(localStorage.getItem('TimePirate'))).toString());
            if (localStorage.getItem('TimePirate') !== null) document.getElementById('time').innerHTML = localStorage.getItem('TimePirate').replace(/^0+(?=\d)/, '') || '0';
            if (spline.getVariable('wilson') === true) { localStorage.setItem('wilson', true); updateSecrets(); };
            if (spline.getVariable('collectableHat') === true) { localStorage.setItem('collectableHat', true); updateSecrets(); };
            if (playButton.classList.contains('hidden') && spline.getVariable('paused') === true) playButton.classList.remove('hidden');
            if (!donecheckingMinigame) {
                if (spline.getVariable('completedMinigame') === true) {
                    enableMouseControls();
                    localStorage.setItem('completedMinigame', true);
                }
            }
            if (spline.getVariable('Coin 1') === true) localStorage.setItem('Coin 1', true);
            if (spline.getVariable('Coin 2') === true) localStorage.setItem('Coin 2', true);
            if (spline.getVariable('Coin 3') === true) localStorage.setItem('Coin 3', true);
            if (spline.getVariable('Coin 4') === true) localStorage.setItem('Coin 4', true);
            if (spline.getVariable('Coin 5') === true) localStorage.setItem('Coin 5', true);
            if (spline.getVariable('goldenCoinsCollected') !== 0) localStorage.setItem('goldenCoinsCollected', spline.getVariable('goldenCoinsCollected'));
        }, 100)

        setInterval(() => {
            console.log(spline.getVariables());
        }, 5000)

        const playButton = document.getElementById('playButton');
        playButton.addEventListener('click', function () {
            if (!document.getElementById('loader').classList.contains('hidden')) document.getElementById('loader').classList.add('hidden');
            playButton.classList.add('hidden');
            spline.setVariable('paused', false);
        })
    });

fullscreenButton.addEventListener('click', toggleFullscreen);

function handleEscKey(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {

        toggleFullscreen(); // To disable fullscreen
    }
}

function enableMouseControls() {
    if (container3d.classList.contains('minigame')) container3d.classList.remove('minigame');
    donecheckingMinigame = true;
    playButton.classList.add('hidden');
    spline.setVariable('paused', false);
}

function updateSplineVariables() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if (key == 'TimePirate') continue;
        spline.setVariable(key, value);
    }
}

function updateSecrets() {
    if (localStorage.getItem('wilson') || localStorage.getItem('collectableHat')) {
        if (localStorage.getItem('wilson') && localStorage.getItem('collectableHat')) secrets.innerHTML = '2';
        else secrets.innerHTML = '1';
    } else secrets.innerHTML = '0';
}

// GENERAL

function loadedSpline() {

    const loaderText = document.getElementById('loader-state');
    const targetText = "Ready!";
    let currentIndex = loaderText.innerText.length;
    let removing = true; // Start by removing characters

    function updateText() {

        document.getElementById('loader-gif').style.animation = 'hide 0.8s ease-in forwards';
        document.getElementById('loader').style.paddingLeft = '1.1rem';
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

    setTimeout(document.getElementById('container-3d').classList.add('loaded'), 10000);
}

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') event.preventDefault();
});

function toggleFullscreen() {
    const container3d = document.getElementById('container-3d');
    if (container3d.classList.contains('fullscreen')) {
        container3d.classList.remove('fullscreen');
        container3d.classList.add('animate');
        document.getElementById('main').style.overflow = 'auto';
        document.getElementById('music').classList.remove('fullscreen');
        document.removeEventListener('keydown', handleEscKey);
    } else {
        container3d.classList.add('fullscreen');
        container3d.classList.remove('animate');
        document.getElementById('main').style.overflow = 'hidden';
        document.getElementById('music').classList.add('fullscreen');
        document.addEventListener('keydown', handleEscKey);
    }
}
