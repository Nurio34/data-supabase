import cssnano from "cssnano";
import { Config } from "postcss-load-config";

/** @type {Config} */
const config = {
    plugins: [
        "postcss-preset-env",
        // Conditionally add cssnano as a plugin
        ...(process.env.NODE_ENV === "production" ? [cssnano()] : []),
    ],
};

export default config;
