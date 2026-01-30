import * as THREE from 'three';

// ===========================================
// Changelog Notification UI
// ===========================================
const changelog = [
  "🌙 Day-Night Cycle: Days last 1 minute, nights 10 seconds. Everyone sleeps at night with zzz's. Each day = 1 year!",
  "🌦️ Weather & Birds: Dynamic weather (sunny, cloudy, rainy, windy, snowy) with bird flocks flying in the distance",
  "🍼 Babies & Aging: Couples make love at trees, babies are born, everyone ages and eventually passes on",
  "🌅 Peaceful lighting: Golden hour sun with soft warm ambient glow",
  "🍎 Hunger system: Characters get hungry and eat apples from trees",
  "💕 Love & relationships: Characters flirt, fall in love, and walk hand-in-hand",
  "👤 Tap for profiles: See personality, traits, secrets, and relationship status",
];

const changelogEl = document.createElement('div');
changelogEl.id = 'changelog';
changelogEl.innerHTML = `
  <div class="changelog-label">✨ What's New</div>
  <div class="changelog-text"></div>
`;

const changelogStyle = document.createElement('style');
changelogStyle.textContent = `
  #changelog {
    position: fixed;
    top: 15px;
    left: 15px;
    right: 15px;
    max-width: 500px;
    background: linear-gradient(135deg, rgba(255,220,180,0.95), rgba(255,200,150,0.9));
    border-radius: 12px;
    padding: 12px 16px;
    color: #553322;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideDown 0.5s ease-out, fadeOut 0.5s ease-in 8s forwards;
  }
  .changelog-label {
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
    margin-bottom: 4px;
  }
  .changelog-text {
    font-size: 14px;
    line-height: 1.4;
  }
  @keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; pointer-events: none; }
  }
`;
document.head.appendChild(changelogStyle);
document.body.appendChild(changelogEl);

// Show the latest change
changelogEl.querySelector('.changelog-text').textContent = changelog[0];

// ===========================================
// Profile Card UI
// ===========================================
const profileCard = document.createElement('div');
profileCard.id = 'profile-card';
profileCard.innerHTML = `
  <div class="profile-header">
    <div class="profile-name"></div>
    <div class="profile-title"></div>
    <div class="profile-age"></div>
  </div>
  <div class="profile-mood"></div>
  <div class="profile-section">
    <div class="profile-label">Personality</div>
    <div class="profile-traits"></div>
  </div>
  <div class="profile-section">
    <div class="profile-label">Hobby</div>
    <div class="profile-hobby"></div>
  </div>
  <div class="profile-section">
    <div class="profile-label">Secret</div>
    <div class="profile-secret"></div>
  </div>
  <div class="profile-section">
    <div class="profile-label">In Love...</div>
    <div class="profile-love"></div>
  </div>
  <div class="profile-hunger">
    <div class="profile-hunger-label">
      <span>Hunger</span>
      <span class="hunger-status"></span>
    </div>
    <div class="profile-hunger-bar">
      <div class="profile-hunger-fill"></div>
    </div>
  </div>
  <div class="profile-status"></div>
`;

const style = document.createElement('style');
style.textContent = `
  #profile-card {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: 350px;
    background: linear-gradient(135deg, rgba(30, 20, 50, 0.95), rgba(50, 30, 70, 0.95));
    border-radius: 20px;
    padding: 20px;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,150,200,0.2);
    border: 2px solid rgba(255,255,255,0.1);
    transform: translateY(150%);
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
  }
  #profile-card.visible {
    transform: translateY(0);
  }
  .profile-header {
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .profile-name {
    font-size: 24px;
    font-weight: bold;
    color: #ffcc88;
    text-shadow: 0 2px 10px rgba(255,200,100,0.5);
  }
  .profile-title {
    font-size: 14px;
    color: #bb99cc;
    font-style: italic;
    margin-top: 4px;
  }
  .profile-age {
    font-size: 12px;
    color: #99aacc;
    margin-top: 6px;
  }
  .profile-mood {
    background: rgba(255,255,255,0.1);
    padding: 10px 15px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 15px;
    font-style: italic;
    color: #aaddff;
  }
  .profile-mood::before {
    content: '~ ';
  }
  .profile-mood::after {
    content: ' ~';
  }
  .profile-section {
    margin-bottom: 12px;
  }
  .profile-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #ff99bb;
    margin-bottom: 4px;
  }
  .profile-traits {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .profile-traits span {
    background: rgba(100, 200, 255, 0.2);
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 13px;
    border: 1px solid rgba(100, 200, 255, 0.3);
  }
  .profile-hobby, .profile-secret, .profile-love {
    font-size: 14px;
    color: #ddd;
  }
  .profile-secret {
    color: #ffaacc;
  }
  .profile-love {
    color: #ffccdd;
  }
  .profile-status {
    margin-top: 15px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.2);
    text-align: center;
    font-size: 16px;
  }
  .profile-status.in-love {
    color: #ff88aa;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .profile-status.single {
    color: #88ccff;
  }
  .profile-status.flirting {
    color: #ffaa88;
    animation: pulse 0.8s ease-in-out infinite;
  }
  .profile-hunger {
    margin-top: 12px;
    padding: 10px;
    background: rgba(0,0,0,0.3);
    border-radius: 10px;
  }
  .profile-hunger-label {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
  }
  .profile-hunger-bar {
    height: 12px;
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    overflow: hidden;
  }
  .profile-hunger-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.3s, background-color 0.3s;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
`;
document.head.appendChild(style);
document.body.appendChild(profileCard);

function showProfile(person) {
  const p = personalities[person.name];
  if (!p) return;

  profileCard.querySelector('.profile-name').textContent = person.name;
  profileCard.querySelector('.profile-title').textContent = p.title;
  profileCard.querySelector('.profile-mood').textContent = p.mood;
  profileCard.querySelector('.profile-traits').innerHTML = p.traits.map(t => `<span>${t}</span>`).join('');
  profileCard.querySelector('.profile-hobby').textContent = p.hobby;
  profileCard.querySelector('.profile-secret').textContent = p.secret;
  profileCard.querySelector('.profile-love').textContent = p.loveStyle;

  updateProfileStatus(person);
  profileCard.classList.add('visible');
}

function updateProfileStatus(person) {
  // Update age display
  const ageEl = profileCard.querySelector('.profile-age');
  const ageYears = Math.floor(person.age);
  const stage = getAgeStage(person.age);
  ageEl.textContent = `${stage} • Age ${ageYears}`;

  const statusEl = profileCard.querySelector('.profile-status');
  statusEl.className = 'profile-status';

  if (person.isMakingLove) {
    statusEl.textContent = `💞 Making love... 💞`;
    statusEl.classList.add('in-love');
  } else if (person.inLove && person.lovePartner) {
    statusEl.textContent = `💕 In love with ${person.lovePartner.name} 💕`;
    statusEl.classList.add('in-love');
  } else if (person.isFlirting && person.flirtPartner) {
    statusEl.textContent = `💫 Flirting with ${person.flirtPartner.name}... 💫`;
    statusEl.classList.add('flirting');
  } else if (person.seekingFood) {
    statusEl.textContent = `🍎 Looking for food... 🍎`;
    statusEl.classList.add('single');
  } else if (person.age < 18) {
    statusEl.textContent = '🌱 Growing up...';
    statusEl.classList.add('single');
  } else {
    statusEl.textContent = '💭 Looking for love...';
    statusEl.classList.add('single');
  }

  // Update hunger bar
  const hungerFill = profileCard.querySelector('.profile-hunger-fill');
  const hungerStatus = profileCard.querySelector('.hunger-status');
  const hunger = Math.min(100, Math.max(0, person.hunger));
  hungerFill.style.width = `${hunger}%`;

  if (hunger < 30) {
    hungerFill.style.backgroundColor = '#44dd44';
    hungerStatus.textContent = 'Well fed';
  } else if (hunger < 60) {
    hungerFill.style.backgroundColor = '#dddd44';
    hungerStatus.textContent = 'Peckish';
  } else if (hunger < 80) {
    hungerFill.style.backgroundColor = '#dd8844';
    hungerStatus.textContent = 'Hungry';
  } else {
    hungerFill.style.backgroundColor = '#dd4444';
    hungerStatus.textContent = 'Starving!';
  }
}

function hideProfile() {
  profileCard.classList.remove('visible');
}

// ===========================================
// Constants
// ===========================================
const ISLAND_RADIUS = 4;
const ISLAND_HEIGHT = 2;
const PERSON_COUNT = 6;
const UP = new THREE.Vector3(0, 1, 0);
const MAX_AGE = 100;
const DAY_DURATION = 60; // seconds
const NIGHT_DURATION = 10; // seconds
const FULL_CYCLE = DAY_DURATION + NIGHT_DURATION; // 1 cycle = 1 year
const BABY_TIME = 5; // Seconds of lovemaking before baby

// ===========================================
// Scene
// ===========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

// ===========================================
// Camera
// ===========================================
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);

// ===========================================
// Renderer
// ===========================================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ===========================================
// Lighting (peaceful & serene)
// ===========================================
// Soft warm ambient
const ambientLight = new THREE.AmbientLight(0xffeedd, 0.4);
scene.add(ambientLight);

// Golden hour sun - warm and gentle
const sun = new THREE.DirectionalLight(0xffd4a6, 0.8);
sun.position.set(15, 12, 8);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 50;
sun.shadow.camera.left = -15;
sun.shadow.camera.right = 15;
sun.shadow.camera.top = 15;
sun.shadow.camera.bottom = -15;
sun.shadow.bias = -0.001;
scene.add(sun);

// Soft sky/ground hemisphere light
const hemi = new THREE.HemisphereLight(0xaaccff, 0x88aa66, 0.5);
scene.add(hemi);

// Gentle fill light from opposite side
const fillLight = new THREE.DirectionalLight(0xaabbff, 0.3);
fillLight.position.set(-10, 8, -5);
scene.add(fillLight);

// ===========================================
// Weather System
// ===========================================
const weatherTypes = ['sunny', 'cloudy', 'rainy', 'windy', 'snowy'];
let currentWeather = 'sunny';
let weatherTimer = 30 + Math.random() * 60; // 30-90 seconds between weather changes
let windStrength = 0;
let targetWindStrength = 0;

// Rain particles
const rainGeo = new THREE.BufferGeometry();
const rainCount = 3000;
const rainPositions = new Float32Array(rainCount * 3);
const rainVelocities = new Float32Array(rainCount);
for (let i = 0; i < rainCount; i++) {
  rainPositions[i * 3] = (Math.random() - 0.5) * 40;
  rainPositions[i * 3 + 1] = Math.random() * 30;
  rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  rainVelocities[i] = 0.5 + Math.random() * 0.5;
}
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
const rainMat = new THREE.PointsMaterial({
  color: 0xaaaacc,
  size: 0.08,
  transparent: true,
  opacity: 0
});
const rain = new THREE.Points(rainGeo, rainMat);
scene.add(rain);

// Snow particles
const snowGeo = new THREE.BufferGeometry();
const snowCount = 2000;
const snowPositions = new Float32Array(snowCount * 3);
const snowVelocities = new Float32Array(snowCount);
const snowDrift = new Float32Array(snowCount);
for (let i = 0; i < snowCount; i++) {
  snowPositions[i * 3] = (Math.random() - 0.5) * 50;
  snowPositions[i * 3 + 1] = Math.random() * 30;
  snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  snowVelocities[i] = 0.1 + Math.random() * 0.15;
  snowDrift[i] = Math.random() * Math.PI * 2;
}
snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
const snowMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.12,
  transparent: true,
  opacity: 0
});
const snow = new THREE.Points(snowGeo, snowMat);
scene.add(snow);

// Weather indicator UI
const weatherUI = document.createElement('div');
weatherUI.id = 'weather-ui';
weatherUI.innerHTML = '<span class="weather-icon">☀️</span><span class="weather-text">Sunny</span>';
const weatherStyle = document.createElement('style');
weatherStyle.textContent = `
  #weather-ui {
    position: fixed;
    top: 15px;
    right: 15px;
    background: rgba(255,255,255,0.85);
    border-radius: 20px;
    padding: 8px 14px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
    color: #333;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 6px;
    z-index: 999;
  }
  .weather-icon { font-size: 18px; }
`;
document.head.appendChild(weatherStyle);
document.body.appendChild(weatherUI);

// ===========================================
// Day-Night Cycle
// ===========================================
let timeOfDay = 0; // 0 to FULL_CYCLE
let isNight = false;
let dayNightTransition = 0; // 0 = day, 1 = night (for lerping)

// Store day lighting values for restoration
const dayAmbientIntensity = 0.4;
const daySunIntensity = 0.8;
const dayHemiIntensity = 0.5;
const dayFillIntensity = 0.3;
const daySkyColor = new THREE.Color(0x87ceeb);

// Night lighting values
const nightAmbientIntensity = 0.08;
const nightSunIntensity = 0.05;
const nightHemiIntensity = 0.1;
const nightFillIntensity = 0.02;
const nightSkyColor = new THREE.Color(0x0a1525);

// Moon (only visible at night)
const moonGeo = new THREE.SphereGeometry(3, 16, 12);
const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffee, transparent: true, opacity: 0 });
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.set(-40, 35, -30);
moon.visible = false;
scene.add(moon);

// Stars (only visible at night)
const starsGeo = new THREE.BufferGeometry();
const starsCount = 500;
const starsPositions = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount; i++) {
  // Spread stars in a dome above
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.random() * Math.PI * 0.4; // Upper hemisphere
  const r = 150 + Math.random() * 50;
  starsPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  starsPositions[i * 3 + 1] = r * Math.cos(phi) + 20;
  starsPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
}
starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
const starsMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.8,
  transparent: true,
  opacity: 0
});
const stars = new THREE.Points(starsGeo, starsMat);
scene.add(stars);

// Day/Night indicator in weather UI
const dayNightIndicator = document.createElement('span');
dayNightIndicator.className = 'daynight-icon';
dayNightIndicator.textContent = '☀️';
weatherUI.insertBefore(dayNightIndicator, weatherUI.firstChild);

const dayNightStyle = document.createElement('style');
dayNightStyle.textContent = `
  .daynight-icon {
    font-size: 18px;
    margin-right: 6px;
  }
`;
document.head.appendChild(dayNightStyle);

// Create "zzz" sprite for sleeping
function createZzzSprite() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 64;
  canvas.height = 64;

  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(200, 220, 255, 0.9)';
  ctx.fillText('z', canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0 });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.15, 0.15, 1);
  return sprite;
}

function updateDayNightCycle(delta, elapsedTime) {
  timeOfDay += delta;
  if (timeOfDay >= FULL_CYCLE) {
    timeOfDay -= FULL_CYCLE;
  }

  const wasNight = isNight;
  isNight = timeOfDay >= DAY_DURATION;

  // Smooth transition
  const targetTransition = isNight ? 1 : 0;
  dayNightTransition += (targetTransition - dayNightTransition) * 0.03;

  // Update lighting based on transition
  const t = dayNightTransition;

  // Only adjust lighting if not in special weather (weather overrides some lighting)
  const weatherLightMod = currentWeather === 'sunny' ? 1 :
                          currentWeather === 'cloudy' ? 0.5 :
                          currentWeather === 'rainy' ? 0.3 :
                          currentWeather === 'snowy' ? 0.6 : 0.9;

  // Ambient light - clamp t to valid range
  const safeT = Math.max(0, Math.min(1, t || 0));
  ambientLight.intensity = THREE.MathUtils.lerp(dayAmbientIntensity * weatherLightMod, nightAmbientIntensity, safeT);

  // Sun
  sun.intensity = THREE.MathUtils.lerp(daySunIntensity * weatherLightMod, nightSunIntensity, safeT);

  // Hemisphere
  hemi.intensity = THREE.MathUtils.lerp(dayHemiIntensity * weatherLightMod, nightHemiIntensity, safeT);

  // Fill light
  fillLight.intensity = THREE.MathUtils.lerp(dayFillIntensity * weatherLightMod, nightFillIntensity, safeT);

  // Sky color (blend between day sky and night sky, weather can override day color)
  const currentDaySky = currentWeather === 'sunny' ? new THREE.Color(0x87ceeb) :
                        currentWeather === 'cloudy' ? new THREE.Color(0x9aacbb) :
                        currentWeather === 'rainy' ? new THREE.Color(0x708090) :
                        currentWeather === 'snowy' ? new THREE.Color(0xc8d8e8) :
                        new THREE.Color(0x87ceeb);

  const blendedSky = currentDaySky.clone().lerp(nightSkyColor, safeT);
  if (blendedSky && !isNaN(blendedSky.r)) {
    scene.background = blendedSky;
  }

  // Moon and stars visibility
  moon.material.opacity = safeT;
  moon.visible = safeT > 0.01;
  starsMat.opacity = safeT * 0.8;

  // Stars twinkle
  if (safeT > 0.1) {
    starsMat.size = 0.8 + Math.sin(elapsedTime * 2) * 0.1;
  }

  // Update UI indicator
  if (isNight !== wasNight || Math.abs(t - (isNight ? 1 : 0)) < 0.1) {
    dayNightIndicator.textContent = isNight ? '🌙' : '☀️';
  }
}

function setWeather(type) {
  currentWeather = type;
  const icon = weatherUI.querySelector('.weather-icon');
  const text = weatherUI.querySelector('.weather-text');

  switch(type) {
    case 'sunny':
      icon.textContent = '☀️';
      text.textContent = 'Sunny';
      // scene.background handled by day-night cycle
      targetWindStrength = 0.1;
      break;
    case 'cloudy':
      icon.textContent = '☁️';
      text.textContent = 'Cloudy';
      // scene.background handled by day-night cycle
      targetWindStrength = 0.3;
      break;
    case 'rainy':
      icon.textContent = '🌧️';
      text.textContent = 'Rainy';
      // scene.background handled by day-night cycle
      targetWindStrength = 0.5;
      break;
    case 'windy':
      icon.textContent = '💨';
      text.textContent = 'Windy';
      // scene.background handled by day-night cycle
      targetWindStrength = 1.0;
      break;
    case 'snowy':
      icon.textContent = '❄️';
      text.textContent = 'Snowy';
      // scene.background handled by day-night cycle
      targetWindStrength = 0.2;
      break;
  }
}

function updateWeather(delta, elapsed) {
  // Weather change timer
  weatherTimer -= delta;
  if (weatherTimer <= 0) {
    const newWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    setWeather(newWeather);
    weatherTimer = 30 + Math.random() * 60;
  }

  // Lerp wind
  windStrength += (targetWindStrength - windStrength) * 0.02;

  // Update rain
  const rainOpacity = currentWeather === 'rainy' ? 0.6 : 0;
  rainMat.opacity += (rainOpacity - rainMat.opacity) * 0.05;
  if (rainMat.opacity > 0.01) {
    const positions = rainGeo.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3 + 1] -= rainVelocities[i] * delta * 60;
      positions[i * 3] += windStrength * delta * 10;
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 25 + Math.random() * 5;
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
    }
    rainGeo.attributes.position.needsUpdate = true;
  }

  // Update snow
  const snowOpacity = currentWeather === 'snowy' ? 0.8 : 0;
  snowMat.opacity += (snowOpacity - snowMat.opacity) * 0.05;
  if (snowMat.opacity > 0.01) {
    const positions = snowGeo.attributes.position.array;
    for (let i = 0; i < snowCount; i++) {
      positions[i * 3 + 1] -= snowVelocities[i] * delta * 30;
      positions[i * 3] += Math.sin(elapsed + snowDrift[i]) * 0.02 + windStrength * delta * 3;
      positions[i * 3 + 2] += Math.cos(elapsed * 0.7 + snowDrift[i]) * 0.015;
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 25 + Math.random() * 5;
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      }
    }
    snowGeo.attributes.position.needsUpdate = true;
  }
}

// ===========================================
// Birds
// ===========================================
const birdFlocks = [];
const birdGeo = new THREE.ConeGeometry(0.15, 0.4, 4);
const birdMat = new THREE.MeshBasicMaterial({ color: 0x222222 });

function createBirdFlock() {
  const flock = new THREE.Group();
  const birdCount = 5 + Math.floor(Math.random() * 8);
  const birds = [];

  for (let i = 0; i < birdCount; i++) {
    const bird = new THREE.Group();

    // Body
    const body = new THREE.Mesh(birdGeo, birdMat);
    body.rotation.x = Math.PI / 2;
    bird.add(body);

    // Wings (simple triangles)
    const wingGeo = new THREE.BufferGeometry();
    const wingVerts = new Float32Array([
      0, 0, 0,  -0.5, 0, 0.1,  -0.3, 0, -0.1,
      0, 0, 0,  0.5, 0, 0.1,   0.3, 0, -0.1
    ]);
    wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVerts, 3));
    const wings = new THREE.Mesh(wingGeo, birdMat);
    bird.add(wings);

    // Random offset in flock
    bird.position.set(
      (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 1,
      (Math.random() - 0.5) * 3
    );

    bird.userData = {
      wingPhase: Math.random() * Math.PI * 2,
      wings: wings
    };

    flock.add(bird);
    birds.push(bird);
  }

  // Position flock far in distance
  const angle = Math.random() * Math.PI * 2;
  const dist = 60 + Math.random() * 40;
  const height = 10 + Math.random() * 20;
  flock.position.set(
    Math.cos(angle) * dist,
    height,
    Math.sin(angle) * dist
  );

  // Direction of travel
  const targetAngle = angle + Math.PI + (Math.random() - 0.5) * 1;
  flock.userData = {
    birds,
    velocity: new THREE.Vector3(
      Math.cos(targetAngle) * (8 + Math.random() * 4),
      (Math.random() - 0.5) * 0.5,
      Math.sin(targetAngle) * (8 + Math.random() * 4)
    ),
    lifetime: 20 + Math.random() * 10
  };

  scene.add(flock);
  birdFlocks.push(flock);
}

let birdSpawnTimer = 5 + Math.random() * 10;

function updateBirds(delta, elapsed) {
  // Spawn new flocks occasionally
  birdSpawnTimer -= delta;
  if (birdSpawnTimer <= 0 && birdFlocks.length < 3) {
    createBirdFlock();
    birdSpawnTimer = 15 + Math.random() * 30;
  }

  // Update existing flocks
  for (let i = birdFlocks.length - 1; i >= 0; i--) {
    const flock = birdFlocks[i];
    const data = flock.userData;

    // Move flock
    flock.position.add(data.velocity.clone().multiplyScalar(delta));

    // Add wind effect
    flock.position.x += windStrength * delta * 2;

    // Animate individual birds
    for (const bird of data.birds) {
      // Wing flapping
      const wingFlap = Math.sin(elapsed * 12 + bird.userData.wingPhase) * 0.4;
      bird.userData.wings.rotation.z = wingFlap;

      // Slight individual movement
      bird.position.y += Math.sin(elapsed * 3 + bird.userData.wingPhase) * 0.01;
    }

    // Face direction of travel
    flock.rotation.y = Math.atan2(data.velocity.x, data.velocity.z);

    // Remove old flocks
    data.lifetime -= delta;
    if (data.lifetime <= 0 || flock.position.length() > 150) {
      scene.remove(flock);
      birdFlocks.splice(i, 1);
    }
  }
}

// ===========================================
// Clouds (large fluffy clouds)
// ===========================================
const cloudGeo = new THREE.SphereGeometry(1, 12, 8);

function createCloudMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
    transparent: true,
    opacity: 0.9
  });
}

function createCloud(x, y, z, scale) {
  const cloud = new THREE.Group();
  const puffs = [];
  const count = 8 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const mat = createCloudMaterial();
    const puff = new THREE.Mesh(cloudGeo, mat);
    puff.position.set(
      (Math.random() - 0.5) * 3 * scale,
      (Math.random() - 0.5) * 1.2 * scale,
      (Math.random() - 0.5) * 2 * scale
    );
    puff.scale.setScalar(0.8 + Math.random() * 1.2);
    cloud.add(puff);
    puffs.push(puff);
  }
  cloud.position.set(x, y, z);
  cloud.scale.setScalar(scale);
  scene.add(cloud);
  return { group: cloud, puffs };
}

const clouds = [];
// Distant massive background clouds
for (let i = 0; i < 25; i++) {
  const angle = (i / 25) * Math.PI * 2 + Math.random() * 0.4;
  const dist = 60 + Math.random() * 80; // Much further away
  const y = -30 + Math.random() * 25; // Lower, below the island
  const scale = 12 + Math.random() * 18; // Massive clouds
  const cloudData = createCloud(
    Math.cos(angle) * dist,
    y,
    Math.sin(angle) * dist,
    scale
  );
  clouds.push({
    mesh: cloudData.group,
    puffs: cloudData.puffs,
    angle,
    dist,
    baseY: y,
    speed: 0.002 + Math.random() * 0.004, // Slower drift for distant clouds
    targetOpacity: 0.85
  });
}

// ===========================================
// Floating Island
// ===========================================
const islandGroup = new THREE.Group();

// Flat grassy top (cylinder)
const topGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, 0.3, 32);
const grassMat = new THREE.MeshStandardMaterial({
  color: 0x4a9e4a,
  roughness: 0.85,
});
const islandTop = new THREE.Mesh(topGeo, grassMat);
islandTop.position.y = ISLAND_HEIGHT / 2;
islandTop.receiveShadow = true;
islandGroup.add(islandTop);

// Rocky bottom (cone tapering down)
const bottomGeo = new THREE.ConeGeometry(ISLAND_RADIUS * 1.1, ISLAND_HEIGHT * 1.5, 32, 4);
const rockMat = new THREE.MeshStandardMaterial({
  color: 0x8b7355,
  roughness: 0.9,
});
const islandBottom = new THREE.Mesh(bottomGeo, rockMat);
islandBottom.position.y = -ISLAND_HEIGHT * 0.5;
islandBottom.rotation.x = Math.PI; // flip cone
islandBottom.castShadow = true;
islandGroup.add(islandBottom);

// Dirt ring around edge
const dirtGeo = new THREE.TorusGeometry(ISLAND_RADIUS - 0.1, 0.2, 8, 32);
const dirtMat = new THREE.MeshStandardMaterial({
  color: 0x6b5344,
  roughness: 0.95,
});
const dirtRing = new THREE.Mesh(dirtGeo, dirtMat);
dirtRing.position.y = ISLAND_HEIGHT / 2 - 0.1;
dirtRing.rotation.x = Math.PI / 2;
islandGroup.add(dirtRing);

scene.add(islandGroup);

// ===========================================
// Trees & Apples
// ===========================================
const trunkGeo = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 8);
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
const foliageGeo = new THREE.SphereGeometry(0.5, 8, 6);
const foliageMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.8 });
const appleGeo = new THREE.SphereGeometry(0.06, 8, 6);
const appleMat = new THREE.MeshStandardMaterial({ color: 0xdd2222, roughness: 0.6 });
const appleHighlightMat = new THREE.MeshStandardMaterial({ color: 0xff4444, roughness: 0.5, emissive: 0x441111 });

const APPLE_RESPAWN_TIME = 15; // seconds
const MAX_APPLES_PER_TREE = 4;

function createApple(tree) {
  const apple = new THREE.Mesh(appleGeo, appleMat);
  // Random position in foliage
  const angle = Math.random() * Math.PI * 2;
  const radius = 0.2 + Math.random() * 0.25;
  const height = 0.85 + Math.random() * 0.3;
  apple.position.set(
    Math.cos(angle) * radius,
    height,
    Math.sin(angle) * radius
  );
  apple.castShadow = true;
  tree.group.add(apple);
  return apple;
}

function createTree(x, z) {
  const group = new THREE.Group();

  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.4;
  trunk.castShadow = true;
  group.add(trunk);

  const foliage = new THREE.Mesh(foliageGeo, foliageMat);
  foliage.position.y = 1.0;
  foliage.scale.set(1, 1.2, 1);
  foliage.castShadow = true;
  group.add(foliage);

  group.position.set(x, ISLAND_HEIGHT / 2 + 0.15, z);
  scene.add(group);

  const treeData = {
    group,
    x,
    z,
    apples: [],
    respawnTimer: 0,
  };

  // Start with some apples
  const initialApples = 2 + Math.floor(Math.random() * 3);
  for (let i = 0; i < initialApples; i++) {
    treeData.apples.push(createApple(treeData));
  }

  return treeData;
}

// Place some trees around the island
const trees = [];
const treePositions = [
  [-2.5, -1], [-1.5, 2], [2, 1.5], [1, -2.5], [-0.5, -2], [2.5, -0.5]
];
for (const [x, z] of treePositions) {
  trees.push(createTree(x, z));
}

function findNearestTreeWithApples(person) {
  let nearest = null;
  let nearestDist = Infinity;
  for (const tree of trees) {
    if (tree.apples.length === 0) continue;
    const dx = tree.x - person.x;
    const dz = tree.z - person.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = tree;
    }
  }
  return nearest;
}

function eatApple(person, tree) {
  if (tree.apples.length === 0) return false;
  const apple = tree.apples.pop();
  tree.group.remove(apple);
  person.hunger = Math.max(0, person.hunger - 40);
  return true;
}

// ===========================================
// Shared Geometries & Materials for People
// ===========================================
const headGeo = new THREE.SphereGeometry(0.12, 10, 8);
const bodyGeo = new THREE.BoxGeometry(0.1, 0.15, 0.08);
const limbGeo = new THREE.BoxGeometry(0.04, 0.12, 0.04);
const eyeGeo = new THREE.SphereGeometry(0.02, 6, 4);
const skirtGeo = new THREE.ConeGeometry(0.1, 0.12, 8);
const hairGeo = new THREE.SphereGeometry(0.14, 10, 8);
const heartGeo = new THREE.SphereGeometry(0.05, 6, 4);

const skinMat = new THREE.MeshStandardMaterial({ color: 0xffcc88, roughness: 0.8 });
const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const heartMat = new THREE.MeshStandardMaterial({ color: 0xff69b4, emissive: 0xff1493, emissiveIntensity: 0.5 });

// Create name label sprite
function createNameSprite(name) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 256;
  canvas.height = 64;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20, 10);
  ctx.fill();

  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.5, 0.125, 1);
  return sprite;
}

const personalities = {
  // Males
  'Blorpo': {
    title: 'The Daydreamer',
    traits: ['Clumsy', 'Hopeless romantic', 'Afraid of birds'],
    mood: 'Wistfully staring at clouds',
    hobby: 'Tripping over things',
    secret: 'Once cried at a sunset for 3 hours',
    loveStyle: 'Falls in love at first sight, every single time',
  },
  'Grunthus': {
    title: 'The Grump with a Heart',
    traits: ['Secretly soft', 'Pretends to hate fun', 'Champion napper'],
    mood: 'Annoyed but intrigued',
    hobby: 'Complaining about the weather',
    secret: 'Writes poetry about flowers',
    loveStyle: 'Acts uninterested, then writes sonnets',
  },
  'Wimbledon': {
    title: 'The Posh Disaster',
    traits: ['Overdressed', 'Terrible at sports', 'Impeccable manners'],
    mood: 'Trying to look dignified',
    hobby: 'Adjusting his invisible monocle',
    secret: 'Has never won at tennis despite his name',
    loveStyle: 'Overly formal courtship, many bows',
  },
  'Sir Jiggles': {
    title: 'The Jolly Knight',
    traits: ['Bouncy', 'Laughs at own jokes', 'Easily excited'],
    mood: 'Delightfully jiggly',
    hobby: 'Bouncing and giggling',
    secret: 'Knighted himself in a mirror',
    loveStyle: 'Giggles uncontrollably when nervous',
  },
  'Boingo': {
    title: 'The Chaos Gremlin',
    traits: ['Hyperactive', 'Mischievous', 'Surprisingly wise'],
    mood: 'Vibrating with energy',
    hobby: 'Starting harmless chaos',
    secret: 'Secretly gives great life advice',
    loveStyle: 'Chaotic but devoted',
  },
  'Muffintop': {
    title: 'The Cozy Baker',
    traits: ['Warm', 'Hungry', 'Gives great hugs'],
    mood: 'Thinking about snacks',
    hobby: 'Imaginary baking',
    secret: 'Has named all the trees',
    loveStyle: 'Shows love through imaginary baked goods',
  },
  // Females
  'Sprinkles': {
    title: 'The Sparkle Queen',
    traits: ['Optimistic', 'Glittery soul', 'Talks to butterflies'],
    mood: 'Radiating sparkle energy',
    hobby: 'Making everything prettier',
    secret: 'Believes she can photosynthesize',
    loveStyle: 'Overwhelming affection and sparkles',
  },
  'Duchess Wobblebottom': {
    title: 'The Elegant Wobbler',
    traits: ['Regal', 'Dramatic', 'Excellent at wobbling'],
    mood: 'Dramatically contemplating',
    hobby: 'Practicing royal waves',
    secret: 'The wobble is intentional',
    loveStyle: 'Expects to be courted properly',
  },
  'Fifi LaRue': {
    title: 'The Mysterious Artiste',
    traits: ['Enigmatic', 'Artsy', 'Speaks in riddles'],
    mood: 'Mysteriously intriguing',
    hobby: 'Staring meaningfully into distance',
    secret: 'Nobody knows what she actually does',
    loveStyle: 'Love letters in cryptic poetry',
  },
  'Buttercup': {
    title: 'The Fierce Softy',
    traits: ['Tough exterior', 'Melts for cute things', 'Protective'],
    mood: 'Trying to look tough',
    hobby: 'Pretending not to care',
    secret: 'Cries at happy endings',
    loveStyle: 'Aggressively caring',
  },
  'Twinkletoes': {
    title: 'The Dancing Dreamer',
    traits: ['Graceful', 'Head in clouds', 'Always humming'],
    mood: 'Dancing to internal music',
    hobby: 'Spontaneous pirouettes',
    secret: 'Choreographs in her sleep',
    loveStyle: 'Wants a dance partner for life',
  },
  'Lady Snuggums': {
    title: 'The Supreme Cuddler',
    traits: ['Cozy', 'Sleepy', 'Professional hugger'],
    mood: 'Seeking warmth',
    hobby: 'Finding perfect nap spots',
    secret: 'Can fall asleep anywhere',
    loveStyle: 'Wants someone to nap with forever',
  },
};

const maleNames = ['Blorpo', 'Grunthus', 'Wimbledon', 'Sir Jiggles', 'Boingo', 'Muffintop'];
const femaleNames = ['Sprinkles', 'Duchess Wobblebottom', 'Fifi LaRue', 'Buttercup', 'Twinkletoes', 'Lady Snuggums'];

const maleColors = [0x4488cc, 0x44aa44, 0xccaa44];
const femaleColors = [0xff69b4, 0xff6b9d, 0xda70d6];
const hairColors = [0x8b4513, 0xffd700, 0x1a1a1a, 0xd2691e];

// ===========================================
// People
// ===========================================
const people = [];

function createPerson(index, customName = null, customFemale = null, customAge = null) {
  const group = new THREE.Group();
  const isFemale = customFemale !== null ? customFemale : (index % 2 === 1);
  const name = customName || (isFemale
    ? femaleNames[Math.floor(index / 2) % femaleNames.length]
    : maleNames[Math.floor(index / 2) % maleNames.length]);

  const colorMat = new THREE.MeshStandardMaterial({
    color: isFemale
      ? femaleColors[Math.floor(index / 2) % femaleColors.length]
      : maleColors[Math.floor(index / 2) % maleColors.length],
    roughness: 0.8
  });

  // Head
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 0.22;
  head.castShadow = true;
  group.add(head);

  // Hair for women
  if (isFemale) {
    const hairMat = new THREE.MeshStandardMaterial({
      color: hairColors[Math.floor(index / 2) % hairColors.length],
      roughness: 0.9
    });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 0.26;
    hair.position.z = -0.02;
    hair.scale.set(1, 0.8, 1);
    group.add(hair);
  }

  // Eyes
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-0.04, 0.25, 0.1);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  rightEye.position.set(0.04, 0.25, 0.1);
  group.add(rightEye);

  // Body
  const body = new THREE.Mesh(bodyGeo, colorMat);
  body.position.y = 0.07;
  body.castShadow = true;
  group.add(body);

  // Skirt for women instead of visible legs
  let leftLegPivot, rightLegPivot;
  if (isFemale) {
    const skirt = new THREE.Mesh(skirtGeo, colorMat);
    skirt.position.y = -0.02;
    skirt.rotation.x = Math.PI;
    group.add(skirt);

    // Hidden legs (still animated but smaller)
    leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.03, -0.05, 0);
    const leftLeg = new THREE.Mesh(limbGeo, skinMat);
    leftLeg.scale.set(0.8, 0.6, 0.8);
    leftLeg.position.y = -0.04;
    leftLegPivot.add(leftLeg);
    group.add(leftLegPivot);

    rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.03, -0.05, 0);
    const rightLeg = new THREE.Mesh(limbGeo, skinMat);
    rightLeg.scale.set(0.8, 0.6, 0.8);
    rightLeg.position.y = -0.04;
    rightLegPivot.add(rightLeg);
    group.add(rightLegPivot);
  } else {
    // Regular legs for men
    leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.03, -0.01, 0);
    const leftLeg = new THREE.Mesh(limbGeo, colorMat);
    leftLeg.position.y = -0.06;
    leftLegPivot.add(leftLeg);
    group.add(leftLegPivot);

    rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.03, -0.01, 0);
    const rightLeg = new THREE.Mesh(limbGeo, colorMat);
    rightLeg.position.y = -0.06;
    rightLegPivot.add(rightLeg);
    group.add(rightLegPivot);
  }

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

  // Heart (hidden by default, shown when flirting)
  const heart = new THREE.Mesh(heartGeo, heartMat);
  heart.position.y = 0.45;
  heart.visible = false;
  group.add(heart);

  // Name label
  const nameSprite = createNameSprite(name);
  nameSprite.position.y = 0.5;
  group.add(nameSprite);

  // Zzz sprites for sleeping (3 z's that float up)
  const zzzSprites = [];
  for (let i = 0; i < 3; i++) {
    const zzz = createZzzSprite();
    zzz.position.y = 0.35 + i * 0.12;
    zzz.position.x = 0.1 + i * 0.05;
    zzz.userData = { baseY: zzz.position.y, phase: i * 0.8 };
    group.add(zzz);
    zzzSprites.push(zzz);
  }

  scene.add(group);

  // Random starting position on island
  const angle = (index / PERSON_COUNT) * Math.PI * 2 + Math.random() * 0.5;
  const dist = Math.random() * (ISLAND_RADIUS - 1);

  return {
    group,
    head,
    heart,
    nameSprite,
    zzzSprites,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    name,
    isFemale,
    x: Math.cos(angle) * dist,
    z: Math.sin(angle) * dist,
    targetX: 0,
    targetZ: 0,
    walkSpeed: 0.5 + Math.random() * 0.4,
    phase: Math.random() * Math.PI * 2,
    waitTime: 0,
    isWalking: true,
    isFlirting: false,
    flirtPartner: null,
    flirtTime: 0,
    inLove: false,
    lovePartner: null,
    hunger: 20 + Math.random() * 30, // Start with some hunger
    isEating: false,
    targetTree: null,
    seekingFood: false,
    age: customAge !== null ? customAge : (20 + Math.random() * 10), // Start as young adults
    isMakingLove: false,
    loveTimer: 0,
    goingToTree: false,
    hadBaby: false, // Prevent immediate repeat babies
    babyCooldown: 0,
    isSleeping: false,
  };
}

for (let i = 0; i < PERSON_COUNT; i++) {
  const person = createPerson(i);
  pickNewTarget(person);
  people.push(person);
}

// Calculate scale based on age
function getAgeScale(age) {
  if (age < 5) {
    // Baby: tiny, growing
    return 0.3 + (age / 5) * 0.3; // 0.3 to 0.6
  } else if (age < 20) {
    // Child/teen: growing to full size
    return 0.6 + ((age - 5) / 15) * 0.4; // 0.6 to 1.0
  } else if (age < 70) {
    // Adult: full size
    return 1.0;
  } else {
    // Elder: shrinking slightly
    return 1.0 - ((age - 70) / 30) * 0.15; // 1.0 to 0.85
  }
}

function getAgeStage(age) {
  if (age < 5) return 'Baby';
  if (age < 15) return 'Child';
  if (age < 20) return 'Teen';
  if (age < 50) return 'Adult';
  if (age < 70) return 'Middle-aged';
  return 'Elder';
}

// Spawn a baby
function spawnBaby(parent1, parent2) {
  const isFemale = Math.random() > 0.5;
  const nameList = isFemale ? femaleNames : maleNames;
  const name = nameList[Math.floor(Math.random() * nameList.length)];

  // Create baby using existing function but override age
  const babyIndex = people.length;
  const baby = createPerson(babyIndex, name, isFemale, 0);

  // Position near parents
  baby.x = (parent1.x + parent2.x) / 2 + (Math.random() - 0.5) * 0.5;
  baby.z = (parent1.z + parent2.z) / 2 + (Math.random() - 0.5) * 0.5;

  pickNewTarget(baby);
  people.push(baby);

  return baby;
}

// Remove dead people (called when age > MAX_AGE)
function removePerson(person) {
  // Clean up relationships
  if (person.lovePartner) {
    person.lovePartner.inLove = false;
    person.lovePartner.lovePartner = null;
    person.lovePartner.heart.visible = false;
  }
  if (person.flirtPartner) {
    person.flirtPartner.isFlirting = false;
    person.flirtPartner.flirtPartner = null;
  }

  // Remove from scene
  scene.remove(person.group);

  // Remove from array
  const idx = people.indexOf(person);
  if (idx !== -1) people.splice(idx, 1);

  // Clear focus if focused
  if (focusedPerson === person) {
    focusedPerson = null;
    hideProfile();
  }
}

function pickNewTarget(p) {
  // Pick random spot on island surface
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * (ISLAND_RADIUS - 0.8);
  p.targetX = Math.cos(angle) * dist;
  p.targetZ = Math.sin(angle) * dist;
  p.isWalking = true;
}

function checkForFlirting() {
  const FLIRT_DISTANCE = 0.6;

  for (const p of people) {
    if (p.isFlirting || p.inLove || p.age < 18) continue; // Must be adult

    for (const other of people) {
      if (other === p || other.isFlirting || other.inLove || other.age < 18) continue;
      if (p.isFemale === other.isFemale) continue; // Only opposite genders flirt

      const dx = other.x - p.x;
      const dz = other.z - p.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < FLIRT_DISTANCE) {
        // Start flirting!
        p.isFlirting = true;
        p.flirtPartner = other;
        p.flirtTime = 3 + Math.random() * 2; // Flirt for 3-5 seconds
        p.isWalking = false;

        other.isFlirting = true;
        other.flirtPartner = p;
        other.flirtTime = p.flirtTime;
        other.isWalking = false;

        // Show hearts
        p.heart.visible = true;
        other.heart.visible = true;

        break;
      }
    }
  }
}

function fallInLove(p1, p2) {
  p1.inLove = true;
  p1.lovePartner = p2;
  p2.inLove = true;
  p2.lovePartner = p1;

  // Keep hearts visible for couples
  p1.heart.visible = true;
  p2.heart.visible = true;

  // Find a tree to go to for... privacy
  const tree = findNearestTreeWithApples(p1) || trees[Math.floor(Math.random() * trees.length)];
  p1.goingToTree = true;
  p2.goingToTree = true;
  p1.targetTree = tree;
  p2.targetTree = tree;
  p1.targetX = tree.x;
  p1.targetZ = tree.z;
  p2.targetX = tree.x;
  p2.targetZ = tree.z;
}

// ===========================================
// Camera orbit state
// ===========================================
let camTheta = 0;
let camPhi = Math.PI * 0.3;
let targetCamTheta = 0;
let targetCamPhi = Math.PI * 0.3;
const CAM_RADIUS = 14;
const FOCUS_CAM_DIST = 2;

// Focus state
let focusedPerson = null;
let targetCamPos = new THREE.Vector3();
let targetLookAt = new THREE.Vector3(0, 1, 0);
let currentLookAt = new THREE.Vector3(0, 1, 0);

// Raycaster for clicking
const raycaster = new THREE.Raycaster();

function handleTap(screenX, screenY) {
  const ndc = new THREE.Vector2(
    (screenX / window.innerWidth) * 2 - 1,
    -(screenY / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(ndc, camera);

  // Check if we clicked on a person
  let closestPerson = null;
  let closestDist = Infinity;

  for (const p of people) {
    // Raycast against head
    const hits = raycaster.intersectObject(p.head);
    if (hits.length > 0 && hits[0].distance < closestDist) {
      closestDist = hits[0].distance;
      closestPerson = p;
    }
  }

  // Also check proximity to any person's position
  if (!closestPerson) {
    const ray = raycaster.ray;
    for (const p of people) {
      const personPos = new THREE.Vector3(p.x, ISLAND_HEIGHT / 2 + 0.2, p.z);
      const toPoint = personPos.clone().sub(ray.origin);
      const projection = toPoint.dot(ray.direction);
      const closest = ray.origin.clone().add(ray.direction.clone().multiplyScalar(projection));
      const dist = closest.distanceTo(personPos);
      if (dist < 0.4 && projection > 0 && projection < closestDist) {
        closestDist = projection;
        closestPerson = p;
      }
    }
  }

  if (closestPerson) {
    if (focusedPerson === closestPerson) {
      // Tap again to unfocus
      focusedPerson = null;
      hideProfile();
    } else {
      focusedPerson = closestPerson;
      showProfile(closestPerson);
    }
  } else if (focusedPerson) {
    // Tapped empty space, unfocus
    focusedPerson = null;
    hideProfile();
  }
}

// ===========================================
// Input: drag to orbit
// ===========================================
let pointerStart = null;
let isDrag = false;

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerStart = { x: e.clientX, y: e.clientY, time: Date.now() };
  isDrag = false;
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if (!pointerStart) return;
  const dx = e.clientX - pointerStart.x;
  const dy = e.clientY - pointerStart.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    isDrag = true;
  }
  if (isDrag && !focusedPerson) {
    targetCamTheta -= dx * 0.005;
    targetCamPhi += dy * 0.005;
    targetCamPhi = Math.max(0.1, Math.min(Math.PI * 0.45, targetCamPhi));
    pointerStart.x = e.clientX;
    pointerStart.y = e.clientY;
  }
});

renderer.domElement.addEventListener('pointerup', (e) => {
  if (pointerStart && !isDrag && (Date.now() - pointerStart.time) < 300) {
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
let elapsed = 0;

function animate() {
  const delta = clock.getDelta();
  elapsed += delta;

  // --- Clouds drift and fade when blocking view ---
  const camToIsland = new THREE.Vector3(0, 1, 0).sub(camera.position).normalize();

  for (const c of clouds) {
    c.angle += c.speed * delta;
    c.mesh.position.x = Math.cos(c.angle) * c.dist;
    c.mesh.position.z = Math.sin(c.angle) * c.dist;
    c.mesh.position.y = c.baseY + Math.sin(elapsed * 0.5 + c.angle) * 0.8;

    // Check if cloud is between camera and island
    const camToCloud = c.mesh.position.clone().sub(camera.position);
    const distToCloud = camToCloud.length();
    const distToIsland = camera.position.distanceTo(new THREE.Vector3(0, 1, 0));

    // Is cloud roughly in the line of sight?
    const dot = camToCloud.normalize().dot(camToIsland);
    const isBlocking = dot > 0.7 && distToCloud < distToIsland && distToCloud < 25;

    c.targetOpacity = isBlocking ? 0.15 : 0.9;

    // Lerp opacity of all puffs
    for (const puff of c.puffs) {
      const currentOpacity = puff.material.opacity;
      puff.material.opacity += (c.targetOpacity - currentOpacity) * 0.05;
    }
  }

  // --- Trees sway & apples respawn ---
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const windSway = 0.03 + windStrength * 0.08;
    tree.group.rotation.z = Math.sin(elapsed * (1.5 + windStrength) + i) * windSway;
    tree.group.rotation.x = Math.sin(elapsed * (1.2 + windStrength * 0.5) + i * 0.5) * windSway * 0.7;

    // Respawn apples
    if (tree.apples.length < MAX_APPLES_PER_TREE) {
      tree.respawnTimer += delta;
      if (tree.respawnTimer >= APPLE_RESPAWN_TIME) {
        tree.respawnTimer = 0;
        tree.apples.push(createApple(tree));
      }
    }

    // Animate apples (gentle sway)
    for (const apple of tree.apples) {
      apple.position.y += Math.sin(elapsed * 2 + apple.position.x * 10) * 0.001;
    }
  }

  // --- Weather ---
  updateWeather(delta, elapsed);

  // --- Birds ---
  updateBirds(delta, elapsed);

  // --- Day-Night Cycle ---
  const prevTimeOfDay = timeOfDay;
  updateDayNightCycle(delta, elapsed);

  // Check if a new day started (for aging)
  const dayJustStarted = prevTimeOfDay >= DAY_DURATION && timeOfDay < DAY_DURATION;

  // --- Island gentle bob (more in wind) ---
  const bobStrength = 0.1 + windStrength * 0.15;
  islandGroup.position.y = Math.sin(elapsed * 0.5) * bobStrength;
  islandGroup.rotation.z = Math.sin(elapsed * 0.3) * (0.01 + windStrength * 0.02);
  islandGroup.rotation.x = Math.sin(elapsed * 0.4) * (0.01 + windStrength * 0.02);

  // --- Check for flirting ---
  checkForFlirting();

  // --- People ---
  const surfaceY = ISLAND_HEIGHT / 2 + 0.15 + islandGroup.position.y;

  // Use a copy of array in case we remove people
  const peopleCopy = [...people];
  for (const p of peopleCopy) {
    // Aging - happens once per day-night cycle (1 cycle = 1 year)
    if (dayJustStarted) {
      p.age += 1;
    }

    // Death check
    if (p.age >= MAX_AGE) {
      removePerson(p);
      continue;
    }

    // Update scale based on age
    const scale = getAgeScale(p.age);
    p.group.scale.setScalar(scale);

    // Baby cooldown (still time-based for gameplay)
    if (p.babyCooldown > 0) p.babyCooldown -= delta;

    // Make name sprites face camera
    p.nameSprite.quaternion.copy(camera.quaternion);

    // Handle sleeping at night
    const shouldSleep = isNight && dayNightTransition > 0.5;

    // Animate zzz sprites
    if (p.zzzSprites && p.zzzSprites.length > 0) {
      for (let i = 0; i < p.zzzSprites.length; i++) {
        const zzz = p.zzzSprites[i];
        if (!zzz) continue;
        zzz.quaternion.copy(camera.quaternion);

        if (shouldSleep) {
          // Fade in and animate floating up
          zzz.material.opacity = Math.min(0.9, zzz.material.opacity + delta * 2);
          const floatY = Math.sin(elapsed * 1.5 + zzz.userData.phase) * 0.08;
          const drift = Math.sin(elapsed * 0.8 + zzz.userData.phase) * 0.03;
          zzz.position.y = zzz.userData.baseY + floatY + (elapsed % 2) * 0.05;
          zzz.position.x = 0.1 + i * 0.05 + drift;

          // Scale pulse
          const pulseScale = 0.12 + Math.sin(elapsed * 2 + zzz.userData.phase) * 0.03;
          zzz.scale.setScalar(pulseScale / 0.15);
        } else {
          // Fade out
          zzz.material.opacity = Math.max(0, zzz.material.opacity - delta * 3);
        }
      }
    }

    // If sleeping, skip normal behavior
    if (shouldSleep) {
      p.isSleeping = true;

      // Sleeping pose - lie down
      p.group.rotation.x = THREE.MathUtils.lerp(p.group.rotation.x, Math.PI / 2 * 0.7, 0.05);

      // Arms relaxed
      p.leftArmPivot.rotation.x = THREE.MathUtils.lerp(p.leftArmPivot.rotation.x, 0.2, 0.1);
      p.rightArmPivot.rotation.x = THREE.MathUtils.lerp(p.rightArmPivot.rotation.x, 0.2, 0.1);
      p.leftArmPivot.rotation.z = 0;
      p.rightArmPivot.rotation.z = 0;

      // Legs still
      p.leftLegPivot.rotation.x = 0;
      p.rightLegPivot.rotation.x = 0;

      // Hide heart while sleeping
      p.heart.visible = false;

      // Gentle breathing motion
      const breathe = Math.sin(elapsed * 0.8 + p.phase) * 0.01;
      p.group.position.y += breathe;

      // Don't process other behaviors while sleeping
      // Keep on island surface with bob
      const bob = 0;
      p.group.position.set(p.x, surfaceY + bob, p.z);
      continue;
    }

    // Waking up - restore normal rotation
    if (p.isSleeping && !shouldSleep) {
      p.isSleeping = false;
      p.group.rotation.x = 0;
      // Restore heart visibility if in love
      if (p.inLove) p.heart.visible = true;
    }

    // Increase hunger over time (faster for kids) - only during day
    const hungerRate = p.age < 15 ? 3 : 2;
    p.hunger += delta * hungerRate;
    if (p.hunger > 100) p.hunger = 100;

    // Only adults can do adult things
    const isAdult = p.age >= 18;

    // Check if should seek food (hungry and not doing something important)
    const isHungry = p.hunger > 60;
    const isBusy = p.isFlirting || p.isEating || p.isMakingLove;

    if (isHungry && !isBusy && !p.seekingFood && !p.goingToTree) {
      const tree = findNearestTreeWithApples(p);
      if (tree) {
        p.seekingFood = true;
        p.targetTree = tree;
        p.targetX = tree.x;
        p.targetZ = tree.z;
        p.isWalking = true;
      }
    }

    // Animate hearts for people in love
    if (p.inLove && p.heart.visible) {
      p.heart.position.y = 0.45 + Math.sin(elapsed * 2 + p.phase) * 0.05;
      p.heart.rotation.y = elapsed;
      p.heart.scale.setScalar(0.7 + Math.sin(elapsed * 3) * 0.1);
    }

    // Making love behavior
    if (p.isMakingLove) {
      p.loveTimer -= delta;

      // Lie down (rotate to horizontal)
      p.group.rotation.x = Math.PI / 2 * 0.8;
      p.group.rotation.z = Math.sin(elapsed * 3) * 0.1;

      // Animate
      p.leftArmPivot.rotation.x = Math.sin(elapsed * 4) * 0.3;
      p.rightArmPivot.rotation.x = Math.sin(elapsed * 4 + 1) * 0.3;

      // Heart beats faster
      p.heart.scale.setScalar(0.8 + Math.sin(elapsed * 8) * 0.3);

      if (p.loveTimer <= 0 && !p.isFemale && p.lovePartner) {
        // Baby time! (only non-female triggers this to avoid double spawn)
        const baby = spawnBaby(p, p.lovePartner);

        // Reset both partners
        p.isMakingLove = false;
        p.group.rotation.x = 0;
        p.group.rotation.z = 0;
        p.goingToTree = false;
        p.hadBaby = true;
        p.babyCooldown = 30; // Can't have another baby for 30 seconds

        if (p.lovePartner) {
          p.lovePartner.isMakingLove = false;
          p.lovePartner.group.rotation.x = 0;
          p.lovePartner.group.rotation.z = 0;
          p.lovePartner.goingToTree = false;
          p.lovePartner.hadBaby = true;
          p.lovePartner.babyCooldown = 30;
        }

        p.waitTime = 2;
        pickNewTarget(p);
        if (p.lovePartner) {
          p.lovePartner.targetX = p.targetX;
          p.lovePartner.targetZ = p.targetZ;
        }
      }
    }
    // Eating behavior
    else if (p.isEating) {
      p.waitTime -= delta;
      // Eating animation - arms to mouth
      p.leftArmPivot.rotation.x = -1.2;
      p.rightArmPivot.rotation.x = -1.2;
      p.leftArmPivot.rotation.z = 0.5;
      p.rightArmPivot.rotation.z = -0.5;

      if (p.waitTime <= 0) {
        p.isEating = false;
        p.leftArmPivot.rotation.z = 0;
        p.rightArmPivot.rotation.z = 0;
        p.waitTime = 0.5;
        pickNewTarget(p);
      }
    }
    // Flirting behavior
    else if (p.isFlirting) {
      p.flirtTime -= delta;

      // Face partner
      if (p.flirtPartner) {
        const dx = p.flirtPartner.x - p.x;
        const dz = p.flirtPartner.z - p.z;
        p.group.rotation.y = Math.atan2(dx, dz);
      }

      // Flirty wave animation
      p.leftArmPivot.rotation.x = Math.sin(elapsed * 6 + p.phase) * 0.8;
      p.rightArmPivot.rotation.x = Math.sin(elapsed * 6 + p.phase + 1) * 0.8;
      p.leftArmPivot.rotation.z = Math.sin(elapsed * 4) * 0.3 - 0.5;
      p.rightArmPivot.rotation.z = -Math.sin(elapsed * 4) * 0.3 + 0.5;

      // Bouncy excited movement
      p.leftLegPivot.rotation.x = Math.sin(elapsed * 8) * 0.2;
      p.rightLegPivot.rotation.x = -Math.sin(elapsed * 8) * 0.2;

      // Animate heart floating up
      p.heart.position.y = 0.45 + Math.sin(elapsed * 3 + p.phase) * 0.1;
      p.heart.rotation.y = elapsed * 2;
      p.heart.scale.setScalar(0.8 + Math.sin(elapsed * 5) * 0.2);

      if (p.flirtTime <= 0) {
        const partner = p.flirtPartner;
        // Done flirting - 70% chance to fall in love!
        p.isFlirting = false;
        p.leftArmPivot.rotation.z = 0;
        p.rightArmPivot.rotation.z = 0;

        if (partner && !p.inLove && !partner.inLove && Math.random() < 0.7) {
          fallInLove(p, partner);
        } else {
          p.flirtPartner = null;
          p.heart.visible = false;
          p.waitTime = 0.5;
          pickNewTarget(p);
        }
      }
    } else if (p.inLove && p.lovePartner && !p.isMakingLove) {
      // Walking hand in hand with partner
      const partner = p.lovePartner;

      // Only the "leader" (non-female) controls movement
      if (!p.isFemale) {
        // Check if couple is hungry (overrides going to tree for love)
        const coupleHungry = p.hunger > 70 || partner.hunger > 70;
        if (coupleHungry && !p.seekingFood && !p.goingToTree) {
          const tree = findNearestTreeWithApples(p);
          if (tree) {
            p.seekingFood = true;
            p.targetTree = tree;
            p.targetX = tree.x;
            p.targetZ = tree.z;
          }
        }

        const dx = p.targetX - p.x;
        const dz = p.targetZ - p.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if (dist < 0.5) {
          // Reached target
          if (p.goingToTree && p.babyCooldown <= 0 && partner.babyCooldown <= 0) {
            // Time to make love!
            p.isMakingLove = true;
            p.loveTimer = BABY_TIME;
            partner.isMakingLove = true;
            partner.loveTimer = BABY_TIME;
            p.isWalking = false;
            partner.isWalking = false;
          } else if (p.seekingFood && p.targetTree) {
            // Both eat
            eatApple(p, p.targetTree);
            eatApple(partner, p.targetTree);
            p.seekingFood = false;
            p.targetTree = null;
            p.waitTime = 1.5;
            pickNewTarget(p);
            partner.targetX = p.targetX;
            partner.targetZ = p.targetZ;
          } else {
            p.waitTime = 1 + Math.random() * 2;
            p.goingToTree = false;
            partner.goingToTree = false;
            pickNewTarget(p);
            partner.targetX = p.targetX;
            partner.targetZ = p.targetZ;
          }
        } else if (p.waitTime > 0) {
          p.waitTime -= delta;
        } else {
          // Move towards target
          const moveSpeed = p.walkSpeed * 0.7 * delta; // Walk slower when in love
          const ratio = Math.min(moveSpeed / dist, 1);
          p.x += dx * ratio;
          p.z += dz * ratio;

          // Face direction of movement
          const angle = Math.atan2(dx, dz);
          p.group.rotation.y = angle;
          partner.group.rotation.y = angle;

          // Position partner next to leader (hand in hand)
          const sideOffset = 0.25;
          partner.x = p.x + Math.cos(angle + Math.PI/2) * sideOffset;
          partner.z = p.z + Math.sin(angle + Math.PI/2) * sideOffset;

          // Walk animation (synchronized)
          const swing = Math.sin(elapsed * 6 + p.phase) * 0.4;
          p.leftArmPivot.rotation.x = swing;
          p.rightArmPivot.rotation.x = 0.3; // Arm out to hold hands
          p.rightArmPivot.rotation.z = 0.5;
          p.leftLegPivot.rotation.x = -swing;
          p.rightLegPivot.rotation.x = swing;

          partner.rightArmPivot.rotation.x = swing;
          partner.leftArmPivot.rotation.x = 0.3; // Arm out to hold hands
          partner.leftArmPivot.rotation.z = -0.5;
          partner.leftLegPivot.rotation.x = -swing;
          partner.rightLegPivot.rotation.x = swing;
        }
      }
    } else if (p.waitTime > 0) {
      p.waitTime -= delta;
      // Idle animation - just subtle movement
      p.leftArmPivot.rotation.x = Math.sin(elapsed * 2 + p.phase) * 0.1;
      p.rightArmPivot.rotation.x = -Math.sin(elapsed * 2 + p.phase) * 0.1;
      p.leftLegPivot.rotation.x = 0;
      p.rightLegPivot.rotation.x = 0;

      if (p.waitTime <= 0) {
        pickNewTarget(p);
      }
    } else {
      // Walk towards target
      const dx = p.targetX - p.x;
      const dz = p.targetZ - p.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < 0.4) {
        // Reached target
        if (p.seekingFood && p.targetTree) {
          // Try to eat an apple
          if (eatApple(p, p.targetTree)) {
            p.isEating = true;
            p.waitTime = 1.5; // Eating time
            p.isWalking = false;
          }
          p.seekingFood = false;
          p.targetTree = null;
        } else {
          // Regular destination reached
          p.isWalking = false;
          p.waitTime = 1 + Math.random() * 3;
        }
      } else {
        // Move towards target
        const moveSpeed = p.walkSpeed * delta;
        const ratio = Math.min(moveSpeed / dist, 1);
        p.x += dx * ratio;
        p.z += dz * ratio;

        // Face direction of movement
        p.group.rotation.y = Math.atan2(dx, dz);

        // Walk animation
        const swing = Math.sin(elapsed * 8 + p.phase) * 0.5;
        p.leftArmPivot.rotation.x = swing;
        p.rightArmPivot.rotation.x = -swing;
        p.leftLegPivot.rotation.x = -swing;
        p.rightLegPivot.rotation.x = swing;
      }
    }

    // Keep on island surface with bob
    const bob = (p.isWalking || p.isFlirting) ? Math.sin(elapsed * 8 + p.phase) * 0.02 : 0;
    p.group.position.set(p.x, surfaceY + bob, p.z);

    // Keep within island bounds
    const personDist = Math.sqrt(p.x * p.x + p.z * p.z);
    if (personDist > ISLAND_RADIUS - 0.3) {
      const scale = (ISLAND_RADIUS - 0.3) / personDist;
      p.x *= scale;
      p.z *= scale;
      pickNewTarget(p); // Turn around
    }
  }

  // --- Update profile card if visible ---
  if (focusedPerson && profileCard.classList.contains('visible')) {
    updateProfileStatus(focusedPerson);
  }

  // --- Camera ---
  if (focusedPerson) {
    // Profile shot of focused person
    const p = focusedPerson;
    const personY = surfaceY + 0.2;

    // Position camera to the side of the person for profile view
    const profileAngle = p.group.rotation.y + Math.PI / 2;
    targetCamPos.set(
      p.x + Math.sin(profileAngle) * FOCUS_CAM_DIST,
      personY + 0.3,
      p.z + Math.cos(profileAngle) * FOCUS_CAM_DIST
    );
    targetLookAt.set(p.x, personY, p.z);
  } else {
    // Normal orbit camera
    if (!isDrag) {
      targetCamTheta += delta * 0.05; // slow auto-drift
    }
    camTheta += (targetCamTheta - camTheta) * 0.05;
    camPhi += (targetCamPhi - camPhi) * 0.05;

    targetCamPos.set(
      CAM_RADIUS * Math.sin(camPhi) * Math.cos(camTheta),
      CAM_RADIUS * Math.cos(camPhi) + 2,
      CAM_RADIUS * Math.sin(camPhi) * Math.sin(camTheta)
    );
    targetLookAt.set(0, 1, 0);
  }

  // Lerp camera position and look-at
  const lerpSpeed = focusedPerson ? 0.08 : 0.05;
  camera.position.lerp(targetCamPos, lerpSpeed);
  currentLookAt.lerp(targetLookAt, lerpSpeed);
  camera.lookAt(currentLookAt);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
