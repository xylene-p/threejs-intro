// import * as THREE from "three";
// import gsap from "gsap";

// import Stats from "three/addons/libs/stats.module.js";
// import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";

// let camera, scene, renderer, object, stats;

// let light1, light2, light3, light4;

// let lights = [light1, light2, light3, light4]; // Your light objects

// const clock = new THREE.Clock();

// let controls, composer;

// let sceneDesc;

// let newAudio;

// let scene2lights = [];

// init();

// function onMouseClick(event) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children, true);

//   if (intersects.length > 0) {
//     const clickedObject = intersects[0].object;

//     // Calculate bounding box and center
//     const box = new THREE.Box3().setFromObject(clickedObject);
//     const center = box.getCenter(new THREE.Vector3());

//     sceneDesc = "scene2";
//     // Smoothly move camera using GSAP (or another animation library)
//     gsap.to(camera.position, {
//       duration: 1, // Animation duration in seconds
//       x: center.x,
//       y: center.y,
//       z: center.z + 5, // Adjust the distance from the object
//       onUpdate: () => {
//         camera.lookAt(center); // Keep camera focused on the center
//       },
//     });
//   }
// }

// function init() {
//   camera = new THREE.PerspectiveCamera(
//     50,
//     window.innerWidth / window.innerHeight,
//     1,
//     1000
//   );
//   camera.position.z = 5;

//   sceneDesc = "scene1";

//   scene = new THREE.Scene();

//   // audio

//   newAudio = document.createElement("audio");
//   newAudio.src = "./mumbleworld00.flac";
//   newAudio.controls = true;
//   newAudio.id = "mumbleworld";
//   newAudio.autoplay = true;

//   document.body.appendChild(newAudio);

//   //model

//   //   const loader = new OBJLoader();
//   //   loader.load("public/WaltHead.obj", function (obj) {
//   //     object = obj;
//   //     object.scale.multiplyScalar(0.8);
//   //     object.position.y = -30;
//   //     scene.add(object);
//   //   });

//   //   const loader = new GLTFLoader();
//   //   loader.load("public/lowpoly_cd.glb", function (gltf) {
//   //     scene.add(gltf.scene);
//   //   });

//   window.addEventListener("click", onMouseClick, false);

//   const sphereGeo = new THREE.SphereGeometry(1);
//   const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
//   const globe = new THREE.Mesh(sphereGeo, material);
//   scene.add(globe);

//   const sphere = new THREE.SphereGeometry(0.5, 16, 8);

//   //lights

//   const colors = [0xff0040, 0x0040ff, 0x80ff80, 0xffaa00];

//   for (const color of colors) {
//     const light = new THREE.PointLight(color, 400);

//     // Assuming "sphere" is already defined as a THREE.SphereGeometry
//     const lightSphere = new THREE.Mesh(
//       sphere,
//       new THREE.MeshBasicMaterial({ color })
//     );

//     light.add(lightSphere);
//     scene.add(light);
//   }

//   //renderer

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setAnimationLoop(animate);
//   document.body.appendChild(renderer.domElement);

//   const loader = new GLTFLoader();
//   loader.load("./night_playground_scan.glb", function (gltf) {
//     // gltf.scene.size = 100;
//     // const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
//     // const playground = new THREE.Mesh(gltf.scene, material);
//     scene.add(gltf.scene);
//   });

//   // composer
//   composer = new EffectComposer(renderer);
//   composer.addPass(new RenderPass(scene, camera));
//   composer.addPass(
//     new UnrealBloomPass(
//       new THREE.Vector2(window.innerWidth, window.innerHeight),
//       1.5,
//       0.4,
//       0.85
//     )
//   );

//   controls = new OrbitControls(camera, renderer.domElement);
//   camera.position.set(20, 50, 1);
//   controls.update();

//   //stats

//   //   stats = new Stats();
//   //   document.body.appendChild(stats.dom);

//   window.addEventListener("resize", onWindowResize);
// }

// let cube2, scene2, camera2, renderer2;

// function initScene2() {
//   console.log("init scene2");

//   const mumble = document.getElementById("mumbleworld");
//   if (mumble) {
//     mumble.pause();
//     mumble.parentElement.removeChild(mumble);
//   }

//   const newText = document.getElementById("info");
//   newText.textContent = "...and you're in a new place...";

//   const audio = document.createElement("audio");
//   audio.src = "./useful.m4a";

//   // (Optional) Add other attributes:
//   audio.controls = true; // Show browser controls
//   audio.autoplay = true; // Start playing automatically

//   document.body.appendChild(audio);

//   const sphere = new THREE.SphereGeometry(0.5, 16, 8);

//   for (let i = 0; i < 5; i++) {
//     let light = new THREE.PointLight(0xffaa00, 400);
//     light.add(
//       new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 }))
//     );
//     scene.add(light);
//   }
//   //   const mumbleAudio = document.getElementById("mumbleworld00");
//   //   mumbleAudio.pause();
//   //   mumbleAudio.parentNode.removeChild(mumbleAudio);
//   //   console.log("removed audio element");
//   //   scene2 = new THREE.Scene();
//   //   camera2 = new THREE.PerspectiveCamera(
//   //     75,
//   //     window.innerWidth / window.innerHeight,
//   //     0.1,
//   //     1000
//   //   );

//   //   renderer2 = new THREE.WebGLRenderer();
//   //   renderer2.setSize(window.innerWidth, window.innerHeight);
//   //   renderer2.setAnimationLoop(animate2);
//   //   console.log("removing child");
//   //   document.body.removeChild(renderer.domElement);
//   //   document.body.appendChild(renderer2.domElement);

//   //   const geometry = new THREE.BoxGeometry(1, 1, 1);
//   //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   //   cube2 = new THREE.Mesh(geometry, material);
//   //   scene2.add(cube2);

//   //   camera.position.z = 5;
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate2() {
//   cube2.rotation.x += 0.01;
//   cube2.rotation.y += 0.01;

//   renderer.render(scene2, camera2);
// }

// function animate() {
//   render();
//   controls.update();
//   if (sceneDesc == "scene1") {
//     camera.position.y -= 0.05;
//     camera.position.z -= 0.05;
//     camera.position.x -= 0.05;
//   } else if (sceneDesc == "scene2") {
//     camera.position.z -= 0.01;
//     // console.log(camera.position.z);
//     if (sceneDesc == "scene2" && camera.position.z <= 3) {
//       sceneDesc = "scene3";
//       initScene2();
//       camera.position.z = 0;
//     }
//   } else {
//     // console.log("scene3");
//     camera.position.z = 0;
//   }

//   //   stats.update();
// }

// // Array to store position modifiers for each light
// const positionModifiers = [
//   [0.7, 0.5, 0.3], // Light 1
//   [0.3, 0.5, 0.7], // Light 2
//   [0.7, 0.3, 0.5], // Light 3
//   [0.3, 0.7, 0.5], // Light 4
// ];

// function updateLightPositions(time) {
//   //   for (let i = 0; i < lights.length; i++) {
//   //     const light = lights[i];
//   //     const [xMod, yMod, zMod] = positionModifiers[i];

//   //     light.position.set(
//   //       Math.sin(time * xMod) * 30,
//   //       Math.cos(time * yMod) * 40,
//   //       Math.cos(time * zMod) * 30
//   //     );
//   //   }
//   for (let i = 0; i < lights.length; i++) {
//     lights[i].position.set(0, 1, 2);
//   }
// }

// function render() {
//   const time = Date.now() * 0.0005;
//   const delta = clock.getDelta();

//   if (object) object.rotation.y -= 0.5 * delta;

//   updateLightPositions(time);

//   renderer.render(scene, camera);
//   composer;
// }

import * as THREE from "three";
import { WebGLRenderer } from "three";
import * as ObjectCloud from "./objects/ObjectCloud";
import { AmbientLight, DirectionalLight } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import TWEEN from "@tweenjs/tween.js";
const clock = new THREE.Clock();

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({
  powerPreference: "high-performance",
  antialias: false,
  stencil: false,
  depth: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00fff0 });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 1;
scene.add(cube);

// controls

let controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(38, -31, -36);
controls.update();
// controls.addEventListener("change", (event) => {
//   console.log(controls.object.position);
// });

// bloom effect

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect()));

// lights

const ambientLight = new AmbientLight(0xffa500);
const mainLight = new DirectionalLight(0xffffff, 3);
mainLight.position.set(20, -20, 1);

scene.add(ambientLight, mainLight);

const secondaryLight = mainLight.clone();
secondaryLight.position.set(20, 1, -20);
scene.add(ambientLight, secondaryLight);

const tertiaryLight = mainLight.clone();
tertiaryLight.position.set(-20, 1, 20);
scene.add(ambientLight, tertiaryLight);

// const cloud = ObjectCloud.create();
// scene.add(cloud);

const platformGeometry = new THREE.PlaneGeometry(5, 5); // Adjust size as needed
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White platform
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
scene.add(platform);
platform.rotation.x = -Math.PI / 2; // Rotate to be horizontal

const orangeMaterial = new THREE.MeshStandardMaterial({
  color: "orange",
  flatShading: true,
  side: THREE.BackSide,
  metalness: 0.8,
  roughness: 0.2,
});

const navyMaterial = new THREE.MeshStandardMaterial({
  color: "navy",
  flatShading: true,
  side: THREE.BackSide,
  metalness: 0.8,
  roughness: 0.2,
});

var cosmos = new THREE.Mesh(new THREE.IcosahedronGeometry(30, 5), navyMaterial);
scene.add(cosmos);

var cosmos2 = new THREE.Mesh(
  new THREE.IcosahedronGeometry(30, 5),
  navyMaterial
);
cosmos2.rotation.y = 0.1;
scene.add(cosmos2);

let cosmos3 = cosmos.clone();
cosmos3.rotation.y = -0.1;
scene.add(cosmos3);

camera.position.x = 38;
camera.position.y = -33;
camera.position.z = -35;

const audio = document.createElement("audio");
audio.src = "./useful.m4a";

const loader = new GLTFLoader();

// (Optional) Add other attributes:
audio.controls = true; // Show browser controls
audio.autoplay = false; // Start playing automatically

document.body.appendChild(audio);

requestAnimationFrame(function render() {
  requestAnimationFrame(render);
  composer.render();
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const SCENE2 = new THREE.Vector3(50, 50, 50);

function loadModel(loader, modelPath, position = new THREE.Vector3(0, 0, 0)) {
  return new Promise((resolve, reject) => {
    loader.load(
      modelPath,
      function (gltf) {
        gltf.scene.position.copy(position);
        // controls.target.set(position);
        scene.add(gltf.scene);
        resolve(gltf); // Resolve the promise with the loaded gltf object
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error); // Reject the promise on error
      }
    );
  });
}

function loadScene2() {
  const texture = new THREE.TextureLoader().load("./WMAP_2012.png");
  scene.background = texture;
}

function onPointerDown(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObject(cube);

  if (intersects.length > 0) {
    // change camera position
    // console.log("change camera position");
    // const newPosition = new THREE.Vector3(-42, 44, 4);
    loadScene2();
    const newPosition = SCENE2;
    const loadedModelPromise = loadModel(
      loader,
      "night_playground_scan.glb",
      SCENE2
    );
    loadedModelPromise.then((gltf) => {
      // Use the loaded gltf object here
      // camera.lookAt(gltf.position);
      // You can also store it in a variable
      const playground = gltf;
      const targetPosition = new THREE.Vector3();
      playground.getWorldPosition(targetPosition);
      const desiredXDistance = 50; // Change this to your desired distance

      const cameraPosition = new THREE.Vector3(
        targetPosition.x + desiredXDistance,
        targetPosition.y + desiredXDistance,
        targetPosition.z
      );
      camera.position.copy(cameraPosition);
      camera.lookAt(camera.lookAt(targetPosition));
      controls.target.copy(targetPosition);
    });
    new TWEEN.Tween(camera.position)
      .to(newPosition, 1000) // 1000ms duration
      .easing(TWEEN.Easing.Quadratic.InOut) // Easing function
      .start();
  }
}

window.addEventListener("pointerdown", onPointerDown);

const radius = 5;
let angle = 0;

function animate() {
  //   time = Date.now() * 0.0005;
  //   const t = clock.getDelta() + 0.5;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cosmos.rotation.x += 0.005;
  cosmos.rotation.y -= 0.005;
  cosmos3.rotation.x += 0.01;
  cosmos3.rotation.y -= 0.01;
  const time = Date.now() * 0.0005; // Time factor for smooth animation

  // Example 1: Simple cycling through RGB colors
  const r = Math.sin(time * 0.7) * 0.5 + 0.5;
  const g = Math.sin(time * 0.3) * 0.5 + 0.5;
  const b = Math.sin(time * 1.3) * 0.5 + 0.5;
  mainLight.color.setRGB(r, g, b);

  // Update the camera's position
  //   console.log("changing camera pos");
  //   angle += 0.01; // Adjust this for the speed of rotation
  //   camera.position.x = radius * Math.cos(angle);
  //   camera.position.z = radius * Math.sin(angle);
  //   console.log(changing ligh)
  //   cosmos.rotation.x = 2 * t;
  //   cosmos.rotation.y = -2 * t;
  //   cosmos2.rotation.x = -1.5 * t;
  //   cosmos2.rotation.y = 1.5 * t;
  //   camera.position.x -= 0.5;
  //   camera.position.y += 0.5;
  //   camera.position.z += 0.5;

  //   console.log(camera.position.x, camera.position.y, camera.position.z);

  TWEEN.update();

  renderer.render(scene, camera);
}
