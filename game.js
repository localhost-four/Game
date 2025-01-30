let scene, camera, renderer, controls, player, enemies = [], doors = [];
const keys = {};

// Инициализация сцены
function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Добавление света
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Создание основного объекта (главный герой)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('path_to_texture.jpg') });
    player = new THREE.Mesh(geometry, material);
    scene.add(player);

    // Позиция камеры
    camera.position.z = 5;
    camera.position.y = 1.5;

    // Контроллеры для управления камерой
    controls = new THREE.FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 10;
    controls.lookSpeed = 0.1;
    controls.noFly = true;
    controls.lookVertical = true;

    // Добавление стен и других объектов
    addWalls();
    addEnemies();
    addDoors();

    // Обработчики событий клавиатуры
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // Обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize, false);

    // Начальная точка спавна игрока
    spawnPlayer();

    // Запуск анимации
    animate();
}

// Добавление объектов
function addWalls() {
    const wallGeometry = new THREE.BoxGeometry(10, 2, 0.1);
    const wallMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('path_to_wall_texture.jpg') });

    const walls = [
        { position: [-5, 1, 0], rotation: [0, Math.PI / 2, 0] },
        { position: [5, 1, 0], rotation: [0, -Math.PI / 2, 0] },
        { position: [0, 1, -5], rotation: [0, 0, 0] },
        { position: [0, 1, 5], rotation: [0, Math.PI, 0] }
    ];

    walls.forEach(wall => {
        const mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        mesh.position.set(...wall.position);
        mesh.rotation.set(...wall.rotation);
        scene.add(mesh);
    });
}

function addEnemies() {
    const enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const enemyMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('path_to_enemy_texture.jpg') });

    for (let i = 0; i < 5; i++) {
        const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
        enemy.position.set(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
        scene.add(enemy);
        enemies.push(enemy);
    }

    // Логика поведения врагов
    setInterval(updateEnemies, 1000 / 60); // Обновляем каждые 1/60 секунды
}

function addDoors() {
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('path_to_door_texture.jpg') });

    for (let i = 0; i < 2; i++) {
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(Math.random() * 10 - 5, 1, Math.random() * 10 - 5);
        scene.add(door);
        doors.push(door);
    }
}

// Обработка событий
function onKeyDown(event) {
    keys[event.code] = true;
}

function onKeyUp(event) {
    keys[event.code] = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Анимация
function animate() {
    requestAnimationFrame(animate);

    // Обработка движения игрока
    if (keys['KeyW']) moveForward();
    if (keys['KeyS']) moveBackward();
    if (keys['KeyA']) moveLeft();
    if (keys['KeyD']) moveRight();
    if (keys['KeyQ']) controls.object.rotation.z -= 0.05;
    if (keys['KeyE']) controls.object.rotation.z += 0.05;

    // Обновление контроллера
    controls.update(0.01);

    // Рендеринг сцены
    renderer.render(scene, camera);
}

// Логика перемещения игрока
function moveForward() {
    controls.moveForward(1);
}

function moveBackward() {
    controls.moveForward(-1);
}

function moveLeft() {
    controls.moveRight(-1);
}

function moveRight() {
    controls.moveRight(1);
}

// Логика взаимодействия
function interact() {
    // Логика взаимодействия
    doors.forEach(door => {
        if (player.position.distanceTo(door.position) < 1) {
            knockOnDoor(door);
        }
    });
}

function toggleFlashlight() {
    // Логика включения/выключения фонаря
}

// Логика обновления врагов
function updateEnemies() {
    enemies.forEach(enemy => {
        // Простая логика преследования игрока
        const direction = new THREE.Vector3().subVectors(player.position, enemy.position).normalize();
        enemy.position.add(direction.multiplyScalar(0.1));

        // Проверка коллизии с игроком
        if (enemy.position.distanceTo(player.position) < 1) {
            alert('Вы пойманы!');
            // Перезапуск игры или другие действия
        }
    });
}

// Начальная точка спавна игрока
function spawnPlayer() {
    player.position.set(0, 1, 0);
    showNotification('Вы начали игру в безопасной комнате.');
}

// Загрузка параметров из URL
function loadParametersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const tp = urlParams.get('tp');
    const seed = urlParams.get('seed');
    if (tp) {
        // Обработка координат
        const coords = tp.split(',').map(Number);
        if (coords.length === 3) {
            player.position.set(coords[0], coords[1], coords[2]);
        }
    }
    if (seed) {
        // Обработка генерации
    }
}