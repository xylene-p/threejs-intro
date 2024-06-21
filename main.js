import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, model, pivot, loader;
let models = [];

function loadModel(url) {
  loader.load(
    url,
    function (gltf) {
      model = gltf.scene;
      model.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20,
        Math.random() * 20 - 10
      );
      // Center the model
      model.traverse(function (child) {
        if (child.isMesh) {
          child.geometry.computeBoundingBox();
          const boundingBox = child.geometry.boundingBox;
          const center = boundingBox.getCenter(new THREE.Vector3());
          child.geometry.translate(-center.x, -center.y, -center.z);
        }
      });
      pivot.add(model);
      models.push(pivot);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create a camera, which determines what we'll see when we render the scene
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 100;

  // Create a renderer and add it to our document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add an ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
  scene.add(ambientLight);

  // Add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add orbit controls to allow for zooming, panning, and rotating the camera
  //   const controls = new OrbitControls(camera, renderer.domElement);

  pivot = new THREE.Object3D();
  scene.add(pivot);

  // Load the GLTF model
  loader = new GLTFLoader();

  for (let i = 0; i < 10; i++) {
    loadModel("public/lowpoly_cd.glb");
  }

  // Handle window resize
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (models) {
    models.forEach((model) => {
      model.rotation.y += 0.001;
      model.position.y -= 0.1;
      if (model.position.y < -100) {
        model.position.y = 20;
        model.position.x = Math.random() * 20 - 10;
        model.position.z = Math.random() * 20 - 10;
      }
    });
  }

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Initialize the scene and start the animation
init();
animate();
