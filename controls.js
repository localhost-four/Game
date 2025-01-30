function setupMobileControls() {
    // Логика для мобильных устройств
    const touchStartX = 0;
    const touchStartY = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, false);

    document.addEventListener('touchmove', function(event) {
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                moveRight();
            } else {
                moveLeft();
            }
        } else {
            if (deltaY > 0) {
                moveBackward();
            } else {
                moveForward();
            }
        }
    }, false);
}