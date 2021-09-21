# 👷 Durable Objects Counter template

## Note: You must use [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) 1.19.3 or newer to use this template.

## Please read the [Durable Object documentation](https://developers.cloudflare.com/workers/learning/using-durable-objects) before using this template.

A template for kick starting a Cloudflare Workers project using:

- Durable Objects
- Modules (commonjs modules to be specific)
- Webpack
- Wrangler

Worker code is in `src/`. The Durable Object `Counter` class is in `src/counter.js`, and the eyeball script is in `index.js`.

Webpack is configured to output a bundled CommonJS Module to `dist/index.js`.

This project uses a shim ES module at `src/shim.mjs` that imports the commonjs bundle, and re-exports it. This is necessary because commonjs does not support named exports, and the only way to export a durable object class is using named exports.