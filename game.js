// ====== DOM elements and styles ======
const gameContainer = document.getElementById('loadPreGame');
gameContainer.style = `
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background-color:#E1ED6B;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-image:url('5dfe317d4e7b84ef2315c39541be824b.jpg');
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center;
  text-align:center;
`;

const video = document.getElementById('video');
const videostarts = document.getElementById('videostart');

video.innerHTML = "";
videostarts.innerHTML = "";
videostarts.style = `
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  object-fit:cover;
  z-index:998;
  display:none;
`;

const videoPilot = '<video id="video_pilot" src="istockphoto-1126666385-640_adpp_is.mp4" muted autoplay loop></video>';
const videoKorabl = '<video id="video_ship" src="istockphoto-1216361063-640_adpp_is.mp4" muted autoplay loop></video>';
const videoPilot2 = '<video id="video_pilot2" src="istockphoto-1126666366-640_adpp_is.mp4" muted autoplay loop></video>';
const videoStart = '<video src="istockphoto-1271371535-640_adpp_is.mp4" muted autoplay loop></video>';

let audio = new Audio();
const stringTexsts = [
  'Представляем', 'Игру', 'Разработанную', 'На JAVASCRIPT', 'Babkov M', 'WorldInSpace',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'ПОЕХАЛИ', '', '', '', '', '', ''
];

const displayContainerNone = document.getElementById('container');
displayContainerNone.style.display = 'none';

// ====== Audio control ======
const audioPlay = () => {
  // Best started after a user gesture, but here we call directly as per your flow
  audio.play().catch(() => {});
};

// ====== Pre-game cinematic ======
const preGame = () => {
  audio.pause();
  audio = new Audio("Harold Faltermeyer - Top Gun Anthem (OST из фильма _Лучший стрелок _ Top Gun_) (galamp3.com).mp3");
  audioPlay();

  setTimeout(() => { video.innerHTML = videoPilot; }, 14000);
  setTimeout(() => { video.innerHTML = videoKorabl; }, 24000);
  setTimeout(() => { video.innerHTML = videoPilot2; }, 42000);

  let number = 0;
  const textInterval = setInterval(() => {
    if (number >= stringTexsts.length) {
      clearInterval(textInterval);
      return;
    }
    const el = document.getElementById('text');
    if (el) el.innerHTML = `${stringTexsts[number]}`;
    number++;
  }, 2000);

  setTimeout(() => {
    audio.pause();
    audio = new Audio('passengers_15. 50 of Light Speed.mp3');
    audioPlay();
    const startBtn = document.getElementById('start');
    if (startBtn) startBtn.style.display = "none";
    const h1 = document.getElementById('h1');
    if (h1) h1.style.zIndex = "999";
  }, 52000);
};

// ====== Start main game ======
const startGame = () => {
  const h1 = document.getElementById('h1');
  if (h1) h1.style.zIndex = "998";

  audio.pause();
  audio = new Audio('234264-933636b6-9a23-407e-851d-b88c50828212.mp3');
  audioPlay();

  videostarts.innerHTML = videoStart;
  videostarts.style.display = "block";

  setTimeout(() => {
    videostarts.style.display = "none";
    displayContainerNone.style.display = "block";
    gameContainer.style.display = "none";
    audio.pause();
    audio = new Audio('ZZ Top — Bad to the bone(саундтрек к к_ф Трудный ребенок) (www.lightaudio.ru).mp3');
    audioPlay();
  }, 8000);
};

// ====== Konva scene and gameplay ======
var width = window.innerWidth;
var height = window.innerHeight;

var imageObj = new Image();
imageObj.src = 'pngwing.com.png';

imageObj.onload = function() {
  drawImage(this);
};

function drawImage(imageObj) {
  // Stage and layers
  const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
  });

  const layerGame = new Konva.Layer(); // player, bullets
  const layerEffects = new Konva.Layer(); // explosions
  const layerUI = new Konva.Layer(); // enemies, misc

  stage.add(layerGame);
  stage.add(layerUI);
  stage.add(layerEffects);

  // Player group (your plane)
  const group = new Konva.Group({
    x: stage.width() / 2 - 200 / 2,
    y: stage.height() - 200,
    draggable: true,
  });

  const playerImg = new Konva.Image({
    image: imageObj,
    width: 200,
    height: 137,
  });

  const gunRect = new Konva.Rect({
    x: 200 / 2 - 3.5,
    y: -25,
    width: 7,
    height: 25,
    fill: '#04FDF9',
    strokeWidth: 0,
  });

  const turbo = new Konva.Rect({
    x: 200 / 2 - 50,
    y: 137 + 10,
    width: 100,
    height: 2,
    fill: '#580FBD',
    strokeWidth: 0,
  });

  group.add(playerImg);
  group.add(gunRect);
  group.add(turbo);
  layerGame.add(group);

  // Cursor feedback
  group.on('mouseover', function() { document.body.style.cursor = 'pointer'; });
  group.on('mouseout', function() { document.body.style.cursor = 'default'; });

  // Hexagon demo element from your original
  const hexagon = new Konva.Image({
    image: imageObj,
    x: 70,
    y: 50,
    width: 50,
    height: 50,
  });
  layerUI.add(hexagon);

  // Horizontal oscillation animation for hexagon
  const amplitude = 100;
  const period = 2000;
  const centerX = stage.width() / 2;
  const hexAnim = new Konva.Animation(function(frame) {
    hexagon.x(
      amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + centerX
    );
  }, layerUI);
  hexAnim.start();

  // ====== Shooting (bullets) ======
  const bullets = [];
  const bulletSpeed = 12;
  const shootSound = new Audio('234264-3e98473e-3d08-40a2-85bc-a9b8f43dfd75.mp3');

  function shoot() {
    const bx = group.x() + 200 / 2; // center of plane
    const by = group.y() - 10; // slightly above plane
    const bullet = new Konva.Rect({
      x: bx - 2,
      y: by,
      width: 4,
      height: 12,
      fill: '#00E5FF',
    });
    bullets.push(bullet);
    layerGame.add(bullet);
    shootSound.currentTime = 0;
    shootSound.play().catch(() => {});
  }

  // Auto-fire on touch and mouse down
  let fireInterval = null;
  function startFiring() {
    if (fireInterval) return;
    shoot();
    fireInterval = setInterval(shoot, 150);
  }
  function stopFiring() {
    if (!fireInterval) return;
    clearInterval(fireInterval);
    fireInterval = null;
  }

  group.on('touchstart', startFiring);
  group.on('touchend', stopFiring);
  group.on('mousedown', startFiring);
  stage.on('mouseup touchend', stopFiring);

  // ====== Enemies ======
  const enemies = [];
  const enemySpawnIntervalMs = 1200;
  const enemySpeed = 3;

  function spawnEnemy() {
    const w = 40 + Math.random() * 20;
    const h = 30 + Math.random() * 20;
    const enemy = new Konva.Rect({
      x: Math.random() * (stage.width() - w),
      y: -h - Math.random() * 100,
      width: w,
      height: h,
      fill: 'rgba(255,60,60,0.85)',
      cornerRadius: 6,
      shadowColor: 'black',
      shadowBlur: 10,
      shadowOpacity: 0.3,
    });
    enemies.push(enemy);
    layerUI.add(enemy);
  }

  const enemySpawner = setInterval(spawnEnemy, enemySpawnIntervalMs);

  // ====== Explosions ======
  function createExplosion(x, y) {
    const explosion = new Konva.Circle({
      x, y,
      radius: 6,
      fill: 'orange',
      stroke: 'yellow',
      strokeWidth: 2,
      opacity: 0.9,
    });
    layerEffects.add(explosion);

    const tween = new Konva.Tween({
      node: explosion,
      duration: 0.45,
      radius: 45,
      opacity: 0,
      onFinish: () => explosion.destroy(),
    });
    tween.play();
  }

  // ====== Collision helpers ======
  function intersects(a, b) {
    const ra = a.getClientRect({ relativeTo: stage });
    const rb = b.getClientRect({ relativeTo: stage });
    return !(
      ra.x > rb.x + rb.width ||
      ra.x + ra.width < rb.x ||
      ra.y > rb.y + rb.height ||
      ra.y + ra.height < rb.y
    );
  }

  // ====== Main animation loop ======
  const mainAnim = new Konva.Animation(function() {
    // Move bullets up
    for (let i = bullets.length - 1; i >= 0; i--) {
      const bullet = bullets[i];
      bullet.y(bullet.y() - bulletSpeed);

      // Remove off-screen bullets
      if (bullet.y() < -20) {
        bullet.destroy();
        bullets.splice(i, 1);
        continue;
      }

      // Bullet vs enemies
      for (let j = enemies.length - 1; j >= 0; j--) {
        const enemy = enemies[j];
        if (intersects(bullet, enemy)) {
          createExplosion(enemy.x() + enemy.width() / 2, enemy.y() + enemy.height() / 2);
          enemy.destroy();
          enemies.splice(j, 1);
          bullet.destroy();
          bullets.splice(i, 1);
          break;
        }
      }
    }

    // Move enemies down
    for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      enemy.y(enemy.y() + enemySpeed);

      // Plane vs enemies
      if (intersects(group, enemy)) {
        createExplosion(enemy.x() + enemy.width() / 2, enemy.y() + enemy.height() / 2);
        enemy.destroy();
        enemies.splice(j, 1);
        // Optional: reduce player HP, shake screen, etc. For now we just kill the enemy.
      }

      // Remove enemies off-screen
      if (enemy.y() > stage.height() + 50) {
        enemy.destroy();
        enemies.splice(j, 1);
      }
    }
  }, layerGame);
  mainAnim.start();

  // ====== Resize handling ======
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    stage.width(w);
    stage.height(h);
  });
}

// Export or attach start functions if needed
// preGame(); // Call when you want the cinematic
// startGame(); // Call to start the game after cinematic or via button