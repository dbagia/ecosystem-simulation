export type Energy = number;
export type Id = number;

export type Entity = {
  energy: Energy;
  age: number;
};

export type ReproductionConfig =
  | { reproductionKind: "energy"; maxEnergy: Energy }
  | { reproductionKind: "tick"; reproductionRate: number };

export type Direction = "horizontal" | "vertical" | "diagonal" | "none";

export type Positive = number & { readonly __brand: "Positive" };

export type StepConfig =
  | { step: Positive; direction: Exclude<Direction, "none"> }
  | { step: 0; direction: "none" };

export type EntityConfig = ReproductionConfig & {
  energyChangePerTick: number;
  stepConfig: StepConfig;
};

export type Position = {
  x: number;
  y: number;
};

export type EntityType = "plant" | "herbivore" | "carnivore";

export type EntityStorage = {
  entityType: EntityType;
  entityToPos: Map<number, Position>;
  posToEntity: Map<string, Set<number>>;
};
