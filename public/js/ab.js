const speedDash = document.querySelector('.speedDash');
const scoreDash = document.querySelector('.scoreDash');
const lifeDash = document.querySelector('.lifeDash');
const container = document.getElementById('container');
const btnStart = document.querySelector('.btnStart');
const ctx = document.getElementById('ctx').getContext('2d');


let animationGame;
let gamePlay = false;
btnStart.addEventListener('click',startGame);
document.addEventListener('keydown',pressKeyOn);
document.addEventListener('keyup',pressKeyOff);

container.addEventListener('mousedown', mouseDown);
container.addEventListener('mousedoup', mouseUp); 

document.getElementById("ctx").onmousedown = function(e) {
    mouseDown(e);
}

document.getElementById("ctx").onmouseup = function(e) {
    mouseUp(e);
}
let player;
let keys = {
    ArrowUp:false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

function startGame() {
    let div = document.createElement('div');
    div.setAttribute('class','playerCar');
    btnStart.style.display = "none";
    player = {
        speed:1,
        lives:3,
        gameScore: 0,
        carstoPass: 10,
        score: 0,
        roadWidth: 250
    };

    div.x = 200;
    div.y = 450;
    container.appendChild(div); 
    gamePlay = true;
    animationGame = requestAnimationFrame(playGame);
  /*   startBoard();    
 */
}


function updateDash(){
    
    scoreDash.innerHTML = player.gameScore;
    speedDash.innerHTML = player.speed;
    lifeDash.innerHTML = player.lives;
}

function startBoard() {
    for(let x=0; x<13; x++) {
        let div = document.createElement('div');
        div.setAttribute('class','road');
        div.style.top = (x * 50)+'px';
        div.style.width = player.roadWidth + 'px';
        container.appendChild(div);  
    }

}
function pressKeyOn(ev) {
    ev.preventDefault();
    keys[ev.key] = true;
    console.log(`les prekeyOn---->${JSON.stringify(keys)}`);
}
function pressKeyOff(ev) {
    ev.preventDefault();
    keys[ev.key] = false;
    console.log(`les prekeyOff :${JSON.stringify(keys)}`);
    
}

function mouseUp(ev) {
    keys[ev.key] = true;
    ctx.fillStyle = 'green';
    ctx.fillRect(100,100,50,50)  
}

function mouseDown(ev) {
    keys[ev.key] = true;
    ctx.fillStyle = 'red';
    ctx.fillRect(100,100,50,50)  }


function playGame() {
    if(gamePlay) {
        updateDash();    
    }
    animationGame = requestAnimationFrame(playGame);
}