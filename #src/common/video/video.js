function videoHandler(videoBLock) {
	if(!videoBLock) return;
	let video = videoBLock.querySelector('.video__payer');
	let playBtn = videoBLock.querySelector('.video__play');
	let pauseBtn = videoBLock.querySelector('.video__pause');

	let playEventsCallback = [];
	let pauseEventsCallback = [];

	const togglePlayPause = (play) => {
		if(play) {
			video.play();
			video.setAttribute('controls', true)
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'block';

			if(playEventsCallback.length) {
				playEventsCallback.forEach(callback => {
					callback();
				})
			}
		} else {
			video.pause();
			video.removeAttribute('controls');
			playBtn.style.display = 'block';
			pauseBtn.style.display = 'none';

			if(pauseEventsCallback.length) {
				pauseEventsCallback.forEach(callback => {
					callback();
				})
			}
		}
	}

	video.addEventListener('ended', () => {
		togglePlayPause(false);
	});

	video.addEventListener('play', () => {
		togglePlayPause(true);
	});
	video.addEventListener('pause', () => {
		playBtn.style.display = 'block';
		pauseBtn.style.display = 'none';
	});

	videoBLock.addEventListener('mouseenter', (e) => { 
		if(!video.paused) {
			pauseBtn.style.opacity = '1';
		} 
	});
	videoBLock.addEventListener('mouseleave', (e) => { 
		if(!video.paused) {
			pauseBtn.style.opacity = '0';
		} 
	});

	playBtn.addEventListener('click', () => {
		togglePlayPause(true);
	})
	pauseBtn.addEventListener('click', () => {
		togglePlayPause(false);
	})

	return {
		block: videoBLock,
		play() {
			togglePlayPause(true);
		},
		pause() {
			togglePlayPause(false);
		},
		subscribe(string, callback) {
			if(string === 'play') {
				playEventsCallback.push(callback);
			} else if (string === 'pause') {
				pauseEventsCallback.push(callback);
			}
		}
	}

}