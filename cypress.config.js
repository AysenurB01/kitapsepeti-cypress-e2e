const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false, // BİRLEŞTİRME İÇİN KRİTİK!
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); 
      return config;
      // implement node event listeners here
    },
    viewportWidth: 1000, 
    viewportHeight: 660, // Yüksekliği azaltmak, sayfanın kaydırma çubuğunu hemen göstermesini sağlar.
  },
});


