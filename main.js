import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene,
  camera,
  renderer,
  models = [];

function generateRandomPosition() {
  let max = 20;
  let min = 0;
  let x = Math.floor(Math.random() * (max - min + 1)) + min;
  let y = Math.floor(Math.random() * (max - min + 1)) + min;
  let z = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(x, y, z);

  return new THREE.Vector3(x, y, z);
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
  camera.position.set(0, 1, 3);

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
  const controls = new OrbitControls(camera, renderer.domElement);

  let cdObjectCount = 3;
  let modelsToLoad = [];

  for (let i = 0; i < cdObjectCount; i++) {
    modelsToLoad.push({
      path: "public/lowpoly_cd.glb",
      position: generateRandomPosition(),
    });
  }

  // Load all models
  const loader = new GLTFLoader();
  let loadedModelsCount = 0;

  modelsToLoad.forEach((modelInfo) => {
    loader.load(
      modelInfo.path,
      function (gltf) {
        const model = gltf.scene;
        // Center the model
        model.traverse(function (child) {
          if (child.isMesh) {
            child.geometry.computeBoundingBox();
            const boundingBox = child.geometry.boundingBox;
            const center = boundingBox.getCenter(new THREE.Vector3());
            child.geometry.translate(-center.x, -center.y, -center.z);
          }
        });

        // Create a pivot object for each model
        const pivot = new THREE.Object3D();
        pivot.position.copy(modelInfo.position);
        pivot.add(model);
        scene.add(pivot);

        // Store the model and pivot for animation
        models.push({ model: model, pivot: pivot });

        loadedModelsCount++;

        // Start animation once all models are loaded
        if (loadedModelsCount === modelsToLoad.length) {
          animate();
        }
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  });

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

  // Rotate each model around its pivot
  models.forEach(({ pivot }) => {
    const randomRotationDirection = Math.random() < 0.5 ? -1 : 1;
    pivot.rotationDirection = randomRotationDirection;
    const randomRotationSpeed = Math.random() < 0.5 ? 0.01 : 0.05;
    pivot.rotation.y += randomRotationSpeed;
    pivot.x -= 1;
  });

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Initialize the scene and start loading models
init();
