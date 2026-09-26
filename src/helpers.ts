import type {
  Direction,
  Energy,
  Entity,
  EntityConfig,
  EntityStorage,
  EntityType,
  Id,
  Position,
  Positive,
  StepConfig,
} from "./types.ts";

import { GRID_SIZE } from "./config.ts";

export const movementConfig: Record<
  Exclude<Direction, "none">,
  (xPos: number, yPos: number, step: number) => Position
> = {
  horizontal: moveHorizontal,
  vertical: moveVertical,
  diagonal: moveDiagonal,
};

function moveVertical(xPos: number, yPos: number, step: number) {
  const newY = yPos + step;

  return {
    x: xPos,
    y: newY > GRID_SIZE ? 0 : newY,
  };
}

function moveHorizontal(xPos: number, yPos: number, step: number) {
  let newX = xPos + step;
  let newY = yPos;

  if (newX > GRID_SIZE) {
    newX = 0;
    newY++;
    if (newY > GRID_SIZE) {
      newY = 0;
    }
  }

  return {
    x: newX,
    y: newY,
  };
}

function moveDiagonal(xPos: number, yPos: number, step: number) {
  const newX = xPos + step;
  const newY = yPos + step;

  return {
    x: newX > GRID_SIZE ? 0 : newX,
    y: newY > GRID_SIZE ? 0 : newY,
  };
}

export function getOrThrow<K, V>(key: K, map: Map<K, V>): V {
  const value = map.get(key);
  if (value === undefined) {
    throw new Error(`Key ${String(key)} does not exist`);
  }
  return value;
}

export function shouldReproduce(
  entityId: Id,
  entityConfig: EntityConfig,
  entityMap: Map<Id, Entity>,
) {
  const doesEntityExist = entityMap.has(entityId);

  if (!doesEntityExist) {
    console.error("A non-existent entity was passed to shouldReproduce", {
      entityId,
    });
    throw new Error(
      "Cannot continue. A non-existent entity was passed to shouldReproduce",
    );
  }

  const { reproductionKind } = entityConfig;

  switch (reproductionKind) {
    case "energy": {
      // if energy > maxEnergy, reproduce
      const maxEnergy = entityConfig.maxEnergy;
      const entityEnergy = getOrThrow(entityId, entityMap).energy
      return entityEnergy >= maxEnergy;
    }
    case "tick": {
      // if entity has lived until reproductionRate, reproduce
      const reproductionRate = entityConfig.reproductionRate;
      const entityAge = getOrThrow(entityId, entityMap).age
      return entityAge && entityAge % reproductionRate === 0;
    }

    default:
      /* eslint-disable */
      throw new Error(`Unknown reproductionKind: ${reproductionKind}`);
      /* eslint-enable */
  }
}

export function checkAndKillAnimal(
  entityId: Id,
  entityMap: Map<Id, Entity>,
  entityStorage: EntityStorage,
): boolean {
  if (!entityMap.has(entityId)) {
    return true;
  }
  if (getOrThrow(entityId, entityMap).energy <= 0) {
    console.log(
      `Energy is below 0, the ${entityStorage.entityType} will die ${String(entityId)}`,
    );
    removeEntity(entityStorage)(entityId);
    return true;
  }
  return false;
}

export function moveAnimal(
  entityId: Id,
  entityStorage: EntityStorage,
  stepConfig: StepConfig,
  currentPosition: Position,
): Position | null {
  const { step, direction } = stepConfig;
  const { x, y } = currentPosition;
  if (direction === "none") {
    console.log("This animal has no direction. Will not move");
    return null;
  }

  const newPosition = movementConfig[direction](x, y, step);
  changeEntityPosition(entityStorage)(entityId, newPosition);

  return newPosition;
}

export function eatAndGainEnergyIfFoodExistsAt(
  position: Position,
  predatorId: Id,
  predatorMap: Map<Id, Entity>,
  preyStorage: EntityStorage,
  energyFromFood: Energy,
) {
  if (!hasEntityAt(preyStorage)(position)) {
    return;
  }

  // sanity check
  if (!predatorMap.has(predatorId)) {
    console.error("A non-existent predator cannot eat a prey", { predatorId });
    return;
  }

  const allPrey = getEntitiesAt(preyStorage)(position);
  if (allPrey.length === 0) {
    console.log("No prey found at the current position", { position });
    return;
  }
  console.log("Found prey to be eaten", {
    predator: predatorId,
    preyIds: allPrey,
    prey: preyStorage.entityType,
    position,
  });

  allPrey.forEach((preyId: Id) => {
    removeEntity(preyStorage)(preyId);
    predatorMap.set(predatorId, {
      ...getOrThrow(predatorId, predatorMap),
      energy: getOrThrow(predatorId, predatorMap).energy + energyFromFood,
    });
    console.log(
      `Updated predator ${String(predatorId)}'s energy to ${getOrThrow(predatorId, predatorMap).energy.toString()}`,
    );
  });
}

export function generateOffspringId(entityMap: Map<Id, Entity>) {
  return Array.from(entityMap.keys()).sort((a, b) => b - a)[0] + 1;
}

export function toPositive(n: number): Positive {
  if (n <= 0) throw new Error(`Expected positive number, got ${String(n)}`);
  return n as Positive;
}

const posKey = (pos: Position): string =>
  `${String(pos.x)},${String(pos.y)}`;

// AI generated
export function createStorageForEntity(entityType: EntityType): EntityStorage {
  // We want a Bimap (2-way lookup structure)
  const entityToPos = new Map<number, Position>();
  const posToEntity = new Map<string, Set<number>>();

  return {
    entityType,
    entityToPos,
    posToEntity,
  };
}

const isWithinGrid = (pos: Position): boolean => {
  const { x, y } = pos;

  if (x < 0 || y < 0) return false;
  if (x > GRID_SIZE || y > GRID_SIZE) return false;

  return true;
};

// AI generated
export const addEntity =
  (entityStorage: EntityStorage) =>
  (entityId: number, pos: Position): void => {
    if (!isWithinGrid(pos)) {
      const msg = "Entity cannot be placed outside the grid";
      console.error(msg, { entityId, pos });
      throw new Error(msg);
    }
    const { entityToPos, posToEntity } = entityStorage;

    entityToPos.set(entityId, pos);

    const key = posKey(pos);
    if (!posToEntity.has(key)) {
      posToEntity.set(key, new Set());
    }
    getOrThrow(key, posToEntity).add(entityId);
  };

export const changeEntityPosition =
  (entityStorage: EntityStorage) =>
  (entityId: number, newPos: Position): void => {
    if (!isWithinGrid(newPos)) {
      const msg = "Entity cannot be placed outside the grid";
      console.error(msg, { entityId, newPos });
      throw new Error(msg);
    }
    const currentPosition = getPositionOf(entityStorage)(entityId);
    if (!currentPosition) {
      console.error(
        `Cannot move the entity ${entityStorage.entityType}. It is not present on the grid`,
      );
      return;
    }

    removeEntity(entityStorage)(entityId);
    addEntity(entityStorage)(entityId, newPos);
  };

// AI generated
export const removeEntity =
  (entityStorage: EntityStorage) =>
  (entityId: number): void => {
    const { entityToPos, posToEntity } = entityStorage;

    const pos = entityToPos.get(entityId);
    if (!pos) {
      console.error(
        "Could not remove entity. It does not exist in entityToPos Map",
        { entityId },
      );
      return;
    }

    entityToPos.delete(entityId);
    const key = posKey(pos);
    posToEntity.get(key)?.delete(entityId);
    if (posToEntity.get(key)?.size === 0) {
      posToEntity.delete(key);
    }
  };

// AI generated
export const getPositionOf =
  (entityStorage: EntityStorage) =>
  (entityId: number): Position | undefined => {
    const { entityToPos } = entityStorage;
    return entityToPos.get(entityId);
  };

// AI generated
export const hasEntityAt =
  (entityStorage: EntityStorage) =>
  (pos: Position): boolean => {
    const { posToEntity } = entityStorage;
    return posToEntity.has(posKey(pos));
  };

// AI generated
export const getEntitiesAt =
  (entityStorage: EntityStorage) =>
  (pos: Position): number[] => {
    const { posToEntity } = entityStorage;
    return [...(posToEntity.get(posKey(pos)) ?? [])];
  };

export const getEntityPosition = (
  entityId: Id,
  entityStorage: EntityStorage,
) => {
  const position = getPositionOf(entityStorage)(entityId);
  if (!position) {
    return null;
  }

  return position;
};

export const updateEntityEnergy = (
  entityId: Id,
  entityMap: Map<Id, Entity>,
  entityConfig: EntityConfig,
) => {
  const entity = getOrThrow(entityId, entityMap);
  const { energyChangePerTick } = entityConfig;
  const newEnergy = entity.energy + energyChangePerTick;
  // Update current plant's energy
  entityMap.set(entityId, { ...entity, energy: newEnergy });
  return entityMap.get(entityId);
};

export const incrementEntityAge = (
  entityId: Id,
  entityMap: Map<Id, Entity>,
) => {
  if (!entityMap.has(entityId)) {
    console.error("Cannot increment age. Entity does not exist", { entityId });
    return;
  }
  const entity = getOrThrow(entityId, entityMap);
  entityMap.set(entityId, { ...entity, age: entity.age + 1 });
  return getOrThrow(entityId, entityMap);
};
