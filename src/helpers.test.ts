import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { plantConfig } from "./config.ts";
import type { Id, Entity } from "./types.ts";

import { shouldReproduce } from "./helpers.ts";

void describe("shouldReproduce", () => {
  void it("throws when entity does not exist", () => {
    const plants = new Map<Id, Entity>();
    const entityId: Id = 12;
    assert.throws(() => shouldReproduce(entityId, plantConfig, plants));
  });

  void it("entity should reproduce if its energy >= maxEnergy", () => {
    const plants = new Map<Id, Entity>();
    plants.set(1, { energy: 15, age: 0 });
    const entityId: Id = 1;
    const result = shouldReproduce(entityId, plantConfig, plants);
    assert.equal(result, true);
  });

  void it("entity should NOT reproduce if its energy < maxEnergy", () => {
    const plants = new Map<Id, Entity>();
    plants.set(1, { energy: 5, age: 0 });
    const entityId: Id = 1;
    const result = shouldReproduce(entityId, plantConfig, plants);
    assert.equal(result, false);
  });
});
