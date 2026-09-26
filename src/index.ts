import {
  loadData,
  plants,
  herbivores,
  carnivores,
  plantStorage,
  herbivoreStorage,
  carnivoreStorage,
  addPlant,
  addHerbivore,
  addCarnivore,
} from "./data.ts";

import {
  getOrThrow,
  getEntityPosition,
  updateEntityEnergy,
  incrementEntityAge,
  eatAndGainEnergyIfFoodExistsAt,
  generateOffspringId,
  moveAnimal,
  shouldReproduce,
  checkAndKillAnimal,
} from "./helpers.ts";

import { plantConfig, herbivoreConfig, carnivoreConfig } from "./config.ts";

function processPlants() {
  plants.forEach((_entity, id, map) => {
    const plantPosition = getEntityPosition(id, plantStorage);

    if (!plantPosition) {
      return;
    }

    updateEntityEnergy(id, map, plantConfig);
    incrementEntityAge(id, map);

    if (shouldReproduce(id, plantConfig, map)) {
      console.log(
        `Plant ${String(id)} with energy ${String(getOrThrow(id, map).energy)} will reproduce`,
      );
      const offspringId = generateOffspringId(map);
      // create new offspring
      map.set(offspringId, { age: 0, energy: 5 });
      // place the offspring in the same cell as its parent
      addPlant(offspringId, plantPosition);
      // reset current plant's energy
      map.set(id, { ...getOrThrow(id, map), energy: 5 });
    }
  });
}

function processHerbivores() {
  herbivores.forEach((_entity, id, map) => {
    const herbivorePosition = getEntityPosition(id, herbivoreStorage);
    if (!herbivorePosition) {
      return;
    }

    updateEntityEnergy(id, map, herbivoreConfig);
    incrementEntityAge(id, map);

    if (checkAndKillAnimal(id, map, herbivoreStorage)) {
      return;
    }

    const maybeNewPosition = moveAnimal(
      id,
      herbivoreStorage,
      herbivoreConfig.stepConfig,
      herbivorePosition,
    );

    if (!maybeNewPosition) {
      console.error("Could not move herbivore", { id });
      return;
    }

    const newPosition = maybeNewPosition;

    eatAndGainEnergyIfFoodExistsAt(newPosition, id, map, plantStorage, 5);

    if (!shouldReproduce(id, herbivoreConfig, map)) {
      return;
    }

    console.log(
      `Herbivore ${String(id)} with energy ${String(getOrThrow(id, map).energy)} will reproduce`,
    );
    const offspringId = generateOffspringId(map);
    console.log(`New herbivore offspring is ${String(offspringId)}`);
    // create new offspring
    map.set(offspringId, { age: 0, energy: 7 });
    // place the offspring in the same cell as its parent
    console.log(`Adding offspring at postion`, {
      offspringId,
      position: newPosition,
      offspring: map.get(offspringId),
    });
    addHerbivore(offspringId, newPosition);
    // reset current herbivore's energy
    map.set(id, { ...getOrThrow(id, map), energy: 7 });
  });
}

function processCarnivores() {
  carnivores.forEach((_entity, id, map) => {
    const carnivorePosition = getEntityPosition(id, carnivoreStorage);

    if (!carnivorePosition) {
      return;
    }

    updateEntityEnergy(id, map, carnivoreConfig);
    incrementEntityAge(id, map);

    if (checkAndKillAnimal(id, map, carnivoreStorage)) {
      return;
    }

    const maybeNewPosition = moveAnimal(
      id,
      carnivoreStorage,
      carnivoreConfig.stepConfig,
      carnivorePosition,
    );

    if (!maybeNewPosition) {
      console.error("Could not move carnivore", { id });
      return;
    }

    const newPosition = maybeNewPosition;

    eatAndGainEnergyIfFoodExistsAt(newPosition, id, map, herbivoreStorage, 8);

    if (!shouldReproduce(id, carnivoreConfig, map)) {
      return;
    }

    const parentEnergy = getOrThrow(id, map).energy;
    const splitEnergy = Math.round(parentEnergy / 2);
    console.log(`Carnivore ${String(id)} with energy ${String(parentEnergy)} will reproduce`);
    const offspringId = generateOffspringId(map);
    console.log(`New carnivore offspring is ${String(offspringId)}`);
    // create new offspring
    map.set(offspringId, { age: 0, energy: splitEnergy });
    // place the offspring in the same cell as its parent
    console.log(`Adding offspring at postion`, {
      offspringId,
      position: newPosition,
      offspring: map.get(offspringId),
    });
    addCarnivore(offspringId, newPosition);
    // reset current carnivore's energy
    map.set(id, { ...getOrThrow(id, map), energy: splitEnergy });
  });
}

function beginSimulation() {
  processPlants();
  processHerbivores();
  processCarnivores();

  console.log(`Total plants on the grid`, plantStorage.entityToPos.size);
  console.log(
    `Total herbivores on the grid`,
    herbivoreStorage.entityToPos.size,
  );
  console.log(
    `Total carnivores on the grid`,
    carnivoreStorage.entityToPos.size,
  );
}

function main() {
  let count = 0;
  loadData();
  const intervalId = setInterval(() => {
    count++;
    console.log(
      `----------------------------Tick ${String(count)}----------------------------`,
    );
    beginSimulation();
    if (count >= 100) {
      console.log(`Total ticks ran: ${String(count)}`);
      clearInterval(intervalId);
    }
  }, 1000);
}

main();
