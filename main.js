import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Import assets
import volume_mute from './volume_mute.svg';
import volume_off from './volume_off.svg';
import meCutout from './meCutout.png';
import tenderness from './tenderness.mp3';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loadingScreen = document.getElementById('loadingScreen')
const wordleScreen = document.getElementById('wordleScreen')

window.addEventListener('resize', updateWindowSize);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//camera.position.setZ(30);

renderer.render(scene, camera);
// Our torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0x000000 }); // MeshBasicMaterial doesn't need lightsource
// const torus = new THREE.Mesh(geometry, material);

// torus.position.set(1.8, 0, -4);
// scene.add(torus);

// Our cube with me on it
const meTexture = new THREE.TextureLoader().load(meCutout)
const meCube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: meTexture })
);

meCube.position.set(1.8, 0, -4);

scene.add(meCube);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star)
}

Array(200).fill().forEach(addStar);

//const backgroundTexture = new THREE.TextureLoader().load('underwater.jpg');
const backgroundColor = new THREE.Color(0x071333);
scene.background = backgroundColor;

// Old loading
// const loader = new GLTFLoader();

// loader.load('sailing_boat/scene.gltf', function(boatModelAsset) {

//     boatModelAsset.scene.scale.set(0.1, 0.1, 0.1); // scale here
//     boatModelAsset.scene.position.set(-10, -10, -4);

//     scene.add(boatModelAsset.scene);

// }, undefined, function(error) {
//     console.error(error);
// });

// loader.load('low_poly-fish/scene.gltf', function(fishAsset) {
//     for (let i = 0; i < 3; i++) {
//         fishAsset.scene.position.set(i, 0, 0);
//         scene.add(fishAsset.scene);
//     }

// }, undefined, function(error) {
//     console.error(error);
// });

function addWordle(data) {
    if (Array.isArray(data.answer)) {
        console.log(data);
        const h2 = document.createElement("H2");
        const textNode = document.createTextNode(`Day ${data.dayNumber}, I scored ${data.score}`);

        h2.appendChild(textNode); // Add text to h2
        wordleScreen.appendChild(h2); // Display to screen

        data.answer.forEach(line => {
            const p = document.createElement("p");
            const pNode = document.createTextNode(line);
            p.style.cssText = 'margin-bottom: 0px; margin-top: 0px;';
            p.appendChild(pNode);
            wordleScreen.appendChild(p); // Display to screen
            // console.log(line);
        });
    } else {
        console.log(data);
        const h2 = document.createElement("H2");
        const textNode = document.createTextNode(data.answer);

        h2.appendChild(textNode); // Add text to h2
        wordleScreen.appendChild(h2); // Display to screen
    }
}


// New and improved promise loading, better for more objects
let boatModel, fishModel, fishModel2;
let p1 = loadModel("/sailing_boat/scene.gltf").then(result => { boatModel = result.scene.children[0]; });
let p2 = loadModel("/low_poly_fish/scene.gltf").then(result => { fishModel = result.scene.children[0]; });
let p3 = loadModel("/low_poly_fish/scene.gltf").then(result => { fishModel2 = result.scene.children[0]; });
let p4 = fetch('https://wordleapi.herokuapp.com/todaysWordle').then(response => response.json()).then(data => addWordle(data)); // Fetch Wordle API

// Module Loader
function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve, function(xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        });
    });
}

//if all Promises resolved 
Promise.all([p1, p2, p3, p4]).then(() => {
    //do something to the models
    boatModel.position.set(-10, -10, -4);
    boatModel.scale.set(0.1, 0.1, 0.1);

    fishModel.position.set(10, 0, 13);
    fishModel.rotation.z -= 0.4;

    fishModel2.rotation.z += 2.2;
    fishModel2.position.set(-1, -2, 13);

    //add model to the scene
    scene.add(boatModel);
    scene.add(fishModel);
    scene.add(fishModel2);
    loadingScreen.style.display = "none";
});

//function for updating window size but requires page reloading whenever
function updateWindowSize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    //location.reload();
}

function moveCamera() {
    var t = document.body.getBoundingClientRect().top;
    if (t > 0) { // was zooming too far in when scrolling back to top so don't let it go above 0
        t = 0;
    }
    camera.position.x = t * -0.001;
    camera.position.y = t * -0.0001;
    camera.position.z = t * -0.01;
    //console.log(t);
}

document.body.onscroll = moveCamera;

// Load and play ocean sounds
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const backgroundAudio = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load(tenderness, function(buffer) {
    backgroundAudio.setVolume(0.05);
    backgroundAudio.setBuffer(buffer);
    backgroundAudio.setLoop(true);
    //oceanSound.play();
});

// Handles Toggling for volume
// Add onlick event to img
var volumeBtn = document.getElementById("volumeBtn")
volumeBtn.src = volume_off;
volumeBtn.onclick = toggleVolume;

function toggleVolume() {
    if (backgroundAudio.isPlaying) {
        volumeBtn.src = volume_off;
        backgroundAudio.pause()
    } else {
        volumeBtn.src = volume_mute;
        backgroundAudio.play()
    }
}

function hideMain() {
    var x = document.getElementById("main");
    x.style.display = "none";
}

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

// Main continuous animation function
var reachedTop = false;

function animate() {
    requestAnimationFrame(animate);

    // torus.rotation.x += 0.005;
    // torus.rotation.y += 0.005;


    if (camera.position.z > 15) {
        if (typeof fishModel !== 'undefined')
            fishModel.position.x -= 0.01;
        if (typeof fishModel2 !== 'undefined')
            fishModel2.position.x += 0.01;
    }

    // Go up and down like a boat!
    if (meCube.position.y < 0.4 && !reachedTop) {
        meCube.position.y += 0.01;
        if (typeof boatModel !== 'undefined')
            boatModel.position.y += 0.01;
    } else if (meCube.position.y >= 0.4) {
        reachedTop = true;
    }

    if (reachedTop && meCube.position.y > -1) {
        meCube.position.y -= 0.01;
        boatModel.position.y -= 0.01;
    } else if (meCube.position.y <= -1) {
        reachedTop = false;
    }

    meCube.rotation.x += 0.005;
    meCube.rotation.y += -0.005;
    meCube.rotation.z += 0.005;

    controls.update();

    renderer.render(scene, camera);
}
//hideMain();
animate();