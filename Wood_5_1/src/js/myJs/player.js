



function stopVideo() { 
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');    
    video.currentTime = 0;
    video.pause();
}

export function playVideo() {
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');
    let playBtn = document.querySelector('[data-player-play]');
    if (video.paused) {         
        changePlayIcon();
        video.play();
        
    } else {        
        changePlayIcon();
        video.pause();
    }
    
}
export function changePlayIcon() {
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');
    let playBtn = document.querySelector('[data-player-play]');
    playBtn.classList.toggle('_icon-pause');
    playBtn.classList.toggle('_icon-play');

}


export function playerShow() {
    let player = document.querySelector('[data-player]');
    player.classList.add('player--show');    
    
}
export function playerClose() {
    let player = document.querySelector('[data-player]');      
    stopVideo();
    changePlayIcon();
    player.classList.remove('player--show');
}

export function playerWhatchProgress() {
    let player = document.querySelector('[data-player]');
    let video;
    if (player) {
        video = player.querySelector('[data-player-video] video');
    }

    let progress = document.querySelector('[data-player-progress] input[type="range"]');
    if (video) {
        video.addEventListener('timeupdate', () => {
            playerUpdateProgress();
        });
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            changePlayIcon();
        });
        
    }
    if (progress) {
        progress.addEventListener('input', () => {
            setProgress();
        }); 
    }

}


export function fullScreen() { 
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
    
}

export function playerUpdateProgress() { 
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');
    let progress = document.querySelector('[data-player-progress] input[type="range"]');
    let timeNow = player.querySelector('.progress__time-now');
    let timeDur = player.querySelector('.progress__time-dur');


        progress.value = (video.currentTime / video.duration) * 100;

        let minutes = Math.floor(video.currentTime / 60);
        if (minutes < 10) {
            minutes = '0' + String(minutes);
        }

        let seconds = Math.floor(video.currentTime % 60);
        if (seconds < 10) {
            seconds = '0' + String(seconds);
    }
    let duration = Math.floor((video.duration / 60)) + ':' + ((video.duration % 60) < 10 ? '0' : '') + Math.floor((video.duration % 60));

    timeDur.innerHTML = `${duration}`;
        timeNow.innerHTML = `${minutes}:${seconds}`;
    
}

export function setProgress() {
    let player = document.querySelector('[data-player]');
    let video = player.querySelector('[data-player-video] video');
    let progress = document.querySelector('[data-player-progress] input[type="range"]');

    video.currentTime = (progress.value * video.duration) / 100;
    // video.play();

}