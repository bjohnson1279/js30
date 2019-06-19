// Get Elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullButtons = player.querySelectorAll('[data-full]');
console.log(fullButtons);

// Build Functions
const togglePlay = () => {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    
};

const updateButton = () => {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const pct = (video.currnetTime / video.duration) * 100;
    progressBar.getElementsByClassName.flexBasis = `${pct}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

const enterFullScreen = (vid) => {
    try {
        console.log('enterFullScreen', vid);
        if (vid.requestFullScreen)
            vid.requestFullScreen().catch( (error) => {
                console.error(`Error attempting to enable full-screen mode: ${error.messsage} (${error.name})`);
            });
        else if (vid.mozRequestFullScreen)
            vid.mozRequestFullScreen().catch( (error) => {
                console.error(`Error attempting to enable full-screen mode: ${error.messsage} (${error.name})`);
            });
        else if (vid.webkitRequestFullScreen)
            vid.webkitRequestFullScreen().catch( (error) => {
                console.error(`Error attempting to enable full-screen mode: ${error.messsage} (${error.name})`);
            });
        else if (vid.msRequestFullScreen)
            vid.msRequestFullScreen().catch( (error) => {
                console.error(`Error attempting to enable full-screen mode: ${error.messsage} (${error.name})`);
            });
    } catch (error) {
        console.error(error);
    }
}

const endFullScreen = () => {
    try {
        console.log('endFullScreen');
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
        else if (document.webkitExitFullScreen)
            document.webkitExitFullScreen();
        else if (document.msExitFullScreen)
            document.msExitFullScreen();
    } catch (error) {
        console.error(error);
    }
}

const checkFullScreen = () => {
    console.log('checkFullScreen');
    return document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullScreenEnabled || null;
}

const isFullScreenEnabled = () => {
    return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.msFullscreenEnabled || null;
}

// Hook Up Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach( (button) => button.addEventListener('click', skip));
ranges.forEach( (range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach( (range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e) );
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullButtons.forEach( (fullButton) => fullButton.addEventListener('click', (e) => {
    console.dir(fullButton);
    console.dir(video);
    let enabledFullScreen = isFullScreenEnabled();
    console.log({enabledFullScreen});

    if (enabledFullScreen) {
        let isFullScreen = checkFullScreen();
        console.log({isFullScreen});

        if (!isFullScreen)
            enterFullScreen(video);
        else if (isFullScreen)
            endFullScreen();

        console.log({isFullScreen});
    }
}));

video.addEventListener('onfullscreenchange', (e) => {
    console.log({e});
});