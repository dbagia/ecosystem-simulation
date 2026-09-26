import type { Id, Entity } from "./types.ts";
import { createStorageForEntity, addEntity } from "./helpers.ts";

const plants = new Map<Id, Entity>();
const herbivores = new Map<Id, Entity>();
const carnivores = new Map<Id, Entity>();

const plantStorage = createStorageForEntity("plant");
const herbivoreStorage = createStorageForEntity("herbivore");
const carnivoreStorage = createStorageForEntity("carnivore");

const addPlant = addEntity(plantStorage);
const addHerbivore = addEntity(herbivoreStorage);
const addCarnivore = addEntity(carnivoreStorage);

function loadData() {
  plants.set(1, { energy: 5, age: 0 });
  plants.set(2, { energy: 7, age: 0 });
  plants.set(3, { energy: 2, age: 0 });
  plants.set(4, { energy: 1, age: 0 });
  plants.set(5, { energy: 3, age: 0 });
  plants.set(6, { energy: 3, age: 0 });
  plants.set(7, { energy: 1, age: 0 });
  plants.set(8, { energy: 5, age: 0 });
  plants.set(9, { energy: 4, age: 0 });
  plants.set(10, { energy: 7, age: 0 });
  plants.set(11, { energy: 5, age: 0 });
  plants.set(12, { energy: 5, age: 0 });

  herbivores.set(10, { energy: 14, age: 0 });
  herbivores.set(11, { energy: 14, age: 0 });
  herbivores.set(12, { energy: 14, age: 0 });
  herbivores.set(13, { energy: 14, age: 0 });
  herbivores.set(14, { energy: 14, age: 0 });
  herbivores.set(15, { energy: 14, age: 0 });
  herbivores.set(16, { energy: 14, age: 0 });
  herbivores.set(17, { energy: 14, age: 0 });
  herbivores.set(18, { energy: 30, age: 0 });
  herbivores.set(19, { energy: 60, age: 0 });
  herbivores.set(20, { energy: 40, age: 0 });
  herbivores.set(21, { energy: 14, age: 0 });
  herbivores.set(22, { energy: 14, age: 0 });
  herbivores.set(23, { energy: 14, age: 0 });
  herbivores.set(24, { energy: 14, age: 0 });
  herbivores.set(25, { energy: 14, age: 0 });
  herbivores.set(26, { energy: 14, age: 0 });
  herbivores.set(27, { energy: 14, age: 0 });
  herbivores.set(28, { energy: 14, age: 0 });
  herbivores.set(29, { energy: 14, age: 0 });
  herbivores.set(30, { energy: 14, age: 0 });

  carnivores.set(100, { energy: 15, age: 0 });
  carnivores.set(101, { energy: 20, age: 0 });
  carnivores.set(102, { energy: 21, age: 0 });
  carnivores.set(103, { energy: 5, age: 0 });
  carnivores.set(104, { energy: 50, age: 3 });
  carnivores.set(105, { energy: 25, age: 7 });
  carnivores.set(106, { energy: 20, age: 1 });

  // Position entities on the grid
  addPlant(1, { x: 2, y: 2 });
  addPlant(2, { x: 3, y: 5 });
  addPlant(3, { x: 6, y: 3 });
  addPlant(4, { x: 15, y: 9 });
  addPlant(5, { x: 4, y: 11 });
  addPlant(6, { x: 7, y: 7 });
  addPlant(7, { x: 10, y: 9 });
  addPlant(8, { x: 2, y: 9 });
  addPlant(9, { x: 9, y: 13 });
  addPlant(10, { x: 12, y: 15 });
  addPlant(11, { x: 2, y: 2 });
  addPlant(12, { x: 0, y: 2 });

  addHerbivore(10, { x: 1, y: 11 });
  addHerbivore(11, { x: 4, y: 7 });
  addHerbivore(12, { x: 11, y: 11 });
  addHerbivore(13, { x: 5, y: 7 });
  addHerbivore(14, { x: 8, y: 9 });
  addHerbivore(15, { x: 13, y: 11 });
  addHerbivore(16, { x: 2, y: 8 });
  addHerbivore(17, { x: 1, y: 5 });
  addHerbivore(18, { x: 1, y: 5 });
  addHerbivore(19, { x: 2, y: 5 });
  addHerbivore(20, { x: 1, y: 6 });
  addHerbivore(21, { x: 3, y: 6 });
  addHerbivore(22, { x: 3, y: 7 });
  addHerbivore(23, { x: 5, y: 8 });
  addHerbivore(24, { x: 6, y: 8 });
  addHerbivore(25, { x: 5, y: 9 });
  addHerbivore(26, { x: 9, y: 5 });
  addHerbivore(27, { x: 8, y: 6 });
  addHerbivore(28, { x: 12, y: 8 });
  addHerbivore(29, { x: 13, y: 2 });
  addHerbivore(30, { x: 15, y: 15 });

  addCarnivore(100, { x: 1, y: 6 });
  addCarnivore(101, { x: 9, y: 11 });
  addCarnivore(102, { x: 10, y: 3 });
  addCarnivore(103, { x: 2, y: 15 });
  addCarnivore(104, { x: 2, y: 12 });
  addCarnivore(105, { x: 12, y: 15 });
  addCarnivore(106, { x: 4, y: 9 });
}

export {
  plants,
  herbivores,
  carnivores,
  plantStorage,
  herbivoreStorage,
  carnivoreStorage,
  addPlant,
  addHerbivore,
  addCarnivore,
  loadData,
};
