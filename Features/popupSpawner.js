import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const popups = [];

export function spawnPopup(scene, camera) {
  const geo = new THREE.PlaneGeometry(0.35, 0.22);
  const mat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.9
  });

  const popup = new THREE.Mesh(geo, mat);

  const dist = THREE.MathUtils.randFloat(0.8, 1.6);
  const x = THREE.MathUtils.randFloat(-0.4, 0.4);
  const y = THREE.MathUtils.randFloat(-0.3, 0.3);

  const dir = new THREE.Vector3(x, y, -1).normalize();
  dir.applyQuaternion(camera.quaternion);

  popup.position.copy(camera.position).add(dir.multiplyScalar(dist));
  popup.lookAt(camera.position);

  popup.userData.popup = true;

  scene.add(popup);
  popups.push(popup);
}

export function updatePopups(camera) {
  popups.forEach(p => p.lookAt(camera.position));
}

export function removePopup(popup, scene) {
  scene.remove(popup);
  popups.splice(popups.indexOf(popup), 1);
}

export function getPopups() {
  return popups;
}
