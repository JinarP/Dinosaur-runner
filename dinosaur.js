let score = 0;
const height = 18;
const length = 80;
let speed = 1200;
let dinosaur = [{i: height - 2, j: 30}];
let dinoLine = height - 2, dinoColumn = 30;
const grid = document.getElementById("grid");

generateBoard();
document.addEventListener("keyup", jump);
setInterval(moveObstacle, 200);
setInterval(createObstacle, speed);
setInterval(playTime, 500);

function playTime () {
    if (checkGameOver() === true) {
        return;
    }
    ++score;
    document.getElementById("score").innerText = score;
}
function generateBoard() {
    let cell = 0;
    for (let i = 0; i < height; ++i) {
        let line = grid.insertRow(i);
        for (let j = 0; j < length; ++j) {
            let element = line.insertCell(j);
            ++cell;
            if (i === height - 1) {
                element.style.background = "rgb(112,105,105)";
            }
        }
    }
    grid.rows[height - 2].cells[30].innerHTML = "🦏";
    grid.rows[height - 2].cells[49].innerHTML = "⛰️";
}

function jump() {
    if (checkGameOver() === true) {
        return;
    }
    dinosaur = [{i: height - 4, j: 30}];
    grid.rows[height - 2].cells[30].innerHTML = "";
    grid.rows[height - 4].cells[30].innerHTML = "🦏";
    dinoLine -= 2;
    setTimeout(moveDown, 600);
}

function moveDown () {
    dinosaur = [{i: height - 2, j: 30}];
    grid.rows[height - 4].cells[30].innerHTML ="";
    grid.rows[height - 2].cells[30].innerHTML = "🦏";
    dinosaur = [{i: height - 2, j: 30}];
    dinoLine += 2;
}

let obstacle = [{obstacleLine: height - 2, obstacleColumn: 49}];

function moveObstacle () {
    if (checkGameOver() === true) {
        return;
    }
    for (let i = 0; i < obstacle.length; ++i) {
        grid.rows[obstacle[i].obstacleLine].cells[obstacle[i].obstacleColumn].innerHTML = "";
        --obstacle[i].obstacleColumn;
        if (obstacle[i].obstacleColumn === 1) {
            obstacle.splice(i, 1);
        }
        grid.rows[obstacle[i].obstacleLine].cells[obstacle[i].obstacleColumn].innerHTML = "⛰️";
    }
}

function createObstacle () {
    const randomColumn = Math.floor(Math.random() * (80 - 50) + 50);
    if (!grid.rows[height - 2].cells[randomColumn - 1].classList.contains("obstacle")||grid.rows[height - 2].cells[randomColumn - 2].classList.contains("obstacle")) {
        obstacle.push({obstacleLine: height - 2, obstacleColumn: randomColumn});
    }
}
function checkGameOver() {
    if (grid.rows[dinoLine].cells[dinoColumn].innerHTML === "⛰️") {
        document.getElementById("message").innerText = "GAME OVER";
        return true;
    }
}