const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 320;
document.body.appendChild(canvas);

const radius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballVisible = true;

const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 5;

const leftPaddleX = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let wPressed = false;
let sPressed = false;

const rightPaddleX = canvas.width - paddleWidth - 10;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let upPressed = false;
let downPressed = false;

let leftScore = 0;
let rightScore = 0;

const ballSpeed = 2;
let dx = ballSpeed;
let dy = ballSpeed;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

window.addEventListener("blur", releaseKeys);

function drawBall() {
    if (ballVisible) {
        ctx.beginPath();
        ctx.arc(ballX, ballY, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
}

function drawPaddle(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(leftScore, canvas.width / 4, 30);
    ctx.fillText(rightScore, (canvas.width / 4) * 3, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBall();
    drawPaddle(leftPaddleX, leftPaddleY);
    drawPaddle(rightPaddleX, rightPaddleY);
    ballMove();
    paddleMove();
}

function ballMove() {
    if (ballY - radius <= 0) {
        dy = Math.abs(dy);
    } else if (ballY + radius >= canvas.height) {
        dy = -Math.abs(dy);
    }

    if (dx < 0 && ballX - radius <= leftPaddleX + paddleWidth && ballX - radius >= leftPaddleX &&
        ballY + radius >= leftPaddleY && ballY - radius <= leftPaddleY + paddleHeight) {
        dx = -dx;
        ballX = leftPaddleX + paddleWidth + radius;
    }

    if (dx > 0 && ballX + radius >= rightPaddleX && ballX + radius <= rightPaddleX + paddleWidth &&
        ballY + radius >= rightPaddleY && ballY - radius <= rightPaddleY + paddleHeight) {
        dx = -dx;
        ballX = rightPaddleX - radius;
    }

    if (ballVisible && ballX + radius < 0) {
        rightScore++;
        ballVisible = false;
        setTimeout(restartGame, 1000);
    } else if (ballVisible && ballX - radius > canvas.width) {
        leftScore++;
        ballVisible = false;
        setTimeout(restartGame, 1000);
    }

    if (ballVisible) {
        ballX += dx;
        ballY += dy;
    }
}

function paddleMove() {
    if (wPressed) {
        leftPaddleY -= paddleSpeed;
    } else if (sPressed) {
        leftPaddleY += paddleSpeed;
    }

    if (upPressed) {
        rightPaddleY -= paddleSpeed;
    } else if (downPressed) {
        rightPaddleY += paddleSpeed;
    }

    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}

function keyDownHandler(e) {
    if (e.key === "w" || e.key === "W") {
        wPressed = true;
    } else if (e.key === "s" || e.key === "S") {
        sPressed = true;
    } else if (e.key === "ArrowUp") {
        upPressed = true;
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        downPressed = true;
        e.preventDefault();
    }
}

function keyUpHandler(e) {
    if (e.key === "w" || e.key === "W") {
        wPressed = false;
    } else if (e.key === "s" || e.key === "S") {
        sPressed = false;
    } else if (e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "ArrowDown") {
        downPressed = false;
    }
}

function releaseKeys() {
    wPressed = false;
    sPressed = false;
    upPressed = false;
    downPressed = false;
}

function restartGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    dx = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
    dy = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
    ballVisible = true;
}

setInterval(draw, 10);
