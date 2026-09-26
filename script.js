/* =========================================================
   APA GAME CONSOLE - CENTRAL NAVIGATION & SYSTEM BINDINGS
   ========================================================= */

// CORE SCREEN DOM ELEMENTS
const menuScreen = document.querySelector(".menu-screen");
const profileScreen = document.querySelector(".profile-screen");
const missionsScreen = document.querySelector(".missions-screen");
const footballScreen = document.querySelector(".football-screen");
const renovationScreen = document.querySelector(".renovation-screen");
const apesScreen = document.querySelector(".apes-screen");
const warzoneScreen = document.querySelector(".warzone-screen");
const discoScreenNode = document.querySelector(".disco-screen");
const achievementsScreen = document.querySelector(".achievements-screen"); 

// BUTTON NAVIGATION CODES
const profileButton = document.querySelector(".profile-button");
const missionsButton = document.querySelector(".mission-button");
const achievementsButton = document.querySelector(".achievements-button"); 
const backButton = document.querySelector(".back-button");
const mapBackButton = document.querySelector(".map-back-button");
const achievementsBackButton = document.querySelector(".achievements-back-button"); 

// TÉRKÉP HELYSZÍNEK
let footballLocation = document.querySelector(".football-location");
let renovationLocation = document.querySelector(".renovation-location");
let apesLocation = document.querySelector(".apes-location");
let warzoneLocation = document.querySelector(".warzone-location");
let discoLocNode = document.querySelector(".disco-location");

// FOOTBALL SCREEN SUB-ELEMENTS
const playerSelectScreen = document.querySelector(".player-select-screen");
const shootingScreen = document.querySelector(".shooting-screen");
const footballResult = document.querySelector(".football-result");
const playerCards = document.querySelectorAll(".player-card");
const selectedPlayerName = document.querySelector("#selected-player-name");
const shotsLeftText = document.querySelector("#shots-left");
const shotMessage = document.querySelector("#shot-message");
const targets = document.querySelectorAll(".target");
const goalkeeper = document.querySelector(".goalkeeper");
const ball = document.querySelector(".ball");
const footballBackButton = document.querySelector(".football-back-button");
const resultMapButton = document.querySelector(".result-map-button");

// RENOVATION SCREEN SUB-ELEMENTS
const buildPhaseText = document.querySelector("#build-phase");
const renovationMessage = document.querySelector("#renovation-message");
const timingIndicator = document.querySelector("#timing-indicator");
const hammerButton = document.querySelector("#hammer-button");
const renovationBackButton = document.querySelector(".renovation-back-button");
const renoResultScreen = document.querySelector(".renovation-result");
const renoResultMapButton = document.querySelector(".reno-result-map-button");

const houseParts = [
    document.querySelector("#house-base"),
    document.querySelector("#house-middle"),
    document.querySelector("#house-top"),
    document.querySelector("#house-roof")
];

// APES SCREEN SUB-ELEMENTS
const apesScoreText = document.querySelector("#apes-score");
const apesLivesText = document.querySelector("#apes-lives");
const apesMessage = document.querySelector("#apes-message");
const basketPlayer = document.querySelector("#basket-player");
const fallingContainer = document.querySelector("#falling-objects-container");
const apesBackButton = document.querySelector(".apes-back-button");
const apesResultScreen = document.querySelector(".apes-result");
const apesResultMapButton = document.querySelector(".apes-result-map-button");
const btnMoveLeft = document.querySelector("#btn-move-left");
const btnMoveRight = document.querySelector("#btn-move-right");

// WARZONE & DISCO SUB-ELEMENTS
const wzDoneCountDisplay = document.querySelector("#warzone-done-count");
const wzStatusMessage = document.querySelector("#warzone-message");
const wzResultModal = document.querySelector(".warzone-result");
const wzResultBackMapBtn = document.querySelector(".warzone-result-map-button");
const wzEscapeBtn = document.querySelector(".warzone-back-button");
const wzItemsContainer = document.querySelector("#wz-items-container");

const discoCorrectCountText = document.querySelector("#disco-correct-count");
const discoStatusMessage = document.querySelector("#disco-message");
const discoPlayBtn = document.querySelector("#disco-play-btn");
const retroWaveform = document.querySelector("#retro-waveform");
const discoAlbumsContainer = document.querySelector("#disco-albums-container");
const discoResultModal = document.querySelector(".disco-result");
const discoResultMapButton = document.querySelector(".disco-result-map-button");
const discoEscapeBtn = document.querySelector(".disco-back-button");

// MAP SCORE TRACKER ELEMENT
const completedCountText = document.querySelector("#completed-count");

/* GLOBAL JÁTÉK ÁLLAPOTOK & KÜLDETÉSSZÁMLÁLÓK */
let selectedPlayer = "";
let shotsLeft = 3;
let goals = 0;
let audioCtx = null;

let footballMissionCompleted = false; 
let renovationMissionCompleted = false;
let apesMissionCompleted = false;
window.warzoneCompleted = false; 
window.discoCompleted = false;   
let totalCompletedMissions = 0;

// RENOVATION CSÚSZKA VÁLTOZÓK
let buildPhase = 0;
let indicatorPosition = 0;
let indicatorDirection = 1;
let indicatorInterval = null;
const indicatorSpeed = 3.2; 

// APES VÁLTOZÓK
let apesScore = 0;
let apesLives = 3;
let basketLeftPercent = 50; 
let apesGameActive = false;
let spawnInterval = null;
let gravityInterval = null;
let activeFruits = [];
let keysPressed = {}; 

// WARZONE VÁLTOZÓK
let wzActive = false;
let wzDoneCount = 0;
let draggedItemType = null;

let wzFamilyDatabase = {
    ANYA: { itemNeeded: "ZABRUDI", satisfied: false, defaultText: "🍫 ZABRUDIT KÉR!", successText: "🏅 ELÉGEDETT" },
    KIRA: { itemNeeded: "KOLIBA", satisfied: false, defaultText: "🔑 KOLIBA MENNE!", successText: "🏅 ELÉGEDETT" },
    RELLA: { itemNeeded: "CSOKI", satisfied: false, defaultText: "🍬 CSOKIT KÉR!", successText: "🏅 ELÉGEDETT" },
    ADÉL: { itemNeeded: "PÉNZ", satisfied: false, defaultText: "💳 KÁRTYÁT KÉR!", successText: "🏅 ELÉGEDETT" }
};

// DISCO VÁLTOZÓK
let discoActive = false;
let discoCorrectCount = 0;
let currentSongIndex = null;
let songsPlayedPool = [];
let currentMp3Audio = null;

const retroPlaylist = [
    { title: "MARGE - VÁRATLAN NYÁR", cover: "☀️", mp3: "music/zene1.m4a" },
    { title: "THE PRODIGY - FIRESTARTER", cover: "🔥", mp3: "music/zene2.wav" },
    { title: "BETON.HOFI X ANUBII\$ - TÜKÖRTEREM", cover: "🪞", mp3: "music/zene3.wav" },
    { title: "METALLICA - ONE", cover: "🎸", mp3: "music/zene4.wav" },
    { title: "4 NON BLONDES - WHATS GOING ON", cover: "📢", mp3: "music/zene5.wav" },
    { title: "KOMODO - RADIO MIX", cover: "📻", mp3: "music/zene6.wav" },
    { title: "DJ TIESTO - NYANA", cover: "🎧", mp3: "music/zene7.wav" },
    { title: "KISTEHÉN - ELVISZI A SZÉL", cover: "🍃", mp3: "music/zene8.wav" },
    { title: "THE CRANBERRIES - SALVATION", cover: "📀", mp3: "music/zene9.wav" },
    { title: "BËLGA - RENDŐRMUNKA", cover: "👮", mp3: "music/zene10.wav" }
];

/* CENTRAL NAVIGATION CONTROLLER */
function showScreen(screenToShow) {
    const allScreens = [
        menuScreen, profileScreen, missionsScreen, footballScreen, 
        renovationScreen, apesScreen, warzoneScreen, discoScreenNode, 
        achievementsScreen, discoResultModal, wzResultModal, footballResult, renoResultScreen
    ];
    allScreens.forEach(scr => { if (scr) scr.style.display = "none"; });
    if (screenToShow) screenToShow.style.display = "flex";
}

/* INTERFÉSZ RENDSZER FIGYELŐK KAPCSOLÁSA */
if (profileButton) profileButton.addEventListener("click", () => showScreen(profileScreen));
if (missionsButton) missionsButton.addEventListener("click", () => showScreen(missionsScreen));
if (backButton) backButton.addEventListener("click", () => showScreen(menuScreen));
if (mapBackButton) mapBackButton.addEventListener("click", () => showScreen(menuScreen));

if (achievementsButton) {
    achievementsButton.addEventListener("click", () => {
        initAudio();
        showScreen(achievementsScreen);
    });
}

if (achievementsBackButton) {
    achievementsBackButton.addEventListener("click", () => {
        showScreen(menuScreen);
    });
}

/* HELYSZÍNEK BEKÖTÉSE A TÉRKÉPEN */
if (footballLocation) {
    footballLocation.addEventListener("click", () => {
        showScreen(footballScreen);
        if (playerSelectScreen) playerSelectScreen.style.display = "flex";
        if (shootingScreen) shootingScreen.style.display = "none";
        if (footballResult) footballResult.style.display = "none";
    });
}

if (renovationLocation) {
    renovationLocation.addEventListener("click", () => {
        showScreen(renovationScreen);
        startRenovationGame();
    });
}

if (apesLocation) {
    apesLocation.addEventListener("click", () => {
        showScreen(apesScreen);
        startApesGame();
    });
}

if (warzoneLocation) {
    warzoneLocation.addEventListener("click", () => {
        showScreen(warzoneScreen);
        initWarzonePureMatchmaking();
    });
}

if (discoLocNode) {
    discoLocNode.addEventListener("click", () => {
        showScreen(discoScreenNode);
        initDiscoMusicQuiz();
    });
}

/* =========================================================
   8-BIT RETRO CHIP AUDIO ENGINE
   ========================================================= */
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    if (type === 'shoot') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start();
        osc.stop(now + 0.12);
    } else if (type === 'goal') {
        const notes = [261.6, 329.6, 392.0, 523.3];
        notes.forEach((freq, idx) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.type = "square";
            o.connect(g);
            g.connect(audioCtx.destination);
            o.frequency.setValueAtTime(freq, now + (idx * 0.06));
            g.gain.setValueAtTime(0.1, now + (idx * 0.06));
            g.gain.linearRampToValueAtTime(0.01, now + (idx * 0.06) + 0.1);
            o.start(now + (idx * 0.06));
            o.stop(now + (idx * 0.06) + 0.1);
        });
    } else if (type === 'save') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start();
        osc.stop(now + 0.2);
    } else if (type === 'gameover') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(392, now);
        osc.frequency.linearRampToValueAtTime(196, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start();
        osc.stop(now + 0.4);
    } else if (type === 'monkey') {
        const monkeyTones = [220.0, 330.0, 293.7, 440.0];
        monkeyTones.forEach((freq, idx) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            o.type = "sawtooth";
            o.connect(g);
            g.connect(audioCtx.destination);
            o.frequency.setValueAtTime(freq, now + (idx * 0.07));
            g.gain.setValueAtTime(0.12, now + (idx * 0.07));
            g.gain.linearRampToValueAtTime(0.01, now + (idx * 0.07) + 0.08);
            o.start(now + (idx * 0.07));
            o.stop(now + (idx * 0.07) + 0.08);
        });
    }

}
/* =========================================================
   MAJMOK BOLYGÓJA ENGINE
========================================================= */

function startApesGame() {
    initAudio();
    apesScore = 0;
    apesLives = 3;
    basketLeftPercent = 50;
    apesGameActive = true;
    activeFruits = [];
    keysPressed = {};

    if (apesScoreText) apesScoreText.textContent = apesScore;
    if (apesLivesText) updateLivesDisplay();
    if (apesMessage) apesMessage.textContent = "KAPD EL A BANÁNOKAT! VIGYÁZZ A KÓKUSSZAL!";
    if (apesResultScreen) apesResultScreen.style.display = "none";
    if (fallingContainer) fallingContainer.innerHTML = "";
    if (basketPlayer) basketPlayer.style.left = basketLeftPercent + "%";

    clearInterval(spawnInterval);
    clearInterval(gravityInterval);

    spawnInterval = setInterval(() => {
        if (!apesGameActive) return;

        const fruitEl = document.createElement("div");
        fruitEl.className = "falling-fruit";
        
        const rand = Math.random();
        let type = "banana";

        if (rand < 0.35) {
            type = "coconut";
            fruitEl.textContent = "🥥";
        } else if (rand > 0.88) {
            type = "gold-banana";
            fruitEl.textContent = "🍌";
            fruitEl.classList.add("gold-banana");
        } else {
            type = "banana";
            fruitEl.textContent = "🍌";
        }

        const randomX = Math.floor(Math.random() * 80) + 10;
        fruitEl.style.left = randomX + "%";
        fruitEl.style.top = "60px";

        if (fallingContainer) fallingContainer.appendChild(fruitEl);

        activeFruits.push({
            element: fruitEl,
            x: randomX,
            y: 60,
            type: type,
            speed: type === "gold-banana" ? 6.5 : 4
        });
    }, 900);

    gravityInterval = setInterval(() => {
        runApesGravityCheck();
        handleContinuousInput();
    }, 20);
}

function runApesGravityCheck() {
    if (!apesGameActive) return;

    for (let i = activeFruits.length - 1; i >= 0; i--) {
        let fruit = activeFruits[i];
        fruit.y += fruit.speed;
        fruit.element.style.top = fruit.y + "px";

        if (fruit.y >= 415 && fruit.y <= 445) {
            if (Math.abs(fruit.x - basketLeftPercent) <= 8) {
                if (fruit.type === "banana") {
                    apesScore += 100;
                    if (apesMessage) apesMessage.textContent = "+100 PONT! 🍌";
                    playSound('monkey');
                } else if (fruit.type === "gold-banana") {
                    apesScore += 200;
                    if (apesMessage) apesMessage.textContent = "ARANY BANÁN! +200 PONT!! ✨";
                    playSound('monkey');
                } else if (fruit.type === "coconut") {
                    apesLives--;
                    updateLivesDisplay();
                    if (apesMessage) apesMessage.textContent = "KÓKUSZDIÓ TALÁLAT! -1 ÉLET! 🥥";
                    playSound('save');
                    if (apesLives <= 0) endApesGame(false);
                }

                if (apesScoreText) apesScoreText.textContent = apesScore;
                if (apesScore >= 1500) endApesGame(true);

                fruit.element.remove();
                activeFruits.splice(i, 1);
                continue;
            }
        }

        if (fruit.y > 500) {
            fruit.element.remove();
            activeFruits.splice(i, 1);
        }
    }
}

function updateLivesDisplay() {
    if (!apesLivesText) return;
    
    let hearts = "";
    for (let i = 0; i < apesLives; i++) {
        hearts += "❤️";
    }
    apesLivesText.textContent = hearts === "" ? "GAME OVER" : hearts;
}

function handleContinuousInput() {
    if (!apesGameActive) return;

    if (keysPressed["ArrowLeft"] || keysPressed["KeyA"]) {
        basketLeftPercent -= 2.5;
        if (basketLeftPercent < 5) basketLeftPercent = 5;
    }
    if (keysPressed["ArrowRight"] || keysPressed["KeyD"]) {
        basketLeftPercent += 2.5;
        if (basketLeftPercent > 92) basketLeftPercent = 92;
    }
    
    if (basketPlayer) basketPlayer.style.left = basketLeftPercent + "%";
}

window.addEventListener("keydown", (e) => {
    if (apesScreen && apesScreen.style.display !== "none" && apesGameActive) {
        if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
            keysPressed[e.code] = true;
            e.preventDefault();
        }
    }
});

window.addEventListener("keyup", (e) => {
    if (apesScreen && apesScreen.style.display !== "none") {
        if (["ArrowLeft", "ArrowRight", "KeyA", "KeyD"].includes(e.code)) {
            keysPressed[e.code] = false;
        }
    }
});

if (btnMoveLeft) {
    btnMoveLeft.addEventListener("click", () => {
        basketLeftPercent -= 10;
        if (basketLeftPercent < 5) basketLeftPercent = 5;
        if (basketPlayer) basketPlayer.style.left = basketLeftPercent + "%";
    });
}

if (btnMoveRight) {
    btnMoveRight.addEventListener("click", () => {
        basketLeftPercent += 10;
        if (basketLeftPercent > 92) basketLeftPercent = 92;
        if (basketPlayer) basketPlayer.style.left = basketLeftPercent + "%";
    });
}

function endApesGame(victory) {
    apesGameActive = false;
    clearInterval(spawnInterval);
    clearInterval(gravityInterval);
    playSound('gameover');

    if (apesResultScreen) apesResultScreen.style.display = "flex";

    const title = document.querySelector("#apes-result-title");
    const badge = document.querySelector("#apes-result-badge");
    const text = document.querySelector("#apes-result-text");

    if (victory) {
        if (title) title.textContent = "MISSION COMPLETE";
        if (badge) {
            badge.textContent = "🏆 SIKER";
            badge.style.color = "#00ffcc";
        }
        if (text) text.textContent = "APA MEGVÉDTE A BOLYGÓT ÉS ÖSSZEGYŰJTÖTT " + apesScore + " PONTOT!";
        
        if (!apesMissionCompleted) {
            apesMissionCompleted = true;
            totalCompletedMissions += 1;
            if (completedCountText) completedCountText.textContent = totalCompletedMissions;
            
            const locNode = document.querySelector(".apes-location");
            if (locNode) {
                const status = locNode.querySelector(".location-status");
                if (status) {
                    status.textContent = "COMPLETED";
                    status.style.color = "#00ff00";
                }
            }
        }
    } else {
        if (title) title.textContent = "GAME OVER";
        if (badge) {
            badge.textContent = "💀 KIBUKTÁL";
            badge.style.color = "#ff2255";
        }
        if (text) text.textContent = "A KÓKUSZDIÓK LETERÍTETTEK. ELÉRT PONTSZÁM: " + apesScore;
    }
}

if (apesBackButton) {
    apesBackButton.addEventListener("click", () => {
        apesGameActive = false;
        clearInterval(spawnInterval);
        clearInterval(gravityInterval);
        showScreen(missionsScreen);
    });
}

if (apesResultMapButton) {
    apesResultMapButton.addEventListener("click", () => showScreen(missionsScreen));
}

/* =========================================================
   RENOVATION JÁTÉK MOTOR LOGIKA
========================================================= */

function handleHammerStrike() {
    if (renovationScreen.style.display === "none" || buildPhase >= 4) return;

    if (indicatorPosition >= 37 && indicatorPosition <= 59) {
        if (houseParts[buildPhase]) houseParts[buildPhase].style.display = "block";
        buildPhase++;
        
        if (buildPhaseText) buildPhaseText.textContent = buildPhase;
        if (renovationMessage) renovationMessage.textContent = "TÖKÉLETES ÜTÉS! ÉPÜL A HÁZ!";
        
        if (audioCtx) {
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = "square";
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            const tones = [261.6, 329.6, 392.0, 523.3];
            osc.frequency.setValueAtTime(tones[buildPhase - 1], now);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
            
            osc.start();
            osc.stop(now + 0.15);
        }
        
        if (buildPhase === 4) {
            clearInterval(indicatorInterval);
            setTimeout(showRenovationResult, 300);
        }
    } else {
        if (renovationMessage) renovationMessage.textContent = "MELLÉÜTTÉL! PRÓBÁLD ÚJRA!";
        
        if (audioCtx) {
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = "sawtooth";
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.frequency.setValueAtTime(90, now);
            osc.frequency.linearRampToValueAtTime(30, now + 0.25);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
            
            osc.start();
            osc.stop(now + 0.25);
        }
    }
}

if (hammerButton) {
    hammerButton.addEventListener("click", (e) => {
        e.preventDefault();
        handleHammerStrike();
    });
}

window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.keyCode === 32) {
        if (renovationScreen.style.display !== "none") {
            e.preventDefault();
            handleHammerStrike();
        }
    }
});

function startRenovationGame() {
    initAudio();
    buildPhase = 0;
    
    if (buildPhaseText) buildPhaseText.textContent = buildPhase;
    if (renovationMessage) renovationMessage.textContent = "IDŐZÍTS JÓL ÉPÍTSD FEL A HÁZAT!";
    if (renoResultScreen) renoResultScreen.style.display = "none";
    
    houseParts.forEach(part => {
        if (part) part.style.display = "none";
    });
    
    indicatorPosition = 0;
    indicatorDirection = 1;
    clearInterval(indicatorInterval);
    
    indicatorInterval = setInterval(() => {
        indicatorPosition += indicatorSpeed * indicatorDirection;
        
        if (indicatorPosition >= 95 || indicatorPosition <= 0) {
            indicatorDirection *= -1;
        }
        if (timingIndicator) {
            timingIndicator.style.left = indicatorPosition + "%";
        }
    }, 20);
}

function showRenovationResult() {
    if (renoResultScreen) renoResultScreen.style.display = "flex";
    
    if (audioCtx) {
        const now = audioCtx.currentTime;
        const victoryNotes = [523.3, 587.3, 659.3, 784.0, 659.3, 784.0];
        
        victoryNotes.forEach((freq, idx) => {
            const o = audioCtx.createOscillator();
            const g = audioCtx.createGain();
            
            o.type = "triangle";
            o.connect(g);
            g.connect(audioCtx.destination);
            
            o.frequency.setValueAtTime(freq, now + (idx * 0.08));
            g.gain.setValueAtTime(0.12, now + (idx * 0.08));
            g.gain.linearRampToValueAtTime(0.01, now + (idx * 0.08) + 0.15);
            
            o.start(now + (idx * 0.08));
            o.stop(now + (idx * 0.08) + 0.15);
        });
    }
    
    if (!renovationMissionCompleted) {
        renovationMissionCompleted = true;
        totalCompletedMissions += 1;
        
        if (completedCountText) completedCountText.textContent = totalCompletedMissions;
        
        if (renovationLocation) {
            const statusLabel = renovationLocation.querySelector(".location-status");
            if (statusLabel) {
                statusLabel.textContent = "COMPLETED";
                statusLabel.style.color = "#00ff00";
            }
        }
    }
}

if (renovationBackButton) {
    renovationBackButton.addEventListener("click", () => {
        clearInterval(indicatorInterval);
        showScreen(missionsScreen);
    });
}

if (renoResultMapButton) {
    renoResultMapButton.addEventListener("click", () => {
        showScreen(missionsScreen);
    });
}

/* =========================================================
   ALLIANZ ARENA JÁTÉK MOTOR LOGIKA (TOTAL RESET FIX)
   ========================================================= */
playerCards.forEach(card => {
    card.addEventListener("click", () => {
        initAudio(); 
        selectedPlayer = card.dataset.player;
        if (selectedPlayerName) selectedPlayerName.textContent = selectedPlayer;
        if (playerSelectScreen) playerSelectScreen.style.display = "none";
        if (shootingScreen) shootingScreen.style.display = "flex";
        if (footballResult) footballResult.style.display = "none";
        
        // BOMBABIZTOS INDÍTÁS: Erőszakosan visszaállítunk minden számlálót 3-ra!
        shotsLeft = 3; 
        goals = 0;
        
        if (shotsLeftText) shotsLeftText.textContent = shotsLeft;
        if (shotMessage) {
            shotMessage.textContent = "VÁLASSZ EGY CÉLPONTOT!";
            shotMessage.style.color = "#ffffff";
        }
        
        // Labda és kapus kényszerített alaphelyzetbe állítása az induláskor
        resetBall(); 
        if (goalkeeper) goalkeeper.className = "goalkeeper";
        
        // Töröljük az esetlegesen ott maradt régi pótgombot
        const oldBtn = document.querySelector(".football-emergency-back-btn");
        if (oldBtn) oldBtn.remove();
    });
});

targets.forEach(target => { 
    target.addEventListener("click", () => { 
        // Csak akkor engedünk lőni, ha van még lövés, és a labda épp nincs úton
        const localBall = document.querySelector(".ball") || ball;
        if (shotsLeft <= 0 || (localBall && localBall.classList.contains("kicking"))) return; 
        shootBall(target.dataset.target); 
    }); 
});

function shootBall(targetCoord) {
    const localBall = document.querySelector(".ball") || ball;
    const localGK = document.querySelector(".goalkeeper") || goalkeeper;
    
    if (!localBall || !localGK) return;

    shotsLeft--;
    if (shotsLeftText) shotsLeftText.textContent = shotsLeft;
    playSound('shoot');

    // Kapus vetődési iránya
    let gkChoice;
    if (Math.random() < 0.35) {
        gkChoice = targetCoord;
    } else {
        const choices = ["top-left", "top-middle", "top-right", "bottom-left", "bottom-right"];
        gkChoice = choices[Math.floor(Math.random() * choices.length)];
    }

    if (gkChoice === "top-left" || gkChoice === "bottom-left") {
        localGK.className = "goalkeeper dive-left";
    } else if (gkChoice === "top-right" || gkChoice === "bottom-right") {
        localGK.className = "goalkeeper dive-right";
    } else {
        localGK.className = "goalkeeper dive-middle";
    }

    // Labda röppályája neon célpontok szerint
    if (targetCoord === "top-left") { localBall.style.left = "20%"; localBall.style.bottom = "230px"; }
    else if (targetCoord === "top-middle") { localBall.style.left = "50%"; localBall.style.bottom = "230px"; }
    else if (targetCoord === "top-right") { localBall.style.left = "80%"; localBall.style.bottom = "230px"; }
    else if (targetCoord === "bottom-left") { localBall.style.left = "20%"; localBall.style.bottom = "120px"; }
    else if (targetCoord === "bottom-right") { localBall.style.left = "80%"; localBall.style.bottom = "120px"; }
    
    localBall.classList.add("kicking");
    const isSaved = gkChoice === targetCoord;

    setTimeout(() => {
        if (shotMessage) {
            if (isSaved) {
                shotMessage.textContent = "NEUER KIVÉDTE!";
                shotMessage.style.color = "#ff3e6c";
                playSound('save');
            } else {
                goals++;
                shotMessage.textContent = "GÓÓÓÓÓÓL!!!";
                shotMessage.style.color = "#ffff00";
                playSound('goal');
            }
        }
    }, 250);

    // KÖZPONTI IDŐZÍTŐ: 1.3 másodperc után tiszta lappal visszaállítjuk a labdát a büntetőpontra
    setTimeout(() => {
        resetBall();
        if (localGK) localGK.className = "goalkeeper";
        if (shotMessage) shotMessage.style.color = "#ffffff";
        
        if (shotsLeft === 0) {
            showFootballResult();
        } else {
            if (shotMessage) shotMessage.textContent = "LŐD A KÖVETKEZŐT!";
        }
    }, 1300);
}

function resetBall() {
    const localBall = document.querySelector(".ball") || ball;
    if (!localBall) return;
    
    // Kitöröljük a kicking osztályt és erőszakosan visszahúzzuk a labdát középre
    localBall.classList.remove("kicking");
    localBall.style.left = "50%";
    localBall.style.bottom = "25px";
}

function showFootballResult() {
    if (shootingScreen) shootingScreen.style.display = "none";
    if (footballResult) footballResult.style.display = "flex";
    
    playSound('gameover');

    const scoreText = document.querySelector("#football-result-score");
    const resultText = document.querySelector("#football-result-text");
    if (scoreText) scoreText.textContent = goals + " / 3";
    if (resultText) resultText.textContent = selectedPlayer.toUpperCase() + " FINISHED WITH " + goals + " GOALS.";

    if (!footballMissionCompleted) {
        footballMissionCompleted = true;
        totalCompletedMissions += 1;
        if (completedCountText) completedCountText.textContent = totalCompletedMissions;
        
        const locNode = document.querySelector(".football-location");
        if (locNode) {
            const statusLabel = locNode.querySelector(".location-status");
            if (statusLabel) { 
                statusLabel.textContent = "COMPLETED"; 
                statusLabel.style.color = "#00ff00"; 
            }
        }
    }

    // Pótgomb elhelyezése a biztonság kedvéért az oldalsó sávon
    const sidebarLeft = document.querySelector(".shooting-sidebar-left");
    if (sidebarLeft && shotsLeft === 0) {
        if (!document.querySelector(".football-emergency-back-btn")) {
            const emergencyBtn = document.createElement("button");
            emergencyBtn.className = "football-emergency-back-btn";
            emergencyBtn.textContent = "← VISSZA A TÉRKÉPHEZ";
            emergencyBtn.style.marginTop = "25px";
            emergencyBtn.style.background = "#991b1b";
            emergencyBtn.style.color = "#fff";
            emergencyBtn.style.border = "4px solid #000";
            emergencyBtn.style.padding = "12px 15px";
            emergencyBtn.style.fontFamily = "'Press Start 2P', monospace";
            emergencyBtn.style.fontSize = "11px";
            emergencyBtn.style.cursor = "pointer";
            emergencyBtn.style.width = "100%";
            emergencyBtn.style.boxShadow = "inset -3px -3px 0px #450a0a, inset 3px 3px 0px #ef4444";
            
            emergencyBtn.onclick = function(e) {
                e.preventDefault();
                emergencyBtn.remove();
                showScreen(missionsScreen);
            };
            sidebarLeft.appendChild(emergencyBtn);
        }
    }
}

if (footballBackButton) footballBackButton.addEventListener("click", () => showScreen(missionsScreen));
if (resultMapButton) resultMapButton.addEventListener("click", () => showScreen(missionsScreen));
/* =========================================================
   KÜLDETÉS: 04 - HÁBORÚS ÖVEZET ENGINE (TOTAL DRAG & DROP FIX)
   ========================================================= */
function initWarzonePureMatchmaking() {
    initAudio(); 
    wzActive = true; 
    wzDoneCount = 0; 
    draggedItemType = null;
    
    if (wzDoneCountDisplay) wzDoneCountDisplay.textContent = wzDoneCount;
    if (wzStatusMessage) wzStatusMessage.textContent = "HÚZD A RETRÓ TÁRGYAKAT A BAL OLDALI MEGFELELŐ CSALÁDTAGOKRA!";
    if (wzResultModal) wzResultModal.style.display = "none";

    // Minden mező és buborék kényszerített alaphelyzetbe állítása az indításkor
    Object.keys(wzFamilyDatabase).forEach(key => {
        wzFamilyDatabase[key].satisfied = false;
        const node = document.querySelector(`.char-node[data-char="${key}"]`); 
        if (node) node.className = "match-node char-node";
        
        const bubble = document.querySelector(`#bubble-${key}`); 
        if (bubble) { 
            bubble.textContent = wzFamilyDatabase[key].defaultText; 
            bubble.style.color = "#ffff00"; 
        }
    });

    // Automatikus retro tárgyösszekeverő algoritmus (Shuffle) az izgalmasabb játékért
    if (wzItemsContainer) {
        const itemsArray = Array.from(wzItemsContainer.children);
        for (let i = itemsArray.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            const temp = itemsArray[i]; 
            itemsArray[i] = itemsArray[j]; 
            itemsArray[j] = temp; 
        }
        wzItemsContainer.innerHTML = ""; 
        itemsArray.forEach(item => wzItemsContainer.appendChild(item));
        
        // Újraregisztráljuk a dragstart eseményeket a kevert elemekre
        bindWarzoneDragEvents();
    }
}

function bindWarzoneDragEvents() {
    document.querySelectorAll(".item-node").forEach(item => { 
        item.addEventListener("dragstart", () => { 
            if (!wzActive) return; 
            draggedItemType = item.dataset.item; 
        }); 
    });
}

// DROPPOLÁS ÉS ELENGEDÉS FIGYELÉSE A CSALÁDTAGOKON
document.querySelectorAll(".char-node").forEach(charZone => {
    charZone.addEventListener("dragover", (e) => { 
        e.preventDefault(); 
        const charName = charZone.dataset.char; 
        // Csak akkor villan fel zölden, ha az adott karakter kérése még nincs elintézve
        if (wzActive && wzFamilyDatabase[charName] && !wzFamilyDatabase[charName].satisfied) {
            charZone.classList.add("drag-over"); 
        }
    });

    charZone.addEventListener("dragleave", () => { 
        charZone.classList.remove("drag-over"); 
    });

    charZone.addEventListener("drop", (e) => {
        e.preventDefault(); 
        charZone.classList.remove("drag-over"); 
        if (!wzActive) return;
        
        const targetCharName = charZone.dataset.char; 
        const currentCharacterState = wzFamilyDatabase[targetCharName];
        
        if (!currentCharacterState || currentCharacterState.satisfied) return;

        // KIÉRTÉKELÉS: Megfelelő-e a ráhúzott tárgy?
        if (currentCharacterState.itemNeeded === draggedItemType) {
            currentCharacterState.satisfied = true; 
            wzDoneCount++; 
            if (wzDoneCountDisplay) wzDoneCountDisplay.textContent = wzDoneCount;
            if (wzStatusMessage) wzStatusMessage.textContent = `${targetCharName} KÍVÁNSÁGA TELJESÍTVE! 👍`;
            
            // Egyedi sikerhangok lejátszása
            if (targetCharName === "ANYA" || targetCharName === "KIRA") playSound('monkey'); 
            else playSound('goal');
            
            // Átállítjuk elégedett kékes stílusra a dobozt
            charZone.className = "match-node char-node satisfied";
            const bubble = document.querySelector(`#bubble-${targetCharName}`); 
            if (bubble) { 
                bubble.textContent = currentCharacterState.successText; 
                bubble.style.color = "#00ffcc"; 
            }
            
            // Ha mind a 4 tag sikeresen megkapta a magáét -> Győzelem!
            if (wzDoneCount === 4) setTimeout(finishWarzonePureGame, 400);
        } else { 
            if (wzStatusMessage) wzStatusMessage.textContent = `ROSSZ PÁROSÍTÁS! ${targetCharName} NEM EZT KÉRTE! ❌`; 
            playSound('save'); 
        }
        draggedItemType = null;
    });
});

function finishWarzonePureGame() {
    wzActive = false; 
    playSound('gameover');
    if (wzResultModal) {
        wzResultModal.style.display = "flex";
        const title = wzResultModal.querySelector("h1"); 
        const text = wzResultModal.querySelector("p:last-of-type");
        if (title) title.textContent = "MISSION COMPLETE"; 
        if (text) text.textContent = "APA TÚLÉLTE A NAPOT ITTHON! MINDEN KÍVÁNSÁG SIKERESEN TELJESÜLT.";
    }
    
    // Globális térképszámláló biztonságos léptetése
    let totalCompleted = document.querySelector("#completed-count");
    if (totalCompleted && !window.warzoneCompleted) {
        window.warzoneCompleted = true; 
        let current = parseInt(totalCompleted.textContent) || 0;
        totalCompleted.textContent = current + 1;
        
        const locNode = document.querySelector(".warzone-location"); 
        if (locNode) { 
            const status = locNode.querySelector(".location-status"); 
            if (status) { status.textContent = "COMPLETED"; status.style.color = "#00ff00"; } 
        } 
    }
}

if (wzEscapeBtn) wzEscapeBtn.addEventListener("click", () => { wzActive = false; showScreen(missionsScreen); });
if (wzResultBackMapBtn) wzResultBackMapBtn.addEventListener("click", () => { showScreen(missionsScreen); });
/* =========================================================
   KÜLDETÉS: 05 - DISCO SZOBA AUDIO QUIZ ENGINE (FINAL DIRECT DRIVE)
   ========================================================= */
function initDiscoMusicQuiz() {
    initAudio(); 
    discoActive = true; 
    discoCorrectCount = 0; 
    songsPlayedPool = []; 
    stopCurrentSongMelody();
    
    if (discoCorrectCountText) discoCorrectCountText.textContent = discoCorrectCount;
    if (discoStatusMessage) discoStatusMessage.textContent = "KATTINTS A RETRÓ LEJÁTSZÁS GOMBRA A ZENE INDÍTÁSÁHOZ!";
    if (discoResultModal) discoResultModal.style.display = "none";
    if (retroWaveform) retroWaveform.classList.remove("playing");
    
    generateNextQuizRound();
}

function generateNextQuizRound() {
    stopCurrentSongMelody(); if (retroWaveform) retroWaveform.classList.remove("playing"); if (!discoActive) return;
    const availableSongs = retroPlaylist.filter((_, idx) => !songsPlayedPool.includes(idx));
    if (availableSongs.length === 0 || discoCorrectCount >= 10) { setTimeout(finishDiscoRoomGame, 400); return; }
    const nextSong = availableSongs[Math.floor(Math.random() * availableSongs.length)]; currentSongIndex = retroPlaylist.indexOf(nextSong);
    if (discoAlbumsContainer) {
        let shuffleGrid = [...availableSongs];
        for (let i = shuffleGrid.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffleGrid[i], shuffleGrid[j]] = [shuffleGrid[j], shuffleGrid[i]]; }
        discoAlbumsContainer.innerHTML = "";
        shuffleGrid.forEach(song => {
            const card = document.createElement("div"); card.className = "album-card-node"; card.setAttribute("data-song-title", song.title);
            card.innerHTML = `<div class="album-mock-cover">${song.cover}</div><div class="album-title-label">${song.title}</div>`;
            card.addEventListener("click", () => { evaluateUserGuess(song.title, card); }); discoAlbumsContainer.appendChild(card);
        });
    }
}

if (discoPlayBtn) { discoPlayBtn.addEventListener("click", () => { if (!discoActive || currentSongIndex === null) return; if (discoStatusMessage) discoStatusMessage.textContent = "FIGYELJ A RETRÓ RITMUSRA... MELYIK EZ A SZÁM?"; playCurrentSelectedMp3(retroPlaylist[currentSongIndex].mp3); }); }

function playCurrentSelectedMp3(filePath) {
    stopCurrentSongMelody(); currentMp3Audio = new Audio(filePath); currentMp3Audio.volume = 0.25;
    currentMp3Audio.play().then(() => { if (retroWaveform) retroWaveform.classList.add("playing"); }).catch(err => { if (discoStatusMessage) discoStatusMessage.textContent = "HIBA: Nem tudom letölteni a dalt a Drive-ból!"; });
    currentMp3Audio.onended = function() { if (retroWaveform) retroWaveform.classList.remove("playing"); };
}
function stopCurrentSongMelody() { if (currentMp3Audio) { currentMp3Audio.pause(); currentMp3Audio.currentTime = 0; currentMp3Audio = null; } if (retroWaveform) retroWaveform.classList.remove("playing"); }

function evaluateUserGuess(selectedTitle, clickedCardElement) {
    if (!discoActive || currentSongIndex === null) return; const correctTitle = retroPlaylist[currentSongIndex].title;
    if (selectedTitle === correctTitle) {
        discoCorrectCount++; songsPlayedPool.push(currentSongIndex); if (discoCorrectCountText) discoCorrectCountText.textContent = discoCorrectCount;
        if (discoStatusMessage) discoStatusMessage.textContent = "TÖKÉLETES TALÁLAT! EZ VOLT AZ A SLÁGER! 🏆"; playSound('goal');
        if (clickedCardElement) { clickedCardElement.style.transition = "opacity 0.4s, transform 0.4s"; clickedCardElement.style.opacity = "0"; clickedCardElement.style.transform = "scale(0.8)"; setTimeout(() => { clickedCardElement.remove(); }, 400); }
        stopCurrentSongMelody();
        if (discoCorrectCount >= 10) setTimeout(finishDiscoRoomGame, 800); else setTimeout(generateNextQuizRound, 1200);
    } else { if (discoStatusMessage) discoStatusMessage.textContent = "NEM EZ AZ! HALLGASD MEG ÚJRA A RETRÓ RETURNT! ❌"; playSound('save'); }
}

function finishDiscoRoomGame() {
    discoActive = false; stopCurrentSongMelody(); playSound('gameover');
    if (discoResultModal) {
        discoResultModal.style.display = "flex";
        const title = discoResultModal.querySelector("h1"); const text = discoResultModal.querySelector("p:last-of-type");
        if (title) title.textContent = "MISSION COMPLETE"; if (text) text.textContent = "MIND A 10 RETRÓ SLÁGERT SIKERESEN FELISMERTÉL! KATTINTS A KILÉPÉSHEZ!";
    }
}

// GYŐZELMI FINÁLÉ JAVÍTOTT DIRECT LINKEKKEL
if (discoResultMapButton) {
    discoResultMapButton.addEventListener("click", (e) => {
        e.preventDefault(); discoActive = false;
        const allScreens = [menuScreen, profileScreen, missionsScreen, footballScreen, renovationScreen, apesScreen, warzoneScreen, discoScreenNode, achievementsScreen, discoResultModal];
        allScreens.forEach(scr => { if (scr) scr.style.display = "none"; });
        const mainMap = document.querySelector(".missions-screen"); if (mainMap) mainMap.style.display = "flex";
        triggerArcadeConfettiRain();
        
        const videoPopup = document.querySelector("#wz-video-popup"); const videoElement = document.querySelector("#wz-birthday-video"); const audioElement = document.querySelector("#wz-birthday-audio");
        if (videoPopup && videoElement && audioElement) {
            videoElement.src = "https://google.com"; 
            audioElement.src = "https://google.com";
            videoPopup.style.display = "flex"; videoElement.currentTime = 0; audioElement.currentTime = 0; videoElement.play(); audioElement.play();
        }
    });
}

function triggerArcadeConfettiRain() {
    const colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff2255", "#00ff66", "#ffbc42"];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div"); confetti.className = "wz-confetti"; confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.floor(Math.random() * 100) + "vw"; confetti.style.top = "-20px"; const randomSize = Math.floor(Math.random() * 8) + 8;
            confetti.style.width = randomSize + "px"; confetti.style.height = randomSize + "px"; confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + "s";
            document.body.appendChild(confetti); setTimeout(() => { confetti.remove(); }, 2500);
        }, i * 20);
    }
}

setTimeout(() => {
    const playBtn = document.querySelector("#wz-play-video-btn"); const pauseBtn = document.querySelector("#wz-pause-video-btn"); const closeBtn = document.querySelector("#wz-close-video-btn"); const closeBannerBtn = document.querySelector("#wz-close-banner-btn");
    const videoElement = document.querySelector("#wz-birthday-video"); const audioElement = document.querySelector("#wz-birthday-audio"); const videoPopup = document.querySelector("#wz-video-popup"); const birthdayBanner = document.querySelector("#wz-birthday-banner");
    if (playBtn && videoElement && audioElement) { playBtn.onclick = function() { audioElement.currentTime = videoElement.currentTime; videoElement.play(); audioElement.play(); }; }
    if (pauseBtn && videoElement && audioElement) { pauseBtn.onclick = function() { videoElement.pause(); audioElement.pause(); }; }
    if (closeBtn && videoElement && audioElement && videoPopup && birthdayBanner) { closeBtn.onclick = function() { videoElement.pause(); audioElement.pause(); videoPopup.style.display = "none"; birthdayBanner.style.display = "flex"; audioElement.currentTime = 0; audioElement.play(); }; }
    if (closeBannerBtn && birthdayBanner && audioElement) { closeBannerBtn.onclick = function() { audioElement.pause(); birthdayBanner.style.display = "none"; showScreen(document.querySelector(".missions-screen")); }; }
}, 100);

if (discoEscapeBtn) { discoEscapeBtn.addEventListener("click", (e) => { e.preventDefault(); discoActive = false; stopCurrentSongMelody(); showScreen(missionsScreen); }); }

// ABSZOLÚT MŰKÖDŐ LEJÁTSZÁSI LISTA JAVÍTOTT DIRECT DRIVE LINKEKKEL
retroPlaylist.length = 0;
retroPlaylist.push(
    { title: "MARGE - VÁRATLAN NYÁR", cover: "☀️", mp3: "https://google.com" },
    { title: "THE PRODIGY - FIRESTARTER", cover: "🔥", mp3: "https://google.com" },
    { title: "BETON.HOFI X ANUBII\$ - TÜKÖRTEREM", cover: "🪞", mp3: "https://google.com" },
    { title: "METALLICA - ONE", cover: "🎸", mp3: "https://google.com" },
    { title: "4 NON BLONDES - WHATS GOING ON", cover: "📢", mp3: "https://google.com" },
    { title: "KOMODO - RADIO MIX", cover: "📻", mp3: "https://google.com" },
    { title: "DJ TIESTO - NYANA", cover: "🎧", mp3: "https://google.com" },
    { title: "KISTEHÉN - ELVISZI A SZÉL", cover: "🍃", mp3: "https://google.com" },
    { title: "THE CRANBERRIES - SALVATION", cover: "📀", mp3: "https://google.com" },
    { title: "BËLGA - RENDŐRMUNKA", cover: "👮", mp3: "https://google.com" }
);
