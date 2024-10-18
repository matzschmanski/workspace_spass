# html idle game

## Game Concept

The game is set in a fantasy universe where players manage a kingdom, gather resources, and upgrade their kingdom over time. The game is only local browser-based and plays automatically over time.

### Setting

Players will manage a kingdom in a fantasy universe, where they can build structures, train troops, and explore new territories.

### Main Gameplay Mechanics

1. **Resource Gathering and Management**
   - Players will gather resources over time automatically.
   - Resources can be used to build and upgrade structures or units.
   - Structures and units can generate more resources or provide other benefits.
   - Players can manage their resources to optimize their growth and progress.

2. **Quests and Achievements**
   - Players will have quests to complete, which provide rewards upon completion.
   - Achievements can be unlocked by reaching certain milestones or completing specific tasks.
   - Quests and achievements can provide additional resources, bonuses, or other benefits.
   - Players can track their progress and strive to complete all quests and achievements.

### Objectives

- Manage and upgrade your kingdom over time.
- Gather resources and use them to build and upgrade structures or units.
- Complete quests and unlock achievements for rewards and benefits.
- Track your progress and strive to complete all quests and achievements.

## How to Run the Game

1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser.
3. The game will start automatically, and resources will be gathered over time.
4. Use the buttons to build and upgrade structures or units to optimize your resource generation and progress.

## Implemented Features

- **Resource Gathering**: Resources (wood, stone, gold) are gathered automatically over time.
- **Building Structures**: Players can build structures (sawmill, quarry, mine) to generate more resources.
- **Upgrading Units**: Players can upgrade structures to increase resource production.
- **Resource Management**: Players can manage their resources to optimize growth and progress.
- **Quests**: Players can complete quests to earn rewards and track their progress.

## Running Tests

To run the unit tests for the game, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm test` to execute the unit tests using Jest.

## Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline is configured to run the tests on every pull request and merge to the main branch. The configuration file for the GitHub Actions workflow can be found at `.github/workflows/ci.yml`.
