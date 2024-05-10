import { Application } from './dependencies/splinetool/runtime/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const button = document.getElementById('button');

// Start the application and load the scene
const spline = new Application(canvas);
spline.load('https://prod.spline.design/tFmSBFP2EcK41iR4/scene.splinecode');

button.addEventListener('click', () => {
    canvas.requestFullscreen().catch(err => {
        alert('Error attempting to enable full-screen mode: ${err.message} (${err.name})');
    });
});