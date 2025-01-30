function showNotification(message) {
    const notifications = document.getElementById('notifications');
    notifications.innerHTML += `<p>${message}</p>`;
}