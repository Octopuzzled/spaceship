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
    let list = "";
    for (let i = 0; i < inventory.length; i++) {
        list += `<li>${inventory[i]}</li>`;
    }
    ul.innerHTML = list;
}

function buyRepairkit() {
    let amount = Number(document.getElementById("nav-repairkit-input").value);
    if (currency >= repairkit_price * amount) {
        for (let i = 0; i < amount; i++) {
            inventory.push("repairkit");
        }
        currency -= repairkit_price * amount;
        showInventory();

        statusMessage(`You bought ${amount} repairkits.`);
    } else {
        errorMessage(
            `You don't have enough currency to buy ${amount} repairkits.`,
        );
    }
}

function buyShield() {
    let amount = Number(document.getElementById("nav-shield-input").value);
    if (currency >= shield_price * amount) {
        for (let i = 0; i < amount; i++) {
            inventory.push("shield");
        }
        currency -= shield_price * amount;
        showInventory();

        statusMessage(`You bought ${amount} shields.`);
    } else {
        errorMessage(
            `You don't have enough currency to buy ${amount} shields.`,
        );
    }
}

function useRepairkit() {
    if (life <= 100 - reparekit_effect && inventory.includes("repairkit")) {
        life += reparekit_effect;
        removeFromList(inventory, "repairkit");
        showInventory();
        showLife();
        statusMessage(`You used a repairkit.`);
    } else {
        errorMessage(
            `Your life is high enough or you don't have enough money. No need to use a repairkit.`,
        );
    }
}

function useShield() {
    if (inventory.includes("shield")) {
        shielded = true;
        document.getElementById("ship-image").src =
            "assets/img/ship-shielded.svg";
        removeFromList(inventory, "shield");
        showInventory();
        statusMessage(`You used a shield.`);
    } else {
        errorMessage(`You don't have a shield yet.`);
    }
}

function gettingHit() {
    let hitpoints = Number(document.getElementById("nav-hitpoint-input").value);

    if (shielded) {
        life -= hitpoints * 0.5;
        statusMessage(`You were hit and lost ${hitpoints * 0.5} armor.`);
        shielded = false;
        document.getElementById("ship-image").src = "assets/img/ship.svg";
    } else {
        life -= hitpoints;
        statusMessage(`You were hit and lost ${hitpoints} armor.`);
    }
    showLife();
    if (life <= 0) {
        document.getElementById("ship-image").src =
            "assets/img/ship-destroyed.svg";
        gameOver(`Game Over.`);
    }
}

function showLife() {
    const percent = Math.max(0, Math.min(100, Math.round(life)));
    const step = Math.round(percent / 10) * 10; // 0, 10, 20 ... 100
    const lifeElement = document.getElementById("life");

    for (let i = 0; i < 100; i++) {
        lifeElement.classList.remove("life--" + i);
    }

    lifeElement.classList.add("life--" + step);
    lifeElement.classList.toggle("life--low", percent <= 30);
    document.getElementById("life-value").textContent = percent;
}
