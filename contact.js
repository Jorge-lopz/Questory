import { Application } from './dependencies/splinetool/runtime/build/runtime.js';


const canvas = document.getElementById('canvas3d');

// Start the application and load the scene
const spline = new Application(canvas);
spline.load('https://prod.spline.design/tFmSBFP2EcK41iR4/scene.splinecode');