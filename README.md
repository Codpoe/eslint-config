# @codpoe/eslint-config

[![npm](https://img.shields.io/npm/v/@codpoe/eslint-config)](https://npmjs.com/package/@codpoe/eslint-config)

> Only eslint flat config system is supported.

## Usage

### Install

```bash
pnpm add -D eslint @codpoe/eslint-config
```

### Config `eslint.config.js`

```js
import { codpoeConfig } from '@codpoe/eslint-config';

export default codpoeConfig();
```

### Add globals

```js
import { codpoeConfig } from '@codpoe/eslint-config';

export default codpoeConfig({
  globals: ['node', 'browser'],
});
```

### Add globals for specific files

```js
import { codpoeConfig, globals } from '@codpoe/eslint-config';

export default [
  ...codpoeConfig(),
  {
    files: ['**/*.node.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.browser.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
```
