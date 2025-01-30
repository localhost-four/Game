function saveCheckpoint() {
    // Логика сохранения чекпоинта
    localStorage.setItem('checkpoint', JSON.stringify({
        position: player.position.toArray(),
        rotation: player.rotation.toArray()
    }));
    showNotification('Чекпоинт сохранен!');
}

function loadCheckpoint() {
    // Логика загрузки чекпоинта
    const checkpoint = JSON.parse(localStorage.getItem('checkpoint'));
    if (checkpoint) {
        player.position.fromArray(checkpoint.position);
        player.rotation.fromArray(checkpoint.rotation);
        showNotification('Чекпоинт загружен!');
    }
}