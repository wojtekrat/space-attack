//settings
let speed = 600

infoBtn = document.getElementById("info"),
newBtn = document.getElementById("newGameButton")
newBtn.addEventListener("click", createNewGame)
resumeBtn = document.getElementById("resumeButton")
grid=document.querySelector('.grid')
gridActivate=document.getElementById('grid-activate')
resultsDisplay=document.getElementById("result")
scoreDisplay=document.getElementById("score")
overlayStart=document.getElementById("overlay-start")
overlayStart.addEventListener('click', createNewGame)
overlayInfo=document.getElementById("overlay-info")
showResults = document.getElementById("results")
boardBG = document.getElementById('boardBg')

mobileMenuShoot = document.getElementById("mobile-shoot")

mobileMenuUp = document.getElementById("arrowUp")
mobileMenuLeft = document.getElementById("arrowLeft")
mobileMenuRight = document.getElementById("arrowRight")
mobileMenuDown = document.getElementById("arrowDown")

function createNewGame() {
    
    x = newGame(speed)
}

//game constructor
function newGame(speed) {
    alienInvaders=[0,1,2,3,4,5,6,7,8,9,30,31,32,33,34,35,36,37,38,39,60,61,62,63,64,65,66,67,68,69]
    aliensRemoved=[]
    isDead=false
    results=0
    lives=1
    direction=1
    goingRight=true
    currentShooterIndex=217
    width=15

    firstDiv=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    lastDiv=[210,211,212,213,214,215,216,217,218,219,220,221,222,223,224]
    rightBorder=[14,29,44,59,74,89,104,119,134,149,164,179,194,209]
    leftBorder=[0,15,30,45,60,75,90,105,120,135,150,165,180,195]

    resultsDisplay.innerHTML=lives
    scoreDisplay.innerHTML=results
    gridActivate.innerHTML=''
    gridActivate.style.display="flex"
    overlayStart.style.display="none"
    infoBtn.style.display="flex"
    overlayInfo.style.display="none"
    showResults.style.display = "flex"
    boardBG.style.display = "flex"

    infoBtn.addEventListener("click", info)
    resumeBtn.addEventListener("click", resumeGame)
    

    for(let i=0;i<225;i++) {
        square=document.createElement('div')
        grid.appendChild(square)
    }
        
    squares=Array.from(document.querySelectorAll('.grid div'))

    for (let i = 0;i<225;i++) {
        if (squares[i].classList.contains('laser', 'shooter', 'invader', 'boom')) {
            squares[i].classList.add('normal')
        }
    }
    document.addEventListener('keydown',shoot)
    document.addEventListener('keydown',moveShooter)
    squares[currentShooterIndex].classList.add('shooter')
    drawInvaders()
    invadersId=window.setInterval(moveInvaders,speed)
    }

    function info() {
        gridActivate.style.display="none"
        overlayInfo.style.display="flex"
        infoBtn.style.display="none"
        overlayStart.style.display="none"
        clearInterval(invadersId)
        showResults.style.display = "none"
        boardBG.style.display = "none"
        }

    function resumeGame() {
        overlayInfo.style.display="none"
        overlayStart.style.display="none"
        infoBtn.style.display="flex"
        gridActivate.style.display="flex"
        invadersId=window.setInterval(moveInvaders,speed)
        showResults.style.display = "flex"
        boardBG.style.display = "flex"
        }

    function gameOver() {
        isDead=true
        overlayStart.style.display="flex"
        overlayStart.innerHTML="<p>GAME OVER</p>"
        overlayInfo.style.display="none"
        gridActivate.style.display="none"
        gridActivate.innerHTML=''
        infoBtn.style.display="none"
        showResults.style.display = "none"
        boardBG.style.display = "none"
        clearInterval(invadersId)
        alienInvaders=[0,1,2,3,4,5,6,7,8,9,30,31,32,33,34,35,36,37,38,39,60,61,62,63,64,65,66,67,68,69]
        aliensRemoved=[]
        isDead=false
        results=0
        lives=1
        direction=1
        goingRight=true
        currentShooterIndex=217
        width=15    
        }

    function shoot(e) {
        let laserId
        let currentLaserIndex=currentShooterIndex
        function moveLaser() {
            function isFirstDiv() {
                for(let i=0;i<firstDiv.length;i++) {
                    if(currentLaserIndex===firstDiv[i]) {
                        squares[currentLaserIndex].classList.remove('laser')
                        return true
                    }
                }
                return false
            }
            var isFirst=isFirstDiv()

            if(currentLaserIndex>=0&&currentLaserIndex<=224&&isDead==false&&isFirst==false) {
                if(squares[currentLaserIndex].classList.contains('laser')) {
                    squares[currentLaserIndex].classList.remove('laser')
                }

                currentLaserIndex-=width
                squares[currentLaserIndex].classList.add('laser')
                if(squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser')
                    squares[currentLaserIndex].classList.remove('invader')
                    squares[currentLaserIndex].classList.add('boom')

                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'),260)

                    for(i=0;i<alienInvaders.length;i++) {
                        if(alienInvaders[i]===currentLaserIndex) {
                            alienInvaders.splice(i,1)
                        }
                    }

                    const alienRemoved=alienInvaders.indexOf(currentLaserIndex)
                    aliensRemoved.push(alienRemoved)
                    clearInterval(laserId)

                    results++
                    scoreDisplay.innerHTML=results

                }
            }
        }
            switch(e.key) {
                case " ":
                    laserId=setInterval(moveLaser,100)
            }
            mobileMenuShoot.addEventListener("click", laserId)
        }

    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        if(isDead==false) {
            if(currentShooterIndex>=0&&currentShooterIndex<225) {
                switch(e.key) {
                    case 'ArrowLeft':
                        if(currentShooterIndex%width!==0)
                            currentShooterIndex-=1
                        break
                    case 'ArrowRight':
                        if(currentShooterIndex%width<width-1)
                            currentShooterIndex+=1
                        break
                    case 'ArrowUp':
                        if(currentShooterIndex<225&&currentShooterIndex>=15)
                            currentShooterIndex-=15
                        break
                    case 'ArrowDown':
                        if(currentShooterIndex<=209&&currentShooterIndex>=0)
                            currentShooterIndex+=15
                        break
                }
                squares[currentShooterIndex].classList.add('shooter')
            }
        }
    }

    function drawInvaders() {
        for(let i=0;i<alienInvaders.length;i++) {
            if(!aliensRemoved.includes(i)) {
                squares[alienInvaders[i]].classList.add('invader')
            }
        }
    }

    function removeInvaders() {
        for(let i=0;i<alienInvaders.length;i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
    }


    function moveInvaders() {
        let aliens = alienInvaders
        let left = leftBorder
        let right = rightBorder
            
        function isBorderLeft() {
            for(let i=0;i<aliens.length;i++) {
                for(let j=0;j<left.length;j++) {
                    if(aliens[i]===left[j]) {
                        return true
                    }
                }
            }
            return false
        }
    
        function isBorderRight() {
            for(let i=0;i<aliens.length;i++) {
                for(let j=0;j<right.length;j++) {
                    if(aliens[i]===right[j]) {
                        return true
                    }
                }
            }
            return false
        }
        var leftEdge=isBorderLeft()
        var rightEdge=isBorderRight()
        removeInvaders()

        if(rightEdge&&goingRight) {
            for(let i=0;i<alienInvaders.length;i++){
                alienInvaders[i]+=width+1
            direction=-1
            goingRight=false
            }
        }

        if(leftEdge&&!goingRight) {
            for(let i=0;i<alienInvaders.length;i++) {
                alienInvaders[i]+=width
            direction=1
            goingRight=true
            }
        }

        for(let i=0;i<alienInvaders.length;i++) {
            alienInvaders[i]+=direction
        }

        drawInvaders()

        if(squares[currentShooterIndex].classList.contains('invader','shooter')) {
            squares[currentShooterIndex].classList.add('boom')
            lives-=1
            resultsDisplay.innerHTML=lives
            gameOver()
        }

        for(i=0;i<lastDiv.length;i++) {
            if(squares[lastDiv[i]].classList.contains('invader')) {
                squares[lastDiv[i]].classList.add('boom')
                lives-=1
                resultsDisplay.innerHTML=lives
                gameOver()
            }
        }

        if(results===30) {
            gameOver()
            overlayStart.innerHTML="<p>YOU WIN</p>";
        }
    }



