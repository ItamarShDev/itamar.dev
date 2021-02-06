// next.config.js
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
    experimental: {
        jsconfigPaths: true,
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        domains: ["media.giphy.com"],
    },
});
