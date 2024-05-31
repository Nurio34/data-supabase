/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        "postcss-preset-env",
        // Add cssnano as a plugin
        process.env.NODE_ENV === "production" ? require("cssnano") : null,
    ].filter(Boolean),
};

export default config;
