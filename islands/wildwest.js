import { Application } from '../dependencies/@splinetool/runtime/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const container3d = document.getElementById('container-3d');
const fullscreenButton = document.getElementById('fullscreenButton');
const secrets = document.getElementById('secrets');

//localStorage.clear();

container3d.classList.remove('minigame');

localStorage.setItem('TimeWildWest', '0');
if (localStorage.getItem('TimeWildWest') !== null) document.getElementById('time').innerHTML = localStorage.getItem('TimeWildWest').replace(/^0+(?=\d)/, '') || 0;
updateSecrets();

// Start the application and load the scene

const spline = new Application(canvas);
spline.load('https://prod.spline.design/H1FQzVfnVQwkBZhk/scene.splinecode')
    .then(() => {

        // SPLINE - Cow interact sound

        updateSplineVariables();

        loadedSpline();

        setInterval(() => { //CHECK VARIABLES HERE;
            if (spline.getVariable('Time') != "00:00:00")
                localStorage.setItem('TimeWildWest', (parseInt(spline.getVariable('Time').split(':')[1]) + parseInt(localStorage.getItem('TimeWildWest'))).toString());
            if (localStorage.getItem('TimeWildWest') !== null) document.getElementById('time').innerHTML = localStorage.getItem('TimeWildWest').replace(/^0+(?=\d)/, '') || '0';
            if (spline.getVariable('sheriffStar') === true) { localStorage.setItem('sheriffStar', true); updateSecrets(); };
            if (spline.getVariable('cow') === true) { localStorage.setItem('cow', true); updateSecrets(); };
            if (spline.getVariable('criminalFound') === true) { localStorage.setItem('criminalFound', true); showObjectList(); }
            if (spline.getVariable('Find 1') === 2) localStorage.setItem('Find 1', 2);
            if (spline.getVariable('Find 2') === 2) localStorage.setItem('Find 2', 2);
            if (spline.getVariable('Find 3') === 2) localStorage.setItem('Find 3', 2);
            if (spline.getVariable('objectsCollected') !== 0) localStorage.setItem('objectsCollected', spline.getVariable('objectsCollected'));
        }, 100)
    });

fullscreenButton.addEventListener('click', toggleFullscreen);

function handleEscKey(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        toggleFullscreen(); // To disable fullscreen
    }
}

function updateSplineVariables() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if (key == 'TimeWildWest') continue;
        if (key == 'objectsCollected' && value == 3) { spline.setVariable(key, 4); continue; }
        spline.setVariable(key, value);
    }
}

function updateSecrets() {
    if (localStorage.getItem('cow') || localStorage.getItem('sheriffStar')) {
        if (localStorage.getItem('cow') && localStorage.getItem('sheriffStar')) secrets.innerHTML = '2';
        else secrets.innerHTML = '1';
    } else secrets.innerHTML = '0';
}

function showObjectList() {

    if (localStorage.getItem('Find 1') != 2)
        iziToast.info({
            class: 'moneybag',
            message: 'Money Bag',
            position: 'topLeft',
            backgroundColor: '#f0f0f0',
            timeout: false,
            close: false,
            displayMode: 1,
            messageSize: 16,
            progressBar: false
        });
    else {
        try {
            iziToast.hide({}, document.querySelector('.moneybag'));
        } catch (error) {
        }
    }
    if (localStorage.getItem('Find 2') != 2)
        iziToast.info({
            class: 'gem',
            message: 'Gem',
            position: 'topLeft',
            backgroundColor: '#f0f0f0',
            timeout: false,
            close: false,
            displayMode: 1,
            messageSize: 16,
            progressBar: false
        });
    else {
        try {
            iziToast.hide({}, document.querySelector('.gem'));
        } catch (error) {
        }
    }
    if (localStorage.getItem('Find 3') != 2)
        iziToast.info({
            class: 'briefcase',
            message: 'Briefcase',
            position: 'topLeft',
            backgroundColor: '#f0f0f0',
            timeout: false,
            close: false,
            displayMode: 1,
            messageSize: 16,
            progressBar: false
        });
    else {
        try {
            iziToast.hide({}, document.querySelector('.briefcase'));
        } catch (error) {
        }
    }
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
