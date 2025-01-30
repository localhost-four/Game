function setupPhysics() {
    // Инициализация физического движка
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // g = 9.82 m/s²

    // Создание физических объектов
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    world.addBody(groundBody);

    // Добавление других объектов
    // ...
}