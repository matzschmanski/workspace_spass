let resources = {
    wood: 30,
    stone: 15,
    gold: 10
};

let buildings = {
    sawmill: { level: 0, cost: { wood: 10, stone: 5, gold: 2 }, production: { wood: 1, stone: 0, gold: 0 } },
    quarry: { level: 0, cost: { wood: 20, stone: 10, gold: 5 }, production: { wood: 0, stone: 1, gold: 0 } },
    mine: { level: 0, cost: { wood: 30, stone: 15, gold: 10 }, production: { wood: 0, stone: 0, gold: 1 } }
};

let statistics = {
    totalResources: 0,
    totalBuildings: 0,
    totalUpgrades: 0
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
    updateStatistics();
}

function build(building) {
    if (canAfford(buildings[building].cost)) {
        payCost(buildings[building].cost);
        buildings[building].level++;
        statistics.totalBuildings++;
        updateResourceDisplay();
        updateStatistics();
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
        statistics.totalUpgrades++;
        updateResourceDisplay();
        updateStatistics();
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
    statistics.totalResources += cost.wood + cost.stone + cost.gold;
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

function updateStatistics() {
    document.getElementById("total-resources").innerText = statistics.totalResources;
    document.getElementById("total-buildings").innerText = statistics.totalBuildings;
    document.getElementById("total-upgrades").innerText = statistics.totalUpgrades;
}

function resetGame() {
    resources = { wood: 30, stone: 15, gold: 10 };
    buildings = {
        sawmill: { level: 0, cost: { wood: 10, stone: 5, gold: 2 }, production: { wood: 1, stone: 0, gold: 0 } },
        quarry: { level: 0, cost: { wood: 20, stone: 10, gold: 5 }, production: { wood: 0, stone: 1, gold: 0 } },
        mine: { level: 0, cost: { wood: 30, stone: 15, gold: 10 }, production: { wood: 0, stone: 0, gold: 1 } }
    };
    statistics = { totalResources: 0, totalBuildings: 0, totalUpgrades: 0 };
    updateResourceDisplay();
    updateStatistics();
}

function saveGame() {
    localStorage.setItem("resources", JSON.stringify(resources));
    localStorage.setItem("buildings", JSON.stringify(buildings));
    localStorage.setItem("statistics", JSON.stringify(statistics));
}

function loadGame() {
    resources = JSON.parse(localStorage.getItem("resources")) || resources;
    buildings = JSON.parse(localStorage.getItem("buildings")) || buildings;
    statistics = JSON.parse(localStorage.getItem("statistics")) || statistics;
    updateResourceDisplay();
    updateStatistics();
}

setInterval(gatherResources, 500);

async function fetchStories() {
    const response = await fetch('stories.json');
    const stories = await response.json();
    return stories;
}

async function loadMoreStories() {
    const stories = await fetchStories();
    const storyCards = document.getElementById('story-cards');
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.classList.add('story-card');
        storyCard.innerHTML = `<h3>${story.title}</h3><p>${story.content}</p>`;
        storyCards.appendChild(storyCard);
    });
}

document.getElementById('load-more').addEventListener('click', loadMoreStories);
