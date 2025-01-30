function knockOnDoor(door) {
    // Логика выбивания или открывания дверей
    if (door.position.distanceTo(player.position) < 1) {
        // Условие для открытия или выбивания двери
        scene.remove(door);
        showNotification('Дверь открыта!');
    }
}