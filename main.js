import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x000000 }); // MeshBasicMaterial doesn't need lightsource
const torus = new THREE.Mesh(geometry, material);

torus.position.set(1.8, 0, -4);
scene.add(torus);

// Our cube with me on it
const meTexture = new THREE.TextureLoader().load('meCutout.png')
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

const controls = new OrbitControls(camera, renderer.domElement);

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

//function for updating window size but requires page reloading whenever
function updateWindowSize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    location.reload();
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
const oceanSound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
// for some reason on page refreshes sometimes audio insn't loading correctly? Possibly when cache not dumped fully?
const audioLoader = new THREE.AudioLoader();
audioLoader.load('UnderwaterSpaceLo.mp3', function(buffer) {
    oceanSound.setBuffer(buffer);
    oceanSound.setLoop(true);
    oceanSound.setVolume(0.03);
    oceanSound.play();
});

// Handles Toggling for volume
// Add onlick event to img
var volumeBtn = document.getElementById("volumeBtn")
volumeBtn.onclick = toggleVolume;

function toggleVolume() {
    if (oceanSound.isPlaying) {
        volumeBtn.src = "volume_off.svg";
        oceanSound.pause()
    } else {
        volumeBtn.src = "volume_mute.svg";
        oceanSound.play()
    }
}

// Main continuous animation function
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;

    meCube.rotation.x += 0.005;
    meCube.rotation.y += -0.005;
    meCube.rotation.z += 0.005;

    renderer.render(scene, camera);
}


animate();