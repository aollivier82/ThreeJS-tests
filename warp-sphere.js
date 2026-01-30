import * as THREE from 'three';

// --- Scene ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.FogExp2(0xc8e6f5, 0.025);

// --- Camera ---
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 2.5, 7);

// --- Renderer ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
document.body.appendChild(renderer.domElement);

// ===========================================
// Lighting
// ===========================================
const hemiLight = new THREE.HemisphereLight(0x88bbee, 0x77cc77, 0.6);
scene.add(hemiLight);

const sun = new THREE.DirectionalLight(0xfff4e0, 1.2);
sun.position.set(4, 10, 6);
scene.add(sun);

// ===========================================
// Rolling hills
// ===========================================
const groundGeo = new THREE.PlaneGeometry(60, 60, 80, 80);
const groundPosAttr = groundGeo.getAttribute('position');
for (let i = 0; i < groundPosAttr.count; i++) {
  const x = groundPosAttr.getX(i);
  const y = groundPosAttr.getY(i);
  const hill = Math.sin(x * 0.15) * Math.cos(y * 0.1) * 1.2
             + Math.sin(x * 0.3 + 1) * Math.sin(y * 0.25) * 0.5
             + Math.cos(x * 0.05 + y * 0.08) * 2.0;
  groundPosAttr.setZ(i, hill);
}
groundGeo.computeVertexNormals();
const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({
  color: 0x6abf69, roughness: 0.9, metalness: 0.0,
}));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

// ===========================================
// Trees
// ===========================================
const trunkGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8);
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8b6c42, roughness: 0.9 });
const canopyGeo = new THREE.SphereGeometry(1, 12, 10);

const treeData = [];
for (const [tx, ty, tz] of [
  [-3, 0.2, -3], [4, 0.1, -4], [-5, 0.3, -1], [2.5, 0, -6],
  [-1.5, 0.15, -5], [6, 0.2, -2], [-6, 0.1, -5], [0, 0.3, -7],
]) {
  const s = 0.5 + Math.random() * 0.5;
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.set(tx, ty + s * 0.4, tz);
  trunk.scale.set(s, s, s);
  scene.add(trunk);

  const canopyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.28 + Math.random() * 0.08, 0.5 + Math.random() * 0.2, 0.45 + Math.random() * 0.15),
    roughness: 0.85,
  });
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.set(tx, ty + s * 1.1, tz);
  canopy.scale.setScalar(s * 0.6);
  scene.add(canopy);
  treeData.push({ canopy, baseY: ty + s * 1.1, phase: Math.random() * Math.PI * 2 });
}

// ===========================================
// Floating petals
// ===========================================
const petalData = [];
const petalGeo = new THREE.SphereGeometry(1, 6, 6);
const palettes = [0xffb3c6, 0xffd6a5, 0xcdb4db, 0xfff1b0, 0xbde0fe];
for (let i = 0; i < 40; i++) {
  const mat = new THREE.MeshBasicMaterial({
    color: palettes[Math.floor(Math.random() * palettes.length)],
    transparent: true,
    opacity: 0.5 + Math.random() * 0.35,
  });
  const petal = new THREE.Mesh(petalGeo, mat);
  const angle = Math.random() * Math.PI * 2;
  const dist = 1 + Math.random() * 8;
  const baseY = 0.5 + Math.random() * 4;
  petal.position.set(Math.cos(angle) * dist, baseY, Math.sin(angle) * dist - 2);
  petal.scale.setScalar(0.02 + Math.random() * 0.04);
  scene.add(petal);
  petalData.push({
    mesh: petal, baseY, baseX: petal.position.x,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.5,
    drift: 0.2 + Math.random() * 0.4,
    windSpeed: 0.1 + Math.random() * 0.15,
  });
}

// ===========================================
// Clouds
// ===========================================
const cloudGeo = new THREE.SphereGeometry(1, 10, 8);
const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
const cloudData = [];
for (let i = 0; i < 8; i++) {
  const group = new THREE.Group();
  const puffs = 3 + Math.floor(Math.random() * 2);
  for (let p = 0; p < puffs; p++) {
    const puff = new THREE.Mesh(cloudGeo, cloudMat);
    puff.position.set((p - puffs / 2) * 0.7 + Math.random() * 0.3, Math.random() * 0.2, Math.random() * 0.3);
    puff.scale.set(0.8 + Math.random() * 0.5, 0.4 + Math.random() * 0.2, 0.5 + Math.random() * 0.3);
    group.add(puff);
  }
  group.position.set(-15 + Math.random() * 30, 6 + Math.random() * 4, -10 - Math.random() * 10);
  group.scale.setScalar(1 + Math.random() * 1.5);
  scene.add(group);
  cloudData.push({ group, speed: 0.05 + Math.random() * 0.1 });
}

// ===========================================
// Pond
// ===========================================
const pond = new THREE.Mesh(
  new THREE.CircleGeometry(1.5, 32),
  new THREE.MeshStandardMaterial({ color: 0x5b9bd5, metalness: 0.7, roughness: 0.1, transparent: true, opacity: 0.8 })
);
pond.rotation.x = -Math.PI / 2;
pond.position.set(1.5, -0.45, 1);
scene.add(pond);

// ===========================================
// THE WARP SPHERE — shader-based deformation
// ===========================================

// Simplex 3D noise GLSL (Ashima Arts / Ian McEwan)
const noiseGLSL = /* glsl */`
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+10.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const warpVertexShader = /* glsl */`
${noiseGLSL}

uniform float uTime;
uniform float uIntensity;

varying vec3 vWorldPos;
varying float vDisplacement;

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  float f = 1.0;
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p * f);
    f *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  // Domain warp: feed noise into noise for organic chaos
  vec3 q = vec3(
    fbm(position + vec3(0.0, 0.0, 0.0) + uTime * 0.3),
    fbm(position + vec3(5.2, 1.3, 0.0) + uTime * 0.2),
    fbm(position + vec3(0.0, 3.7, 8.1) + uTime * 0.15)
  );

  float n = fbm(position + 3.0 * q + uTime * 0.1);

  // Multi-scale: big slow warps + fine jitter
  float fine = snoise(position * 6.0 + uTime * 1.5) * 0.15;
  float displacement = (n * 0.6 + fine) * uIntensity;

  vDisplacement = displacement;

  vec3 newPos = position + normal * displacement;
  vWorldPos = (modelMatrix * vec4(newPos, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const warpFragmentShader = /* glsl */`
varying vec3 vWorldPos;
varying float vDisplacement;

void main() {
  // Screen-space normals from deformed surface
  vec3 fdx = dFdx(vWorldPos);
  vec3 fdy = dFdy(vWorldPos);
  vec3 normal = normalize(cross(fdx, fdy));

  // Soft directional lighting
  vec3 lightDir = normalize(vec3(4.0, 10.0, 6.0));
  float diff = dot(normal, lightDir) * 0.5 + 0.5;
  float spec = pow(max(dot(reflect(-lightDir, normal), normalize(vec3(0.0, 2.5, 7.0) - vWorldPos)), 0.0), 16.0) * 0.3;

  // Color mapped to displacement — valleys to peaks
  vec3 deep   = vec3(0.15, 0.05, 0.35);  // purple
  vec3 mid    = vec3(0.1,  0.5,  0.7);   // teal
  vec3 bright = vec3(1.0,  0.55, 0.2);   // warm orange
  vec3 peak   = vec3(1.0,  0.95, 0.8);   // soft white

  float t = smoothstep(-0.4, 0.5, vDisplacement);
  vec3 color;
  if (t < 0.33) {
    color = mix(deep, mid, t / 0.33);
  } else if (t < 0.66) {
    color = mix(mid, bright, (t - 0.33) / 0.33);
  } else {
    color = mix(bright, peak, (t - 0.66) / 0.34);
  }

  color *= diff;
  color += spec * vec3(1.0, 0.9, 0.8);

  gl_FragColor = vec4(color, 1.0);
}
`;

const warpMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uIntensity: { value: 0.0 },
  },
  vertexShader: warpVertexShader,
  fragmentShader: warpFragmentShader,
});

const warpSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  warpMaterial
);
warpSphere.position.set(0, 1.5, 0);
scene.add(warpSphere);

// ===========================================
// WARP button
// ===========================================
let isWarping = false;

const btn = document.createElement('div');
btn.textContent = 'HOLD TO WARP';
Object.assign(btn.style, {
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '16px 32px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '50px',
  color: '#fff',
  fontSize: '14px',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: '600',
  letterSpacing: '2px',
  userSelect: 'none',
  touchAction: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s, transform 0.2s',
  zIndex: '10',
});

btn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  isWarping = true;
  btn.style.background = 'rgba(255,140,50,0.35)';
  btn.style.transform = 'translateX(-50%) scale(0.95)';
});
const stopWarp = () => {
  isWarping = false;
  btn.style.background = 'rgba(255,255,255,0.15)';
  btn.style.transform = 'translateX(-50%) scale(1)';
};
btn.addEventListener('pointerup', stopWarp);
btn.addEventListener('pointerleave', stopWarp);
btn.addEventListener('pointercancel', stopWarp);

document.body.appendChild(btn);

// ===========================================
// Camera orbit
// ===========================================
let isDragging = false;
let prev = { x: 0, y: 0 };
let cameraAngle = 0;
let targetAngle = 0;
let cameraHeight = 2.5;
let targetHeight = 2.5;

renderer.domElement.addEventListener('pointerdown', (e) => {
  isDragging = true;
  prev.x = e.clientX;
  prev.y = e.clientY;
});
renderer.domElement.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  targetAngle += (e.clientX - prev.x) * 0.005;
  targetHeight -= (e.clientY - prev.y) * 0.01;
  targetHeight = Math.max(1, Math.min(6, targetHeight));
  prev.x = e.clientX;
  prev.y = e.clientY;
});
renderer.domElement.addEventListener('pointerup', () => { isDragging = false; });

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
  const delta = Math.min(clock.getDelta(), 0.05);

  // --- Warp sphere ---
  const target = isWarping ? 1.0 : 0.0;
  warpMaterial.uniforms.uTime.value = elapsed;
  warpMaterial.uniforms.uIntensity.value += (target - warpMaterial.uniforms.uIntensity.value) * 0.04;

  // Gentle idle rotation
  warpSphere.rotation.y += delta * 0.15;

  // --- Trees sway ---
  for (const tree of treeData) {
    tree.canopy.position.y = tree.baseY + Math.sin(elapsed * 0.8 + tree.phase) * 0.04;
    tree.canopy.rotation.z = Math.sin(elapsed * 0.6 + tree.phase) * 0.03;
  }

  // --- Petals ---
  for (const p of petalData) {
    p.mesh.position.y = p.baseY + Math.sin(elapsed * p.speed + p.phase) * p.drift;
    p.mesh.position.x = p.baseX + Math.sin(elapsed * p.windSpeed + p.phase) * 0.5;
    p.mesh.rotation.y += delta * 0.5;
  }

  // --- Clouds ---
  for (const c of cloudData) {
    c.group.position.x += delta * c.speed;
    if (c.group.position.x > 20) c.group.position.x = -20;
  }

  // --- Camera ---
  if (!isDragging) {
    targetAngle += delta * 0.04;
  }
  cameraAngle += (targetAngle - cameraAngle) * 0.03;
  cameraHeight += (targetHeight - cameraHeight) * 0.03;

  const radius = 7;
  camera.position.x = Math.sin(cameraAngle) * radius;
  camera.position.z = Math.cos(cameraAngle) * radius;
  camera.position.y = cameraHeight;
  camera.lookAt(0, 0.5, -2);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
