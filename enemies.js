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