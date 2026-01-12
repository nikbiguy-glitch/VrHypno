import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { getPopups, removePopup } from './popupSpawner.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function initInteraction(scene, camera) {
  window.addEventListener('click', () => {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);

    const hits = raycaster.intersectObjects(getPopups());
    if (hits.length > 0) {
      removePopup(hits[0].object, scene);
    }
  });
}
