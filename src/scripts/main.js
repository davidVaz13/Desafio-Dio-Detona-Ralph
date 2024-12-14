const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    value:{
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity:1000,
        hitPosition:0,
        result:0,
        currentTime: 60,   
    },
};

function countDown() {
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    if(state.value.currentTime <= 0) {
        clearInterval(state.value.countDownTimerId);
        clearInterval(state.value.timerId);
        alert('Game Over! O seu Resultado foi: ' + state.value.result);
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.value.hitPosition = randomSquare.id;
}

function playSound() {
    let audio = new Audio('./src/audios/hit.m4a');
    audio.volume = 0.2;
    audio.play();
}

function moveEnemy() {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}


function addListenersHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', (event) => {
            if(event.target.id === state.value.hitPosition) {
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            }
        })
    })
}

function init() {
    moveEnemy();
    addListenersHitBox();
}

init();