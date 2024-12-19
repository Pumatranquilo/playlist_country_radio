// Seleção de elementos
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const loopBtn = document.getElementById('loopBtn');
const volumeControl = document.getElementById('volumeControl');
const playlist = document.getElementById('playlist').getElementsByTagName('li');

// Variáveis de estado
let currentTrackIndex = 0;
let isLoopingOne = false;

// Atualiza a música no player
function loadTrack(index) {
    const selectedTrack = playlist[index];
    if (selectedTrack) {
        Array.from(playlist).forEach((track) => track.classList.remove('active'));
        selectedTrack.classList.add('active');
        audioSource.src = selectedTrack.getAttribute('data-src');
        audioPlayer.load();
        audioPlayer.play();
        playPauseBtn.textContent = '▶';
    }
}

// Função de play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '▶';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '⏸';
    }
}

// Próxima música
function playNext() {
    if (isLoopingOne) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
    }
}

// Música anterior
function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
}

// Alternar loop (música única ou todas)
function toggleLoop() {
    if (isLoopingOne) {
        isLoopingOne = false;
        audioPlayer.loop = false;
        loopBtn.textContent = '🔁';
    } else if (!audioPlayer.loop) {
        audioPlayer.loop = true;
        loopBtn.textContent = '🚫';
    } else {
        audioPlayer.loop = false;
        isLoopingOne = true;
        loopBtn.textContent = '🔂';
    }
}

// Atualiza o volume
function updateVolume() {
    audioPlayer.volume = volumeControl.value;
}

// Seleção de música na playlist
Array.from(playlist).forEach((track, index) => {
    track.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(index);
    });
});

// Eventos de controle
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrevious);
loopBtn.addEventListener('click', toggleLoop);
volumeControl.addEventListener('input', updateVolume);

// Evento ao terminar a música
audioPlayer.addEventListener('ended', () => {
    if (!audioPlayer.loop && !isLoopingOne) {
        playNext();
    }
});

// Carregar a primeira música ao iniciar
loadTrack(currentTrackIndex);
