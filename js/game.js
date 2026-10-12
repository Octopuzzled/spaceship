let spaceship = "Potatoqueen";
let life = 100;
let currency = 100;
let reparekit_effect = 20;
let repairkit_price = 35;
let shield_price = 15;
let standard_hit = 30;
let inventory = [];

const terminalOutput = document.getElementById("terminal-output");

function terminalClear() {
    terminalOutput.innerHTML = "";
}

function restart() {
    life = 100;
    currency = 100;
    reparekit_effect = 20;
    repairkit_price = 35;
    standard_hit = 30;

    inventory = [];
    document.getElementById("inventory-list").innerHTML = "";

    showLife();

    document.getElementById("ship-image").src = "assets/img/ship.svg";

    document.getElementById("restart-button").hidden = true;
    document.getElementById("status-button").disabled = false;
    document.getElementById("buy-repairkit-button").disabled = false;
    document.getElementById("buy-shield-button").disabled = false;
    document.getElementById("repair-repairkit-button").disabled = false;
    document.getElementById("repair-shield-button").disabled = false;
    document.getElementById("hit-button").disabled = false;
}

function error_message(message) {
    terminalOutput.innerHTML += `<p class="terminal__error-message">${message}</p>`;
}

function status_message(message) {
    terminalOutput.innerHTML += `<p class="terminal__status-message">${message}</p>`;
}

function gameOver(message) {
    terminalOutput.innerHTML += `<p class="terminal__game-over-message">${message}</p>`;
    document.getElementById("restart-button").hidden = false;
    document.getElementById("status-button").disabled = true;
    document.getElementById("buy-repairkit-button").disabled = true;
    document.getElementById("buy-shield-button").disabled = true;
    document.getElementById("repair-repairkit-button").disabled = true;
    document.getElementById("repair-shield-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
}
