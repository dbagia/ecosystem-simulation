# Ecosystem Simulation

This is a small simulation of a simplified ecosystem. The goal is to model how different entities evolve over 
time based on a set of rules.

## Description

A program that simulates an ecosystem over a series of time steps ("ticks").

At each tick, all entities update their state according to the rules described below.

After each tick, the program outputs a summary, e.g. the count of each entity type.

### Plant

* Gains 1 energy per tick
* If its energy is 10 or greater, it reproduces (create a new plant with energy 5 in the same cell, reset its own energy to 5)

### Herbivore

* Loses 1 energy per tick
* Moves to an adjacent cell
* If it is on the same cell as a plant, it eats it (the herbivore gains 5 energy, the plant is removed)
* If its energy is 15 or greater, it reproduces (create a new herbivore with energy 7 in the same cell, reset its own energy to 7)
* If its energy is 0 it dies

### Carnivore

* Loses 1 energy per tick
* Moves two cells away
* If it is on the same cell as a herbivore, it eats it (the carnivore gains 8 energy, the herbivore is removed)
* Every 10 ticks, it reproduces (create a new carnivore in the same cell, split its energy between itself and the new one)
* If its energy is 0 it dies

### Environment

The world is a simple 2D grid.
