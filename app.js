import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { XRButton } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/webxr/XRButton.js';

let camera, scene, renderer;
let panel;

init();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  document.getElementById('enter').onclick = startXR;

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  createPopup();
}

function startXR() {
  document.getElementById('overlay').remove();

  document.body.appendChild(
    XRButton.createButton(renderer, {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hit-test', 'anchors', 'hand-tracking']
    })
  );

  renderer.setAnimationLoop(render);
}

function createPopup() {
  const geo = new THREE.PlaneGeometry(0.45, 0.28);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.85
  });

  panel = new THREE.Mesh(geo, mat);
  scene.add(panel);
}

function render() {
  if (panel) {
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    panel.position.copy(camera.position).add(dir.multiplyScalar(1.1));
    panel.lookAt(camera.position);
  }
  renderer.render(scene, camera);
}
