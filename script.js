import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.157.0/examples/jsm/controls/OrbitControls.js';

const milestones = [
  { label: 'COMSATS University (2016 - 2020)', position: 0 },
  { label: 'Accedo: Technical Support Engineer (Mar 2022 - Sept 2022)', position: -5 },
  { label: 'Accedo: Backend Engineer (Sept 2021 - Apr 2022)', position: -10 },
  { label: 'Software Engineer @ MaqsoodLabs (Sept 2022 - Sept 2023)', position: -15 },
  { label: 'Backend Lead @ MaqsoodLabs (Sept 2023 - Present)', position: -20 }
];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const roadGeometry = new THREE.BoxGeometry(0.5, 0.1, 25);
const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.z = -10;
scene.add(road);

const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const milestoneMeshes = [];

milestones.forEach(m => {
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 0.3, m.position);
  sphere.userData.label = m.label;
  milestoneMeshes.push(sphere);
  scene.add(sphere);
});

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const info = document.getElementById('info');

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(milestoneMeshes);
  if (intersects.length > 0) {
    const { label } = intersects[0].object.userData;
    info.textContent = label;
  }
}
window.addEventListener('click', onClick);

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
