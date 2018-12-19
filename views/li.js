var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var start = window.mozAnimationStartTime;  // Only supported in FF. Other browsers can use something like Date.now().
var keys = {
    up: false,
    down: false,
    left: false,
    right: false
    };

var basket= {
    x: 0,
    y: 0,
    el: document.getElementById('basket')
};
var speed = 3;

document.addEventListener('keydown',pressOn);
document.addEventListener('keyup', pressOff); 
var ball = document.querySelector('.baddy'); 
var startBtn = document.querySelector('.startBtn'); 
    startBtn.addEventListener('click', startGame);
var animationRepeat ;
var gameOver = false;
var gameInPlay = false;
function update() {
    if(!gameOver){
        var bCurrent= basket.offseLeft;
        console.log(bCurrent);
    }
    
}
function startGame() {
    document.querySelector('.gameOver').style.display = 'none';
    ball.style.display = 'block';
    animationRepeat = requestAnimationFrame(update);
    gameOver = false;
    gameInPlay = true;  
// mouvement
}

function playGame(){

    if(keys.up) {
        basket.y += speed;
        }
    if (keys.down){
        basket.y -= speed;
        }
    
    if (keys.left){
        basket.x -= speed;
        }
    
    if (keys.right){
        basket.x += speed;
        }
    basket.el.style.left += basket.x + 'px';
    basket.el.style.bottom += basket.y + 'px';
}
    

function pressOn(ev) {
    ev.preventDefault();
    var k = ev.keyCode;
    if(k === 40) return keys.down = true;
    if(k === 38) return keys.up = true;    
    if(k === 37) return keys.left = true;    
    if(k === 39) return keys.right = true;    
}

function pressOff(ev) {
    ev.preventDefault();
    var k = ev.keyCode;
    if(k === 40) return keys.down = false;
    if(k === 38) return keys.up = false;    
    if(k === 37) return keys.left = false;    
    if(k === 39) return keys.right = false;    

}


