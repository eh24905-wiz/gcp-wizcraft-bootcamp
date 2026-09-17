/** @type {import('next').NextConfig} */
const packageJson = require('./package.json');

module.exports = {
    output: "standalone",
    env: {
        NEXT_PUBLIC_APP_VERSION: packageJson.version,
    },
};