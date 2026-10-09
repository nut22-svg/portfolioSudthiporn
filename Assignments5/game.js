// =============================================================================
// MDT312 Assignment 7 - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

window.onload = pageLoad;
let timer = null;

function pageLoad(){
    const startBtn = document.getElementById("start");
    startBtn.onclick = startGame;

    const gameLayer = document.getElementById("layer");
    gameLayer.onclick = function(event) {
        if (event.target.classList.contains("square")) {
            event.target.remove();
        }
    };
}

function startGame(){
    alert("Ready");
    clearScreen(); 
    addBox();      
    timeStart();   
}

function timeStart(){
    const TIMER_TICK = 1000;

    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }

    const min = 0.1; 
    let second = min * 60; 
    const clockDisplay = document.getElementById('clock');
    clockDisplay.textContent = second;
    
    timer = setInterval(timeCount, TIMER_TICK);
    
    function timeCount(){
        const allbox = document.querySelectorAll("#layer div");
        
        // 1. ชนะทันทีเมื่อกล่องหมด
        if (allbox.length === 0) {
            clearInterval(timer);
            timer = null;
            clearScreen();
            alert("You win!");
            return;
        }

        // 2. แพ้เมื่อเวลาหมด
        if (second <= 0) {
            clearInterval(timer);
            timer = null;
            clearScreen();
            alert("Game over");
            return;
        }

        // 3. ลดเวลาลงเรื่อยๆ
        second--;
        clockDisplay.textContent = second;
    }
}

function addBox(){
    const numboxInput = document.getElementById("numbox");
    const numbox = parseInt(numboxInput.value) || 0;
    const gameLayer = document.getElementById("layer");
    const colorDrop = document.getElementById("color").value;
    
    for (let i = 0; i < numbox; i++){
        const tempbox = document.createElement("div"); 
        tempbox.className = "square " + colorDrop;
        tempbox.id = "box" + i;

        tempbox.style.left = Math.random() * (500 - 25) + "px";
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        
        gameLayer.appendChild(tempbox);
    }

    numboxInput.value = "";
}

function clearScreen(){
    const allbox = document.querySelectorAll("#layer div");
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }

    const clockDisplay = document.getElementById('clock');
    if (clockDisplay) {
        clockDisplay.textContent = "";
    }
}