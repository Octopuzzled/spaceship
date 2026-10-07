let spaceship = "Potatoqueen";
let armor = 100;
let currency = 100;
let reparekits_owned = 0;
let reparekit_effect = 20;
let repairkit_price = 35;
let standard_hit = 30;

function getShipStatus() {
    console.log("Spaceship name: " + spaceship);
    console.log("Armor: " + armor);
    console.log("Currency: " + currency);
    console.log("Reparekits owned: " + reparekits_owned);
}

function use_repairkit(amount) {
    if (armor < 100 && reparekits_owned >= 1) {
        armor += reparekit_effect * amount;
        reparekits_owned -= 1;
        console.log(armor);
    } else {
        console.log("Nor repairkit available.");
        
    }
}

function buy_repairkit(amount) {
    reparekits_owned += amount;
    currency -= repairkit_price * amount;
    console.log(reparekits_owned);
}

function getting_hit() {
    armor -= standard_hit;
    console.log(armor);
    if (armor <= 0) {console.log("Game Over")};
}
