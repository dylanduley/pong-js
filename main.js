const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
document.body.appendChild(canvas);

const radius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVisible = true;

const paddleWidth = 100;
const paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;
let rightPressed = false;
let leftPressed = false;

const ballSpeed = 2;
let dx = ballSpeed;
let dy = ballSpeed;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBall() {
    if (ballVisible) {
        ctx.beginPath();
        ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    ballMove();
    paddleMove();
}

function ballMove() {
    const paddleXEnd = paddleX + paddleWidth;

    if (ballX + radius >= canvas.width || ballX - radius <= 0) {
        dx = -dx;
    }

    if (ballY - radius <= 0) {
        dy = -dy;
    }

    if (ballY + radius >= paddleY && ballY + radius <= paddleY + paddleHeight &&
        ballX >= paddleX && ballX <= paddleXEnd) {
        dy = -dy;
        ballY = paddleY - radius; 
    }

    if (ballY + radius > canvas.height) {
        ballVisible = false;
        setTimeout(restartGame, 1000);
    }

    if (ballVisible) {
        ballX += dx;
        ballY += dy;
    }
}

function paddleMove() {
    if (rightPressed) {
        paddleX += 5;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 5;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

function keyDownHandler(e) {
    if (e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function restartGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    dx = ballSpeed;
    dy = ballSpeed;
    ballVisible = true;
}

setInterval(draw, 10);
