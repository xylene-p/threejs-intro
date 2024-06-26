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
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
