function applySettings() {
    const volume = document.getElementById('volume').value;
    const brightness = document.getElementById('brightness').value;
    const graphics = document.getElementById('graphics').value;

    // Применение настроек
    // Например, можно изменить параметры рендера или звука
    showNotification(`Настройки применены: Громкость ${volume}, Яркость ${brightness}, Графика ${graphics}`);
}