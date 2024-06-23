import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";

let camera, scene, renderer, light1, light2, light3, light4, object, stats;

const clock = new THREE.Clock();

let controls, composer;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;

  scene = new THREE.Scene();

  //model

  //   const loader = new OBJLoader();
  //   loader.load("public/WaltHead.obj", function (obj) {
  //     object = obj;
  //     object.scale.multiplyScalar(0.8);
  //     object.position.y = -30;
  //     scene.add(object);
  //   });

  //   const loader = new GLTFLoader();
  //   loader.load("public/lowpoly_cd.glb", function (gltf) {
  //     scene.add(gltf.scene);
  //   });

  const sphereGeo = new THREE.SphereGeometry(1);
  const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const globe = new THREE.Mesh(sphereGeo, material);
  scene.add(globe);

  const sphere = new THREE.SphereGeometry(0.5, 16, 8);

  //lights

  light1 = new THREE.PointLight(0xff0040, 400);
  light1.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }))
  );
  scene.add(light1);

  light2 = new THREE.PointLight(0x0040ff, 400);
  light2.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff }))
  );
  scene.add(light2);

  light3 = new THREE.PointLight(0x80ff80, 400);
  light3.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 }))
  );
  scene.add(light3);

  light4 = new THREE.PointLight(0xffaa00, 400);
  light4.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 }))
  );
  scene.add(light4);

  //renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load("public/night_playground_scan.glb", function (gltf) {
    // gltf.scene.size = 100;
    // const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // const playground = new THREE.Mesh(gltf.scene, material);
    scene.add(gltf.scene);
  });

  // composer
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    )
  );

  controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(20, 50, 1);
  controls.update();

  //stats

  //   stats = new Stats();
  //   document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  render();
  controls.update();
  camera.position.y -= 0.05;
  camera.position.z -= 0.05;
  camera.position.x -= 0.05;
  //   stats.update();
}

function render() {
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();

  if (object) object.rotation.y -= 0.5 * delta;

  light1.position.x = Math.sin(time * 0.7) * 30;
  light1.position.y = Math.cos(time * 0.5) * 40;
  light1.position.z = Math.cos(time * 0.3) * 30;

  light2.position.x = Math.cos(time * 0.3) * 30;
  light2.position.y = Math.sin(time * 0.5) * 40;
  light2.position.z = Math.sin(time * 0.7) * 30;

  light3.position.x = Math.sin(time * 0.7) * 30;
  light3.position.y = Math.cos(time * 0.3) * 40;
  light3.position.z = Math.sin(time * 0.5) * 30;

  light4.position.x = Math.sin(time * 0.3) * 30;
  light4.position.y = Math.cos(time * 0.7) * 40;
  light4.position.z = Math.sin(time * 0.5) * 30;

  renderer.render(scene, camera);
  composer;
}

var x = document.getElementById("mumbleworld");

function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
