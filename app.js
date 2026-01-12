import { initSettings, getFrequency } from './features/settings.js';
import { spawnPopup, updatePopups } from './features/popupSpawner.js';
import { initInteraction } from './features/interaction.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { XRButton } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/webxr/XRButton.js';

export let camera, scene, renderer;

let lastSpawn = 0;

init();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 20);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.xr.enabled = true;
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

  initSettings(startXR);
}

function startXR() {
  document.body.appendChild(
    XRButton.createButton(renderer, {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['hand-tracking']
    })
  );

  initInteraction(scene, camera);

  renderer.setAnimationLoop(render);
}

function render(time) {
  if (time - lastSpawn > getFrequency()) {
    spawnPopup(scene, camera);
    lastSpawn = time;
  }

  updatePopups(camera);
  renderer.render(scene, camera);
}
