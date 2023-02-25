
const grid = document.querySelector('.grid') //queryselector looks for ids,classes etc
const result = document.querySelector('.result')
let score = 0

const blockWidth = 100
const blockHeight = 20
const boardWidth = 570
const boardHeight = 300
//const negate = 
const userStart = [270, 10]
let currentPosition = userStart
userWidth = 100
//ball position
const ballStart = [310, 60]
let currentBallPos = ballStart
const ballDiameter = 20

let xDirection = 2
let yDirection = -2

//timer 
let timerId
//create block individual
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
 
const blocks = [
    new Block (10, 270),
    new Block (120, 270),
    new Block (230, 270),
    new Block (340, 270),
    new Block (460, 270),

    new Block (10, 240),
    new Block (120, 240),
    new Block (230, 240),
    new Block (340, 240),
    new Block (460, 240),

    new Block (10, 210),
    new Block (120, 210),
    new Block (230, 210),
    new Block (340, 210),
    new Block (460, 210),

    // new Block (250, -140),
    // new Block (250, 20),
    // new Block (250, 20),
    // new Block (250, 20),

    // new Block (360, -140),
    // new Block (360, 20),
    // new Block (360, 20),
    // new Block (360, 20),

    // new Block (470, -140),
    // new Block (470, 20),
    // new Block (470, 20),
    // new Block (470, 20),   
]

//draw my block
function addBlocks() {
    
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block') 
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block) //adding the block to the grid
    }
}
addBlocks()

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser() {
    user.style.left = currentPosition[0] +"px"
    user.style.bottom = currentPosition[1] + 'px'
}
function drawBall() {
    ball.style.left = currentBallPos[0] +"px"
    ball.style.bottom = currentBallPos[1] + 'px'
}


function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - userWidth) {
                currentPosition[0] += 10
                drawUser()  
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)
document.addEventListener('keyup', moveUser)


//my ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function movBall() {
    currentBallPos[0] += xDirection
    currentBallPos[1] -= yDirection
    drawBall()
    collision_all_blocks()
    checkForCols()
    
}
timerId = setInterval(movBall, 30)

//check for collisions

function checkForCols() {
    //check for wall colls
    if (currentBallPos[1] >=  boardHeight - ballDiameter
        || currentBallPos[0]  >= (boardWidth - ballDiameter)
        || currentBallPos[0] <= 0) {
        changeDirection()
    }
    if (currentBallPos[1] <=  0) {
         clearInterval(timerId)
         result.innerHTML = 'You Lose'
         document.removeEventListener('keydown',moveUser)
         document.removeEventListener('keyup',moveUser)
    }
    
     
    //collisions with user 
    if (currentBallPos[1]-ballDiameter <= currentPosition[1] && 
        currentBallPos[0] >= currentPosition[0] 
        && currentBallPos[0] <= currentPosition[0]+100) {
        changeDirection()
    }
}//nomin@clc.co.za
 
function changeDirection() {
    //top side of block
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }//right side of block
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    //  
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    // //for top again side
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
         
        return
    }
    
}
function changeDirection2() {
         
        xDirection = 2
        return
    }

// //restart
// function restartGame() {
//     //ball
//     currentBallPos[0] = ballStart[0]
//     currentBallPos[1] = ballStart[1]

//     //user
//     currentPosition[0] = userStart[0]
//     currentPosition[1] = userStart[1]
// }

//collisions of all blocks 
function collision_all_blocks() {
    for (let i = 0; i < blocks.length; i++) {
        if ((currentBallPos[0] > blocks[i].bottomLeft[0] 
            &&  currentBallPos[0] < blocks[i].bottomRight[0])
            && (currentBallPos[1] + ballDiameter) > blocks[i].bottomLeft[1] 
            && currentBallPos[1] < blocks[i].topLeft[1]) {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i,1)
                changeDirection()
                score += 1
                result.innerHTML = score
                if (score === 15) {
                    
                    clearInterval(timerId)
                    result.innerHTML = "YOU WIN!!"
                    document.removeEventListener('keydown',moveUser)
                    document.removeEventListener('keyup',moveUser)
                }
            }
         
        
    }
}

