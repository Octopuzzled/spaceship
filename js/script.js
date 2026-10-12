let spaceship = "Potatoqueen";
let armor = 100;
let currency = 100;
let reparekits_owned = 0;
let reparekit_effect = 20;
let repairkit_price = 35;
let standard_hit = 30;

const terminalOutput = document.getElementById("terminal-output");

function terminalClear() {
    terminalOutput.innerHTML = "";
}

function renderStatus() {
    terminalOutput.innerHTML += `
    <table>
        <tr>
            <td>Spaceship:</td>
            <td>${spaceship}</td>
        </tr>
        <tr>
            <td>Armor:</td>
            <td>${armor}</td>
        </tr>
        <tr>
            <td>Currency:</td>
            <td>${currency}</td>
        </tr>
        <tr>
            <td>Reparekits:</td>
            <td>${reparekits_owned}</td>
        </tr>
    </table>
    `;
}

function use_repairkit() {
    if (armor <= 100 - reparekit_effect && reparekits_owned >= 1) {
        armor += reparekit_effect;
        reparekits_owned -= 1;
        status_message(`You used a repairkit. You now own ${reparekits_owned}.`);
    } else {
        error_message(
            `Your armour is high enough. No need to use a repairkit.`,
        );
    }
}

function buy_repairkit() {
    let amount = Number(document.getElementById("nav-repairkit-input").value);
    if (currency >= repairkit_price * amount) {
        reparekits_owned += amount;
        currency -= repairkit_price * amount;

        status_message(
            `You bought ${amount} repairkits. You now own ${reparekits_owned}.`,
        );
    } else {
        error_message(
            `You don't have enough currency to buy ${amount} repairkits.`,
        );
    }
}

function getting_hit() {
    let hitpoints = Number(document.getElementById("nav-hitpoint-input").value);
    armor -= hitpoints;
    if (armor <= 0) {
        gameOver(`Game Over.`);
    } else {
        status_message(`You were hit and lost ${hitpoints} armor.`);
    }
}

function restart() {
    armor = 100;
    currency = 100;
    reparekits_owned = 0;
    reparekit_effect = 20;
    repairkit_price = 35;
    standard_hit = 30;

    document.getElementById("restart-button").hidden = true;
    document.getElementById("status-button").disabled = false;
    document.getElementById("buy-button").disabled = false;
    document.getElementById("repair-button").disabled = false;
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
    document.getElementById("buy-button").disabled = true;
    document.getElementById("repair-button").disabled = true;
    document.getElementById("hit-button").disabled = true;
}
