const canvas = document.getElementById("roulettecanvas");
const ctx = canvas.getContext("2d");
const width = 1920;
const height = 1000;
const fullcircle = Math.PI*2;
const baseSpinSpeed = fullcircle/740;
const accelTime = 194;
const magicNumber = 0.000145881;
const boardWidth = 1050;
const boardHeight = 250;
const boardTop = height/2+60;
const boardLeft = width/2-boardWidth/2;
let canSpin = true;
let credits = 1000;
let wheelRotationAngle = 0
let ballRotationAngle = 0;
let ballSpinSpeed = baseSpinSpeed;
let ballPos = 0;
let ballAccel = 0;
let mousePos = [];
let betAmt;
var placingChip = false;
const wheelAdjust = 61;
var boardCoords= [];
var chipCoords = [];

window.addEventListener('load', draw);
window.addEventListener('mousemove',getMousePos);
window.addEventListener('mousedown',placeChip);

function main() {
    document.getElementById("credits").innerHTML = "Credits: " + credits;
    createBoardCoords();
}

function draw() {
    ctx.fillStyle = 'teal';
    betAmt = document.getElementById("rouletteBetInput").value;
    ctx.fillRect(0,0,width,height);
    animateWheel();
    animateBall(ballPos);
    drawBoard();
    drawChips();
    animateChip();
    window.requestAnimationFrame(draw);
}

//Function chatGPT helped me make with the prompt: "How would I find the cursor position using canvasAPI?"
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect(); // Get canvas position & size
    const scaleX = canvas.width / rect.width;   // Scale factor for X
    const scaleY = canvas.height / rect.height; // Scale factor for Y
    
    // Adjust mouse position to be relative to the canvas size
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    mousePos = [x, y];
}

function spinWheel() {
    if (canSpin) {
        canSpin = false;
        ballAccel = (magicNumber+baseSpinSpeed/10)*2;
        setFrameTimeout(() => {
            let winner = Math.floor(Math.random() * 36);
            ballPos = winner
            console.log(winner);
            ballAccel *= -1;
            setFrameTimeout(() => {
                ballSpinSpeed = baseSpinSpeed;
                ballAccel = 0;
                canSpin = true;
                checkWin();
                document.getElementById("credits").innerHTML = "Credits: " + credits;
            }, accelTime-16);
        }, accelTime);
    }
}


function setFrameTimeout(callback, frameCount) { //Timeout Function similar to setTimeout, but using frames instead that ChatGPT made for me w/ the prompt: "can you make a function similar to setTimeout, but instead it counts frames?"
    let count = 0;
    function step() {
        if (count >= frameCount) {
            callback();
        } else {
            count++;
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


function makeWheel() {
    ctx.strokeStyle = 'white';
    for (let i = 0; i<37; i++) {
        if (i==0) {
            ctx.beginPath()
            ctx.fillStyle = 'green'
            ctx.moveTo(width/2,height/2 -200);
            ctx.arc(width/2,height/2 - 200,250,(fullcircle*i+wheelAdjust)/37,(fullcircle*(i+1)+wheelAdjust)/37);
            ctx.lineTo(width/2,height/2 - 200);
            ctx.fill();
        }
        else {
            ctx.beginPath()
            ctx.fillStyle = i%2 ? 'black' : 'red';
            ctx.moveTo(width/2,height/2 -200);
            ctx.arc(width/2,height/2 - 200,250,(fullcircle*i+wheelAdjust)/37,(fullcircle*(i+1)+wheelAdjust)/37);
            ctx.lineTo(width/2,height/2 - 200);
            ctx.fill();
        }
    }
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(width/2,height/2 - 200,75,0,fullcircle);
    ctx.fill();

}

function writeNums() {
    ctx.fillStyle = 'white';
    ctx.font = "bold 20px serif";
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(width/2,height/2-200);
    for (let i = 0; i<37; i++) {
        ctx.rotate(fullcircle/37);
        ctx.fillText(i,0,200);
    }
    ctx.restore();
}

function animateWheel() { //ChatGPT helped with wheel spinning via the prompt "how would i make it so the wheel spins smoothly", which I then adapted into this function
    ctx.save();
    ctx.translate(width/2,height/2-200);
    ctx.rotate(wheelRotationAngle);
    ctx.translate(-width/2,-(height/2-200));
    makeWheel();
    writeNums();
    ctx.restore();
    wheelRotationAngle += baseSpinSpeed;
}

function animateBall(ballNum) {
    ctx.save();
    ctx.translate(width/2,height/2-200);
    ctx.rotate(ballRotationAngle);
    ctx.translate(-width/2,-(height/2-200));
    drawBall(ballNum);
    ctx.restore();
    ballRotationAngle += ballSpinSpeed;
    ballSpinSpeed += ballAccel;
}

function drawBall(ballNum) {
    ctx.save();
    ctx.translate(width/2,height/2-200);
    ctx.fillStyle = 'white';
    ctx.rotate(fullcircle*(ballNum+1)/37);
    ctx.beginPath()
    ctx.arc(0,100,10,0,fullcircle);
    ctx.fill();
    ctx.restore();
}

function drawBoard() {
    ctx.fillStyle = 'black';
    ctx.fillRect(boardLeft,boardTop,boardWidth,boardHeight);
    //make numbers
    ctx.fillStyle = 'green';
    ctx.fillRect(boardLeft,boardTop,boardWidth/14,boardHeight);
    ctx.fillStyle = 'white'
    ctx.font = "bold 50px serif";
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle';
    ctx.fillText(0,boardLeft+boardWidth/28,boardTop+boardHeight/2);
    for (let i = 0; i<36; i++) {
        ctx.fillStyle = (i%2) ? 'red' : 'black';
        ctx.fillRect(boardLeft+(Math.floor(i/3)+1)*(boardWidth/14),boardTop+(boardHeight/3)*((3-i%3)-1),boardWidth/14,boardHeight/3);
        ctx.fillStyle = 'white'
        ctx.fillText(i+1,boardLeft+(Math.floor(i/3)+1)*(boardWidth/14)+boardWidth/28,boardTop+(boardHeight/3)*((3-i%3)-1)+boardHeight/6)
    }
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'teal';
        ctx.strokeStyle = 'black';
        ctx.fillRect(boardLeft+boardWidth*13/14,boardTop+(boardHeight/3)*i,boardWidth/14,boardHeight/3);
        ctx.strokeRect(boardLeft+boardWidth*13/14,boardTop+(boardHeight/3)*i,boardWidth/14,boardHeight/3);
        ctx.fillStyle = 'white';
        ctx.fillText('2-1',boardLeft+boardWidth*13.5/14,boardTop+(boardHeight/3)*i+boardHeight/6);
    }
    for (let i = 0; i <3; i++) {
        ctx.strokeRect(boardLeft+boardWidth/14+12*boardWidth/42*i,boardTop+boardHeight,12*boardWidth/42,boardHeight/3);
        if (i == 0) {
            ctx.fillText(`1st 12`,boardLeft+boardWidth/14+12*boardWidth/42*i+boardWidth/7,boardTop+7*boardHeight/6);
        }
        else if (i == 1) {
            ctx.fillText(`2nd 12`,boardLeft+boardWidth/14+12*boardWidth/42*i+boardWidth/7,boardTop+7*boardHeight/6);
        }
        else {
            ctx.fillText(`3rd 12`,boardLeft+boardWidth/14+12*boardWidth/42*i+boardWidth/7,boardTop+7*boardHeight/6);
        }
    }
    for (let i = 0; i < 6; i++) {
        ctx.strokeRect(boardLeft+boardWidth/6*i,boardTop+4*boardHeight/3,boardWidth/6,boardHeight/3);
        if (i==0){
            ctx.fillText(`1-18`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
        else if (i==1){
            ctx.fillText(`EVEN`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
        else if (i==2){
            ctx.fillStyle = 'red';
            ctx.fillText(`RED`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
        else if (i==3){
            ctx.fillStyle = 'black';
            ctx.fillText(`BLK`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
        else if (i==4){
            ctx.fillStyle = 'white';
            ctx.fillText(`ODD`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
        else {
            ctx.fillText(`18-36`,boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6);
        }
    }
}


function addChip() {
    placingChip = !placingChip;
}

function animateChip() {
    if (placingChip && betAmt > 0 && betAmt <= credits) {
        ctx.beginPath();
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.arc(mousePos[0],mousePos[1],25,0,fullcircle);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(mousePos[0],mousePos[1],20,0,fullcircle);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center'
        ctx.font = "bold 20px serif";
        ctx.textBaseline = 'middle';
        ctx.fillText(betAmt,mousePos[0],mousePos[1],40);
    }   
}

function placeChip() {
    if (placingChip && (betAmt > 0 && betAmt <= credits)) {
        for (let coord of boardCoords) {
            let index = boardCoords.indexOf(coord);
            let coordDiff = [coord[0]-mousePos[0], coord[1] - mousePos[1]];
            let chip = coord;
            if (index == 0) {
                if (Math.abs(coordDiff[0]) < boardWidth/28 && Math.abs(coordDiff[1]) < boardHeight/2) {
                    chip.push(betAmt);
                    chip.push(index);
                    chipCoords.push(chip);
                    placingChip = false;
                    break;
                }  
            }
            else if (index < 40) {
                if (Math.abs(coordDiff[0]) < boardWidth/28 && Math.abs(coordDiff[1]) < boardHeight/6) {
                    chip.push(betAmt);
                    chip.push(index);
                    chipCoords.push(chip);
                    placingChip = false;
                    break;
                }  
            }
            else if (index < 43) {
                if (Math.abs(coordDiff[0]) < boardWidth/7 && Math.abs(coordDiff[1]) < boardHeight/6) {
                    chip.push(betAmt);
                    chip.push(index);
                    chipCoords.push(chip);
                    placingChip = false;
                    break;
                }  
            }
            else {
                if (Math.abs(coordDiff[0]) < boardWidth/12 && Math.abs(coordDiff[1]) < boardHeight/6) {
                    chip.push(betAmt);
                    chip.push(index);
                    chipCoords.push(chip);
                    placingChip = false;
                    break;
                }  
            }
        }
    }
}

function drawChips() {
    for (let coord of chipCoords) {
        ctx.beginPath();
        ctx.fillStyle = '#87CEEB';
        ctx.beginPath();
        ctx.arc(coord[0],coord[1],25,0,fullcircle);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(coord[0],coord[1],20,0,fullcircle);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center'
        ctx.font = "bold 20px serif";
        ctx.textBaseline = 'middle';
        ctx.fillText(coord[2],coord[0],coord[1],40);
    }
}

function createBoardCoords() {
    boardCoords[0] = [boardLeft+boardWidth/28,boardTop+boardHeight/2];
    for (let i = 0; i<36; i++) {
        boardCoords[i+1] = [boardLeft+(Math.floor(i/3)+1)*(boardWidth/14)+boardWidth/28,boardTop+(boardHeight/3)*((3-i%3)-1)+boardHeight/6];
    }
    for (let i = 0; i < 3; i++) {
        boardCoords[i+37] = [boardLeft+boardWidth*13.5/14,boardTop+(boardHeight/3)*i+boardHeight/6];
    }
    for (let i = 0; i <3; i++) {
        boardCoords[i+40] = [boardLeft+boardWidth/14+12*boardWidth/42*i+boardWidth/7,boardTop+7*boardHeight/6];
    }
    for (let i = 0; i < 6; i++) {
        boardCoords[i+43] = [boardLeft+boardWidth/6*i+boardWidth/12,boardTop+9*boardHeight/6];
    }
}

function checkWin() {
    for (let chip of chipCoords) {
        let chipVal = Number(chip[2]);
        let chipNum = chip[3];
        if (chipNum < 37 && ballPos == chipNum) {
            credits += chipVal*36;
        }
        else if (chipNum < 40 && ballPos%3 == chipNum-36 && ballPos != 0) {
            credits += chipVal*2;
        }
        else if (chipNum < 43 && Math.ceil(ballPos/12) == chipNum-39 && ballPos != 0) {
            credits += chipVal*2;
        }
        else if ((chipNum == 43 || chipNum == 48) && Math.ceil(ballPos/18) == chipNum%2 && ballPos != 0) {
            credits += chipVal;
        }
        else if ((chipNum == 44 || chipNum == 47) && ballPos%2 == chipNum%2 && ballPos != 0) {
            credits += chipVal;
        }
        else if ((chipNum == 45 || chipNum == 46) && ballPos%2 == (chipNum+1)%2  && ballPos != 0) {
            credits += chipVal;
        }
        else {
            credits -= chipVal;
            console.log(chipNum);
        }
    }
}

function clearChips() {
    chipCoords = [];
}