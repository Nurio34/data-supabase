// /** @type {import('postcss-load-config').Config} */
// const config = {
//   plugins: {
//     tailwindcss: {},
//   },
// };

// export default config;

import cssnano from "cssnano";
import postcssLoadConfig from "postcss-load-config";

const config = async () => {
    const { plugins } = await postcssLoadConfig();
    return {
        plugins: [
            "postcss-preset-env",
            // Conditionally add cssnano as a plugin
            ...(process.env.NODE_ENV === "production" ? [cssnano()] : []),
            ...plugins,
        ],
    };
};

export default config;
