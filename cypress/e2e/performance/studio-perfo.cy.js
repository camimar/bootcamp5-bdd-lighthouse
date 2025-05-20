describe("Testing Studio by TS Performance with Lighthouse Audit", () => {
  beforeEach(() => {
    cy.visit("http://yourstudio.com/");
  });

  it("Performance check for website", () => {
    const thresholds = {
      performance: 80,
      accessibility: 90,
      "best-practices": 85,
      seo: 85,
    };

    cy.lighthouse(thresholds).then((result) => {
      cy.task("log", "Audit result recibido");

      if (result && result.report) {
        cy.task("saveReport", {
          report: result.report,
          fileName: `lighthouse-report-${Date.now()}`,
        }).then((filePath) => {
          cy.task("log", `Reporte guardado en: ${filePath}`);
        });
      }
    });
  });
});
