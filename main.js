import * as THREE from "three";

import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, scene, renderer, video, effect;

let sphere;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 0.01;

  scene = new THREE.Scene();

  const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
  pointLight1.position.set(500, 500, 500);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
  pointLight2.position.set(-500, -500, -500);
  scene.add(pointLight2);

  video = document.getElementById("video");

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.BoxGeometry(5, 5, 5);
  //   geometry.scale(0.5, 0.5, 0.5);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  const count = 128;
  const radius = 32;

  for (let i = 1, l = count; i <= l; i++) {
    const phi = Math.acos(-1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
    mesh.lookAt(camera.position);
    scene.add(mesh);
  }

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(200, 20, 10),
    new THREE.MeshPhongMaterial({ flatShading: true })
  );
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);

  //   effect = new AsciiEffect(renderer, " .:-+*=%@#", { invert: true });
  effect = new AsciiEffect(renderer, " .:-+***====%%%%@@@@####", {
    invert: true,
  });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = "white";
  effect.domElement.style.backgroundColor = "black";
  document.body.appendChild(effect.domElement);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;

  window.addEventListener("resize", onWindowResize);

  //

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const constraints = {
      video: { width: 1280, height: 720, facingMode: "user" },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        // apply the stream to the video element used in the texture

        video.srcObject = stream;
        video.play();
      })
      .catch(function (error) {
        console.error("Unable to access the camera/webcam.", error);
      });
  } else {
    console.error("MediaDevices interface not available.");
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  effect.render(scene, camera);
}
