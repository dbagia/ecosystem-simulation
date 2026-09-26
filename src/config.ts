import type { EntityConfig } from "./types.ts";
import {
  toPositive,
} from "./helpers.ts";

const GRID_SIZE = 15

/**
 * Some explanations:
 * maxEnergy - Its the value an entity can reach before it reproduces (after which its energy is reset)
 * reproductionRate - The number of ticks after which an entity reproduces
**/
const plantConfig: EntityConfig = {
  energyChangePerTick: 1,
  reproductionKind: "energy",
  maxEnergy: 10,
  stepConfig: {
    step: 0,
    direction: "none",
  },
};

const herbivoreConfig: EntityConfig = {
  energyChangePerTick: -1,
  reproductionKind: "energy",
  maxEnergy: 15,
  stepConfig: {
    step: toPositive(1),
    direction: "horizontal",
  },
};

const carnivoreConfig: EntityConfig = {
  energyChangePerTick: -1,
  reproductionKind: "tick",
  reproductionRate: 10,
  stepConfig: {
    step: toPositive(2),
    direction: "vertical",
  },
};

export {
  GRID_SIZE,
  plantConfig,
  herbivoreConfig,
  carnivoreConfig
}
