const snakeImg = new Image();
snakeImg.src = "./assets/images/snake.png";

const foodImg = new Image();
foodImg.src = "./assets/images/food.jpg";

const bgImg = new Image();
bgImg.src = "./assets/images/bg.png";

import {
    CELL_SIZE,
    GRID_SIZE,
    CANVAS_SIZE,
    GAME_SPEED
}
from "./config.js";

import Snake from "./snake.js";
import Food from "./food.js";

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let snake;
let food;

let score = 0;

let gameLoop = null;

let paused = false;

const scoreEl =
document.getElementById("score");

const finalScoreEl =
document.getElementById("finalScore");

const bestScoreEl =
document.getElementById("bestScore");

let bestScore =
localStorage.getItem("snakeBest") || 0;

bestScoreEl.textContent = bestScore;

function startGame(){

    snake = new Snake();

    food = new Food(GRID_SIZE);

    score = 0;

    scoreEl.textContent = score;

    document.getElementById("menu")
        .style.display = "none";

    document.getElementById("gameOver")
        .style.display = "none";

    document.getElementById("gameContainer")
        .style.display = "block";

    clearInterval(gameLoop);

    gameLoop =
    setInterval(update,GAME_SPEED);
}

function update(){

    if(paused) return;

    snake.move();

    const head = snake.body[0];

    if(
        head.x === food.x &&
        head.y === food.y
    ){

        score++;

        scoreEl.textContent = score;

        food.randomize();

    }else{

        snake.removeTail();
    }

    if(
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
    ){
        endGame();
    }

    for(let i=1;i<snake.body.length;i++){

        if(
            head.x === snake.body[i].x &&
            head.y === snake.body[i].y
        ){
            endGame();
        }
    }

    draw();
}

function draw(){

    ctx.drawImage(
    bgImg,
    0,
    0,
    canvas.width,
    canvas.height
    );

    ctx.drawImage(
    foodImg,
    food.x * CELL_SIZE,
    food.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
    );  

    snake.body.forEach(part => {

    ctx.drawImage(
        snakeImg,
        part.x * CELL_SIZE,
        part.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
    );

    });
}

function endGame(){

    clearInterval(gameLoop);

    if(score > bestScore){

        bestScore = score;

        localStorage.setItem(
            "snakeBest",
            bestScore
        );

        bestScoreEl.textContent =
            bestScore;
    }

    finalScoreEl.textContent = score;

    document.getElementById("gameContainer")
        .style.display = "none";

    document.getElementById("gameOver")
        .style.display = "block";
}

document.addEventListener(
    "keydown",
    e=>{

        switch(e.key){

            case "ArrowUp":
                snake.setDirection(0,-1);
                break;

            case "ArrowDown":
                snake.setDirection(0,1);
                break;

            case "ArrowLeft":
                snake.setDirection(-1,0);
                break;

            case "ArrowRight":
                snake.setDirection(1,0);
                break;
        }
    }
);

document.getElementById("up")
.onclick =
()=>snake?.setDirection(0,-1);

document.getElementById("down")
.onclick =
()=>snake?.setDirection(0,1);

document.getElementById("left")
.onclick =
()=>snake?.setDirection(-1,0);

document.getElementById("right")
.onclick =
()=>snake?.setDirection(1,0);

document.getElementById("pauseBtn")
.onclick =
()=>paused = !paused;

document.getElementById("startBtn")
.onclick =
startGame;

document.getElementById("restartBtn")
.onclick =
startGame;