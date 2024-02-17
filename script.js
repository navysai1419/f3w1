let timers = [];

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert('Please enter a valid time.');
        return;
    }

    const timer = {
        totalSeconds,
        intervalId: setInterval(() => {
            if (timer.totalSeconds <= 0) {
                clearInterval(timer.intervalId);
                timerElement.classList.add('timer-ended');
                timerElement.remove();
                playAlertSound();
                return;
            }

            timerElement.textContent = formatTime(timer.totalSeconds);
            timer.totalSeconds--;
        }, 1000)
    };

    timers.push(timer);
    const timerElement = document.createElement('div');
    timerElement.classList.add('active-timer');
    document.getElementById('activeTimers').appendChild(timerElement);

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Timer';
    stopButton.onclick = () => stopTimer(timer);

    timerElement.appendChild(stopButton);

    function stopTimer(timer) {
        clearInterval(timer.intervalId);
        timerElement.remove();
        timers = timers.filter(t => t !== timer);
    }
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAlertSound() {
    const audio = new Audio('buzzer.mp3'); 
    audio.play();
    const timeUpDisplay = document.createElement('div');
    timeUpDisplay.textContent = 'Time is UP!';
    timeUpDisplay.style.position = 'fixed';
    
    timeUpDisplay.style.left = '50%';
    timeUpDisplay.style.transform = 'translate(-50%, -50%)';
    timeUpDisplay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'; 

    timeUpDisplay.style.color = 'white';
    timeUpDisplay.style.fontWeight = 'bold';
    timeUpDisplay.style.fontSize = '24px';
    timeUpDisplay.style.zIndex = '9999'; 
    document.body.appendChild(timeUpDisplay);

    setTimeout(() => {
        timeUpDisplay.remove();
    }, 5000);
}

