const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        defaultCommandTimeout: 15000,
        responseTimeout: 15000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
