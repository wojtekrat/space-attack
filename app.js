const grid = document.querySelector('.grid')
const gridActivate = document.getElementById('grid-activate')
const resultsDisplay = document.getElementById("result")
const scoreDisplay = document.getElementById("score")
const startBtn = document.getElementById("start")
startBtn.addEventListener("click", startGame)
const infoBtn = document.getElementById("info")
infoBtn.addEventListener("click", info)
const newBtn = document.getElementById("newGameButton")
newBtn.addEventListener("click", newGame)
const newBtn1 = document.getElementById("new")
newBtn1.addEventListener("click", newGame)
const resumeBtn = document.getElementById("resumeButton")
resumeBtn.addEventListener("click", resumeGame)
const overlayStart = document.getElementById("overlay-start")
const overlayInfo = document.getElementById("overlay-info")
let currentShooterIndex = 217
let width = 15
let direction = 1
let goingRight = true
let results = 0
let lives = 1
aliensRemoved = []
var isDead = false
var alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    30,31,32,33,34,35,36,37,38,39,
    60,61,62,63,64,65,66,67,68,69
]

const lastDiv = [210,211,212,213,214,215,216,217,218,219,220,221,222,223,224]
const rightBorder = [14,29,44,59,74,89,104,119,134,149,164,179,194,209]
const leftBorder = [0,15,30,45,60,75,90,105,120,135,150,165,180,195]

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

function startGame() {
    gridActivate.style.display = "flex"
    overlayStart.style.display = "none"
    startBtn.style.display = "none"
    infoBtn.style.display = "flex"
    spaceInvaders()
}

function info(laserId) {
    gridActivate.style.display = "none"
    overlayInfo.style.display = "flex"
    infoBtn.style.display = "none"
    overlayStart.style.display = "none"
    clearInterval(laserId)
    clearInterval(invadersId)
}

function resumeGame() {
    overlayInfo.style.display = "none"
    overlayStart.style.display = "none"
    infoBtn.style.display = "flex"
    gridActivate.style.display = "flex"
    spaceInvaders()
}

function newGame() {
    location.reload()
}


function spaceInvaders() {
    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    }
    draw()
    
    function clearBoard() {
        for (i=0; i < 225; i++) {
            squares[i].classList.remove('laser')
            squares[i].classList.remove('shooter')
        }
    }
    
    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
    }
    
    squares[currentShooterIndex].classList.add('shooter')
    
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        if (isDead == false){
            if (currentShooterIndex >= 0 && currentShooterIndex < 225) {
                switch(e.key) {
                    case 'ArrowLeft':
                        if (currentShooterIndex % width !== 0) currentShooterIndex -=1
                        break
                    case 'ArrowRight':
                        if (currentShooterIndex % width < width -1) currentShooterIndex +=1
                        break
                    case 'ArrowUp':
                        if (currentShooterIndex < 225 && currentShooterIndex >= 15)
                        currentShooterIndex -=15
                        break
                    case 'ArrowDown':
                        if (currentShooterIndex <= 209 && currentShooterIndex >= 0)
                        currentShooterIndex +=15
                        break
                    
                }
                squares[currentShooterIndex].classList.add('shooter')
            }
        }
        
        
    }
    document.addEventListener('keydown', moveShooter)
    
    function moveInvaders() {
        const leftEdge = isBorderLeft()
        const rightEdge = isBorderRight() 
        remove()
    
        function isBorderLeft() {
            for (let i = 0; i < alienInvaders.length; i++) {
                for (let j = 0; j < leftBorder.length; j++){
                    if (alienInvaders[i] === leftBorder[j]) {
                        return true;
                    }
                }
            }
            return false;
        }
    
        function isBorderRight() {
            for (let i = 0; i < alienInvaders.length; i++) {
                for (let j = 0; j < rightBorder.length; j++){
                    if (alienInvaders[i] === rightBorder[j]) {
                        return true;
                    }
                }
            }
            return false;
        }
    
        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++)
                alienInvaders[i] += width +1
                direction = -1
                goingRight = false
        }
    
        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width
                direction = 1
                goingRight = true
    
            }
        }
    
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }
    
        draw()
    
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            lives -= 1
            resultsDisplay.innerHTML = lives
            squares[currentShooterIndex].classList.add('boom')
            clearBoard()
            isDead = true
            overlayStart.style.display = "flex"
            overlayStart.innerHTML = "<p>GAME OVER</p>"
            gridActivate.style.display = "none"
            infoBtn.style.display = "none"
            startBtn.style.display = "none"
            newBtn1.style.display = "flex"
            clearInterval(invadersId)
            
        }
    
        for (i=0; i < lastDiv.length; i++) {
            if(squares[lastDiv[i]].classList.contains('invader')) {
                squares[lastDiv[i]].classList.add('boom')
                lives -= 1
                resultsDisplay.innerHTML = lives
                clearBoard()
                isDead = true
                overlayStart.style.display = "flex"
                overlayStart.innerHTML = "<p>GAME OVER</p>"
                gridActivate.style.display = "none"
                infoBtn.style.display = "none"
                startBtn.style.display = "none"
                newBtn1.style.display = "flex"
                clearInterval(invadersId)
            }
        }
    
        if (alienInvaders.length === 0) {
            isDead = true
            clearBoard()
            overlayStart.style.display = "flex"
            overlayStart.innerHTML = "<p>YOU WIN</p>"
            gridActivate.style.display = "none"
            newBtn1.style.display = "flex"
            infoBtn.style.display = "none"
            startBtn.style.display = "none"
            clearInterval(invadersId)
        }
    }
    invadersId = setInterval(moveInvaders, 200)

    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        function moveLaser() {
            if (currentLaserIndex >= 0 && currentLaserIndex <=224 && isDead == false) {
                squares[currentLaserIndex].classList.remove('laser')
                currentLaserIndex -= width
                squares[currentLaserIndex].classList.add('laser')  
                if (squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser')
                    squares[currentLaserIndex].classList.remove('invader')
                    squares[currentLaserIndex].classList.add('boom')
    
                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
                    
                    for (i = 0; i < alienInvaders.length; i++) {
                        if (alienInvaders[i] === currentLaserIndex) {
                            alienInvaders.splice(i, 1)
                        }
                    }
    
                    const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                    aliensRemoved.push(alienRemoved)
                    clearInterval(laserId)
                    
                    results ++
                    scoreDisplay.innerHTML = results
                
            }
        }
            }
            switch(e.key) {
                case 'Control':
                laserId = setInterval(moveLaser, 100)
        }
        
    }
    document.addEventListener('keydown', shoot)
}