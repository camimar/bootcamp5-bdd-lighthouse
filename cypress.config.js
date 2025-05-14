const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { lighthouse, prepareAudit } = require("cypress-audit");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: "**/*.{feature,cy.js}",
    async setupNodeEvents(on, config) {
      //Cucumber plugin
      await addCucumberPreprocessorPlugin(on, {
        ...config,
        stepDefinitions: "cypress/e2e/step_definitions",
      });

      //Esbuild para Cucumber
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      //cypress-audit for Lighthouse
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      const fs = require("fs")
      const path = require("path")
      
      on("task", {
        lighthouse: lighthouse({
          disableDeviceEmulation: true,
          formFactor: "desktop",
          screenEmulation: { disabled: true },
          output: "html"
        }),
      
        log(message) {
          console.log(message)
          return null
        },
      
        saveReport({ report, fileName }) {
          const reportsDir = "cypress/reports/lighthouse"
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true })
          }
          const filePath = path.join(reportsDir, `${fileName}.html`)
          fs.writeFileSync(filePath, report)
          return filePath
        }
      })
      

    }
  }
})
