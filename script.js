let resources = {
    wood: 60,
    stone: 30,
    gold: 20
};

let buildings = {
    sawmill: { level: 0, cost: { wood: 10, stone: 5, gold: 2 }, production: { wood: 1, stone: 0, gold: 0 } },
    quarry: { level: 0, cost: { wood: 20, stone: 10, gold: 5 }, production: { wood: 0, stone: 1, gold: 0 } },
    mine: { level: 0, cost: { wood: 30, stone: 15, gold: 10 }, production: { wood: 0, stone: 0, gold: 1 } }
};

function gatherResources() {
    for (let building in buildings) {
        if (buildings[building].level > 0) {
            resources.wood += buildings[building].production.wood * buildings[building].level;
            resources.stone += buildings[building].production.stone * buildings[building].level;
            resources.gold += buildings[building].production.gold * buildings[building].level;
        }
    }
    updateResourceDisplay();
}

function build(building) {
    if (canAfford(buildings[building].cost)) {
        payCost(buildings[building].cost);
        buildings[building].level++;
        updateResourceDisplay();
    } else {
        alert("Not enough resources to build " + building);
    }
}

function upgrade(building) {
    let upgradeCost = {
        wood: buildings[building].cost.wood * (buildings[building].level + 1),
        stone: buildings[building].cost.stone * (buildings[building].level + 1),
        gold: buildings[building].cost.gold * (buildings[building].level + 1)
    };

    if (canAfford(upgradeCost)) {
        payCost(upgradeCost);
        buildings[building].level++;
        updateResourceDisplay();
    } else {
        alert("Not enough resources to upgrade " + building);
    }
}

function canAfford(cost) {
    return resources.wood >= cost.wood && resources.stone >= cost.stone && resources.gold >= cost.gold;
}

function payCost(cost) {
    resources.wood -= cost.wood;
    resources.stone -= cost.stone;
    resources.gold -= cost.gold;
}

function calculateResourcesPerIteration() {
    let resourcesPerIteration = { wood: 0, stone: 0, gold: 0 };
    for (let building in buildings) {
        resourcesPerIteration.wood += buildings[building].production.wood * buildings[building].level;
        resourcesPerIteration.stone += buildings[building].production.stone * buildings[building].level;
        resourcesPerIteration.gold += buildings[building].production.gold * buildings[building].level;
    }
    return resourcesPerIteration;
}

function updateResourceDisplay() {
    document.getElementById("wood").innerText = resources.wood;
    document.getElementById("stone").innerText = resources.stone;
    document.getElementById("gold").innerText = resources.gold;

    let resourcesPerIteration = calculateResourcesPerIteration();
    document.getElementById("resources-per-iteration").innerText = `Wood: ${resourcesPerIteration.wood}, Stone: ${resourcesPerIteration.stone}, Gold: ${resourcesPerIteration.gold}`;

    for (let building in buildings) {
        document.getElementById(`${building}-cost-wood`).innerText = buildings[building].cost.wood;
        document.getElementById(`${building}-cost-stone`).innerText = buildings[building].cost.stone;
        document.getElementById(`${building}-cost-gold`).innerText = buildings[building].cost.gold;

        document.getElementById(`${building}-benefit-wood`).innerText = buildings[building].production.wood;
        document.getElementById(`${building}-benefit-stone`).innerText = buildings[building].production.stone;
        document.getElementById(`${building}-benefit-gold`).innerText = buildings[building].production.gold;
    }
}

setInterval(gatherResources, 500);
