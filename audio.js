const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundBuffers = {};

function preloadSounds(sounds) {
    sounds.forEach(sound => {
        const request = new XMLHttpRequest();
        request.open('GET', sound.url, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {
                soundBuffers[sound.name] = buffer;
            });
        };

        request.send();
    });
}

function playSound(name) {
    const source = audioContext.createBufferSource();
    source.buffer = soundBuffers[name];
    source.connect(audioContext.destination);
    source.start(0);
}