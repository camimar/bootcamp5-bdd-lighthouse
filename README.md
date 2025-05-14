# Cypress + Cucumber + LightHouse: Movie Search Tests + Performance Audit

## Installation

1. Clone the repository
2. Install Node dependencies:

```bash
npm install
```

3. Install Cypress

```bash
npm install cypress
```

4. Install Cucumber Preprocessor

```bash
npm install @badeball/cypress-cucumber-preprocessor --save-dev
```

5. Install esbuild for running BDD tests

```bash
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
```

6. Install LightHouse: first install cypress-audit

```bash
npm install cypress-audit --save-dev
```

7. Installing commands for LightHouse

```bash
npm install lighthouse fs
```

## Execution

Interactive mode (development):

```bash
npx cypress open
```

Headless mode (CI/terminal):

```bash
npx cypress run --spec "cypress/e2e/features/search.feature"
```

Run specific Cucumber scenario: Add @focus tag to scenario in .feature file

```bash
npx cypress open --env TAGS="@focus"
```

Or add a "@only" Tag before the Specific Scenario

Execution command for LightHouse spec

```bash
npx cypress run --spec cypress/e2e/performance/studio-perfo.cy.js
```
