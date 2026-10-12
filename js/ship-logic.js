let shielded = false;

function removeFromList(array, item) {
    let index = array.indexOf(item);
    array.splice(index, 1);
}

function getAmountInList(array, value) {
    let matchingItems = array.filter(function (item) {
        return item === value;
    });
    return matchingItems.length;
}

function renderStatus() {
    terminalOutput.innerHTML += `
    <table>
        <tr>
            <td>Spaceship:</td>
            <td>${spaceship}</td>
        </tr>
        <tr>
            <td>Life:</td>
            <td>${life}</td>
        </tr>
        <tr>
            <td>Currency:</td>
            <td>${currency}</td>
        </tr>
        <tr>
            <td>Reparekits:</td>
            <td>${getAmountInList(inventory, "repairkit")}</td>
        </tr>
        <tr>
            <td>Shields:</td>
            <td>${getAmountInList(inventory, "shield")}</td>
        </tr>
    </table>
    `;
    showInventory();
}

function showInventory() {
    const ul = document.getElementById("inventory-list");
    list = [];
    for (i = 0; i < inventory.length; i++) {
        list += `<li>${inventory[i]}</li>`;
    }
    ul.innerHTML = list;
}

function buy_repairkit() {
    let amount = Number(document.getElementById("nav-repairkit-input").value);
    if (currency >= shield_price * amount) {
        for (let i = 0; i < amount; i++) {
            inventory.push("repairkit");
        }
        currency -= repairkit_price * amount;
        showInventory();

        status_message(`You bought ${amount} repairkits.`);
    } else {
        error_message(
            `You don't have enough currency to buy ${amount} repairkits.`,
        );
    }
}

function buy_shield() {
    let amount = Number(document.getElementById("nav-shield-input").value);
    if (currency >= shield_price * amount) {
        for (let i = 0; i < amount; i++) {
            inventory.push("shield");
        }
        currency -= shield_price * amount;
        showInventory();

        status_message(`You bought ${amount} shields.`);
    } else {
        error_message(
            `You don't have enough currency to buy ${amount} shields.`,
        );
    }
}

function use_repairkit() {
    if (life <= 100 - reparekit_effect && inventory.includes("repairkit")) {
        life += reparekit_effect;
        removeFromList(inventory, "repairkit");
        showInventory();
        status_message(`You used a repairkit.`);
    } else {
        error_message(
            `Your life is high enough or you don't have enough money. No need to use a repairkit.`,
        );
    }
}

function use_shield() {
    if (inventory.includes("shield")) {
        shielded = true;
        document.getElementById("ship-image").src = "assets/img/ship-shielded.svg"; 
        removeFromList(inventory, "shield");
        showInventory();
        status_message(`You used a shield.`);
    } else {
        error_message(`You don't have a shield yet.`);
    }
}

function getting_hit() {
    let hitpoints = Number(document.getElementById("nav-hitpoint-input").value);

    if (shielded) {
        life -= hitpoints * 0.5;
        status_message(`You were hit and lost ${hitpoints * 0.5} armor.`);
        shielded = false;
        document.getElementById("ship-image").src = "assets/img/ship.svg"; 
    } else {
        life -= hitpoints;
        status_message(`You were hit and lost ${hitpoints} armor.`);
    }
    if (life <= 0) {
        document.getElementById("ship-image").src = "assets/img/ship-destroyed.svg";
        gameOver(`Game Over.`);
    }
}
