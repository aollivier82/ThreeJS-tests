import * as THREE from 'three';

// ===========================================
// Constants
// ===========================================
const PLANET_RADIUS = 3;
const PERSON_COUNT = 4;
const MAX_WEEDS = 50;
const WEED_INTERVAL_MS = 60000; // 1 weed per minute
const STORAGE_KEY = 'little-planet';
const UP = new THREE.Vector3(0, 1, 0);

// ===========================================
// Scene
// ===========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020010);

// ===========================================
// Camera
// ===========================================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

// ===========================================
// Renderer
// ===========================================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// ===========================================
// Lighting
// ===========================================
scene.add(new THREE.AmbientLight(0x334466, 0.6));

const sun = new THREE.DirectionalLight(0xfff4e0, 1.4);
sun.position.set(5, 8, 6);
scene.add(sun);

const hemi = new THREE.HemisphereLight(0x88aacc, 0x445522, 0.4);
scene.add(hemi);

// ===========================================
// Stars
// ===========================================
{
  const count = 1500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 80 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, sizeAttenuation: true })
  );
  scene.add(stars);
}

// ===========================================
// Planet
// ===========================================
const planetGeo = new THREE.SphereGeometry(PLANET_RADIUS, 48, 48);
const planetMat = new THREE.MeshStandardMaterial({
  color: 0x4a9e4a,
  roughness: 0.85,
  metalness: 0.0,
});
const planet = new THREE.Mesh(planetGeo, planetMat);
scene.add(planet);

// ===========================================
// Shared Geometries & Materials
// ===========================================
const headGeo = new THREE.SphereGeometry(0.12, 10, 8);
const bodyGeo = new THREE.BoxGeometry(0.1, 0.15, 0.08);
const limbGeo = new THREE.BoxGeometry(0.04, 0.12, 0.04);
const eyeGeo = new THREE.SphereGeometry(0.02, 6, 4);

const skinMat = new THREE.MeshStandardMaterial({ color: 0xffcc88, roughness: 0.8 });
const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });

const bodyColors = [0x4488cc, 0xcc4444, 0x44aa44, 0xccaa44];

// Mouth: half-torus for smile/frown
const mouthGeo = new THREE.TorusGeometry(0.05, 0.025, 8, 12, Math.PI);

// Weed shared
const stemGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.3, 6);
const leafGeo = new THREE.SphereGeometry(0.06, 6, 5);
const weedStemMat = new THREE.MeshStandardMaterial({ color: 0x336622, roughness: 0.9 });
const weedLeafMat = new THREE.MeshStandardMaterial({ color: 0x55aa33, roughness: 0.8 });

// ===========================================
// Helper: place object on planet surface
// ===========================================
function placeOnSurface(obj, theta, phi, offset = 0) {
  const r = PLANET_RADIUS + offset;
  obj.position.set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
  // Orient to surface normal
  const normal = obj.position.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(UP, normal);
  obj.quaternion.copy(quat);
}

// ===========================================
// People
// ===========================================
const people = [];

function createPerson(index) {
  const group = new THREE.Group();
  const colorMat = new THREE.MeshStandardMaterial({ color: bodyColors[index], roughness: 0.8 });

  // Head
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 0.22;
  group.add(head);

  // Eyes
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-0.04, 0.25, 0.1);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  rightEye.position.set(0.04, 0.25, 0.1);
  group.add(rightEye);

  // Mouth
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0xcc4444 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, 0.18, 0.1);
  mouth.rotation.x = 0; // 0 = smile, PI = frown
  mouth.scale.setScalar(1.0);
  group.add(mouth);

  // Body
  const body = new THREE.Mesh(bodyGeo, colorMat);
  body.position.y = 0.07;
  group.add(body);

  // Left arm pivot
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.09, 0.12, 0);
  const leftArm = new THREE.Mesh(limbGeo, skinMat);
  leftArm.position.y = -0.06;
  leftArmPivot.add(leftArm);
  group.add(leftArmPivot);

  // Right arm pivot
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.09, 0.12, 0);
  const rightArm = new THREE.Mesh(limbGeo, skinMat);
  rightArm.position.y = -0.06;
  rightArmPivot.add(rightArm);
  group.add(rightArmPivot);

  // Left leg pivot
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.03, -0.01, 0);
  const leftLeg = new THREE.Mesh(limbGeo, colorMat);
  leftLeg.position.y = -0.06;
  leftLegPivot.add(leftLeg);
  group.add(leftLegPivot);

  // Right leg pivot
  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.03, -0.01, 0);
  const rightLeg = new THREE.Mesh(limbGeo, colorMat);
  rightLeg.position.y = -0.06;
  rightLegPivot.add(rightLeg);
  group.add(rightLegPivot);

  scene.add(group);

  // Spread people evenly, with slight randomness
  const theta = (index / PERSON_COUNT) * Math.PI * 2 + Math.random() * 0.5;
  const phi = Math.PI * 0.4 + Math.random() * 0.3;

  return {
    group,
    mouth,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    theta,
    phi,
    walkSpeed: 0.15 + Math.random() * 0.1,
    walkDir: Math.random() > 0.5 ? 1 : -1,
    phiDir: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
  };
}

for (let i = 0; i < PERSON_COUNT; i++) {
  people.push(createPerson(i));
}

// ===========================================
// Weeds
// ===========================================
const weeds = []; // { group, theta, phi, id, meshes[] }
let nextWeedId = 0;

function createWeedMesh(theta, phi, id) {
  const group = new THREE.Group();

  // Stem
  const stem = new THREE.Mesh(stemGeo, weedStemMat);
  stem.position.y = 0.15;
  group.add(stem);

  // 3 leaves at different heights/angles
  for (let i = 0; i < 3; i++) {
    const leaf = new THREE.Mesh(leafGeo, weedLeafMat);
    const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.5;
    const h = 0.08 + i * 0.08;
    leaf.position.set(Math.cos(angle) * 0.05, h, Math.sin(angle) * 0.05);
    leaf.scale.set(1, 0.5, 1);
    group.add(leaf);
  }

  placeOnSurface(group, theta, phi, 0);

  scene.add(group);

  // Collect meshes for raycasting
  const meshes = [];
  group.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });

  const weed = { group, theta, phi, id, meshes };
  weeds.push(weed);
  return weed;
}

function removeWeed(weed) {
  scene.remove(weed.group);
  weed.group.traverse((child) => {
    if (child.isMesh) {
      child.geometry = undefined; // shared, don't dispose
      child.material = undefined;
    }
  });
  const idx = weeds.indexOf(weed);
  if (idx !== -1) weeds.splice(idx, 1);
}

function spawnRandomWeed() {
  if (weeds.length >= MAX_WEEDS) return;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 0.8 + Math.PI * 0.1; // avoid exact poles
  const id = nextWeedId++;
  createWeedMesh(theta, phi, id);
}

// ===========================================
// Persistence
// ===========================================
function saveState() {
  const data = {
    lastPlayed: Date.now(),
    weeds: weeds.map((w) => ({ theta: w.theta, phi: w.phi, id: w.id })),
    nextWeedId,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // storage full or unavailable
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);

    // Restore existing weeds
    if (data.weeds) {
      for (const w of data.weeds) {
        createWeedMesh(w.theta, w.phi, w.id);
      }
    }
    if (data.nextWeedId) nextWeedId = data.nextWeedId;

    // Grow weeds for time away
    if (data.lastPlayed) {
      const msAway = Date.now() - data.lastPlayed;
      const newWeeds = Math.floor(msAway / WEED_INTERVAL_MS);
      for (let i = 0; i < newWeeds && weeds.length < MAX_WEEDS; i++) {
        spawnRandomWeed();
      }
    }
  } catch (_) {
    // corrupt data, start fresh
  }
}

loadState();

// Save on visibility change and beforeunload
document.addEventListener('visibilitychange', () => {
  if (document.hidden) saveState();
});
window.addEventListener('beforeunload', saveState);

// In-play weed growth timer
let lastWeedTime = Date.now();

// ===========================================
// Camera orbit state
// ===========================================
let camTheta = 0;
let camPhi = Math.PI * 0.35;
let targetCamTheta = 0;
let targetCamPhi = Math.PI * 0.35;
const CAM_RADIUS = 9;

// ===========================================
// Input: tap vs drag
// ===========================================
let pointerStart = null;
let isDrag = false;
const raycaster = new THREE.Raycaster();

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerStart = { x: e.clientX, y: e.clientY, time: Date.now() };
  isDrag = false;
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if (!pointerStart) return;
  const dx = e.clientX - pointerStart.x;
  const dy = e.clientY - pointerStart.y;
  if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
    isDrag = true;
  }
  if (isDrag) {
    targetCamTheta -= dx * 0.005;
    targetCamPhi += dy * 0.005;
    targetCamPhi = Math.max(0.2, Math.min(Math.PI - 0.2, targetCamPhi));
    pointerStart.x = e.clientX;
    pointerStart.y = e.clientY;
  }
});

renderer.domElement.addEventListener('pointerup', (e) => {
  if (!pointerStart) return;
  const elapsed = Date.now() - pointerStart.time;
  if (!isDrag && elapsed < 300) {
    handleTap(e.clientX, e.clientY);
  }
  pointerStart = null;
  isDrag = false;
});

renderer.domElement.addEventListener('pointercancel', () => {
  pointerStart = null;
  isDrag = false;
});

// ===========================================
// Tap handling: raycast to find weeds
// ===========================================
function handleTap(screenX, screenY) {
  const ndc = new THREE.Vector2(
    (screenX / window.innerWidth) * 2 - 1,
    -(screenY / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(ndc, camera);

  // Phase 1: hit the planet to get approximate surface point
  const planetHits = raycaster.intersectObject(planet);
  if (planetHits.length === 0) return;

  const hitPoint = planetHits[0].point;

  // Phase 2: only check weeds near the hit point
  const threshold = 1.0; // distance threshold
  let closestWeed = null;
  let closestDist = Infinity;

  for (const weed of weeds) {
    const weedPos = weed.group.position;
    const dist = weedPos.distanceTo(hitPoint);
    if (dist > threshold) continue;

    // Detailed raycast against weed meshes
    const hits = raycaster.intersectObjects(weed.meshes);
    if (hits.length > 0 && hits[0].distance < closestDist) {
      closestDist = hits[0].distance;
      closestWeed = weed;
    }
  }

  // If no exact mesh hit, allow a generous proximity tap
  if (!closestWeed) {
    for (const weed of weeds) {
      const dist = weed.group.position.distanceTo(hitPoint);
      if (dist < 0.5 && dist < closestDist) {
        closestDist = dist;
        closestWeed = weed;
      }
    }
  }

  if (closestWeed) {
    removeWeed(closestWeed);
    saveState();
  }
}

// ===========================================
// Resize
// ===========================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===========================================
// Animation
// ===========================================
const clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();
  const delta = clock.getDelta();

  // --- In-play weed growth ---
  const now = Date.now();
  if (now - lastWeedTime >= WEED_INTERVAL_MS) {
    spawnRandomWeed();
    saveState();
    lastWeedTime = now;
  }

  // --- People ---
  const weedRatio = weeds.length / MAX_WEEDS; // 0 = clean, 1 = overgrown
  for (const p of people) {
    // Walk along surface
    p.theta += p.walkSpeed * p.walkDir * delta;
    p.phi += p.phiDir * delta;

    // Keep phi in range, bounce direction at edges
    if (p.phi < 0.3 || p.phi > Math.PI - 0.3) {
      p.phiDir *= -1;
      p.phi = Math.max(0.3, Math.min(Math.PI - 0.3, p.phi));
    }

    // Occasionally change walk direction
    if (Math.random() < 0.002) p.walkDir *= -1;
    if (Math.random() < 0.003) p.phiDir = (Math.random() - 0.5) * 0.3;

    // Place on surface
    placeOnSurface(p.group, p.theta, p.phi, 0.01);

    // Face walk direction: compute tangent along theta (the main walk axis)
    const sinPhi = Math.sin(p.phi);
    const cosPhi = Math.cos(p.phi);
    const sinTh = Math.sin(p.theta);
    const cosTh = Math.cos(p.theta);
    // d(position)/d(theta) gives tangent along theta
    const tangent = new THREE.Vector3(
      -sinPhi * sinTh,
      0,
      sinPhi * cosTh
    ).normalize().multiplyScalar(p.walkDir);
    // Project tangent onto surface plane (remove radial component)
    const normal = p.group.position.clone().normalize();
    tangent.addScaledVector(normal, -tangent.dot(normal)).normalize();
    // Build orientation: Y = normal (up), Z = tangent (forward)
    const right = new THREE.Vector3().crossVectors(normal, tangent).normalize();
    const m = new THREE.Matrix4().makeBasis(right, normal, tangent);
    p.group.quaternion.setFromRotationMatrix(m);

    // Bob up and down
    const bob = Math.sin(elapsed * 4 + p.phase) * 0.02;
    p.group.position.addScaledVector(normal, bob);

    // Swing limbs
    const swing = Math.sin(elapsed * 4 + p.phase) * 0.5;
    p.leftArmPivot.rotation.x = swing;
    p.rightArmPivot.rotation.x = -swing;
    p.leftLegPivot.rotation.x = -swing;
    p.rightLegPivot.rotation.x = swing;

    // Expression: rotate mouth from smile to frown
    // smile = mouth facing down (rotation.x = 0), frown = flipped (rotation.x = PI)
    p.mouth.rotation.x = weedRatio * Math.PI;
  }

  // --- Weeds sway ---
  for (const w of weeds) {
    // Gentle sway using the weed's unique theta as phase
    const sway = Math.sin(elapsed * 2 + w.theta * 10) * 0.05;
    // Apply sway as a slight rotation around the outward axis
    // We do this by slightly adjusting the group's quaternion
    const normal = w.group.position.clone().normalize();
    const tangent = new THREE.Vector3(-normal.z, 0, normal.x).normalize();
    const swayQuat = new THREE.Quaternion().setFromAxisAngle(tangent, sway);
    const baseQuat = new THREE.Quaternion().setFromUnitVectors(UP, normal);
    w.group.quaternion.copy(baseQuat).multiply(swayQuat);
  }

  // --- Camera ---
  if (!isDrag) {
    targetCamTheta += delta * 0.06; // slow auto-drift
  }
  camTheta += (targetCamTheta - camTheta) * 0.05;
  camPhi += (targetCamPhi - camPhi) * 0.05;

  camera.position.set(
    CAM_RADIUS * Math.sin(camPhi) * Math.cos(camTheta),
    CAM_RADIUS * Math.cos(camPhi),
    CAM_RADIUS * Math.sin(camPhi) * Math.sin(camTheta)
  );
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
