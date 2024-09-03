import js from '@eslint/js';
import importXPlugin from 'eslint-plugin-import-x';
import jsoncPlugin from 'eslint-plugin-jsonc';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import ymlPlugin from 'eslint-plugin-yml';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export { globals };

export interface Options {
  globals?: (keyof typeof globals)[];
}

export const codpoeConfig = (
  options?: Options,
): ReturnType<typeof tseslint.config> => {
  return tseslint.config(
    {
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.output/**',
        '**/pnpm-lock.yaml',
      ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...jsoncPlugin.configs['flat/recommended-with-json'],
    ...ymlPlugin.configs['flat/standard'],
    {
      name: 'codpoe/import',
      ...importXPlugin.flatConfigs.recommended,
    },
    {
      name: 'codpoe/react',
      files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
      ...reactPlugin.configs.flat.recommended,
    },
    {
      name: 'codpoe/react-hooks',
      files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
      plugins: {
        'react-hooks': { rules: reactHooksPlugin.rules },
      },
      rules: {
        ...reactHooksPlugin.configs.recommended.rules,
      },
    },
    prettierPluginRecommended,
    {
      name: 'codpoe/package-json',
      files: ['**/package.json'],
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'version',
              'description',
              'keywords',
              'license',
              'repository',
              'funding',
              'author',
              'engines',
              'packageManager',
              'publishConfig',
              'type',
              'files',
              'exports',
              'typesVersions',
              'main',
              'module',
              'unpkg',
              'bin',
              'scripts',
              'husky',
              'lint-staged',
              'peerDependencies',
              'peerDependenciesMeta',
              'dependencies',
              'devDependencies',
            ],
          },
          {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: { type: 'asc' },
          },
        ],
      },
    },
    {
      name: 'codpoe/dts',
      files: ['**/*.d.ts'],
      rules: {
        'import-x/no-duplicates': 'off',
      },
    },
    {
      name: 'codpoe/scripts',
      files: ['**/scripts/**/*.*'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      name: 'codpoe/tests',
      files: ['*.test.ts', '*.test.js', '*.spec.ts', '*.spec.js'],
      rules: {
        'no-console': 'off',
        'no-unused-expressions': 'off',
      },
    },
    {
      languageOptions: {
        globals: (options?.globals || []).reduce((acc, key) => {
          return Object.assign(acc, globals[key] || {});
        }, {}),
      },
    },
    {
      name: 'codpoe/overrides',
      files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
      rules: {
        // builtin
        'no-console': 'error',

        // import-x
        'import-x/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
          },
        ],
        'import-x/first': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/no-unresolved': 'off',

        // react
        'react/prop-types': 'off',

        // typescript
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',

        // prettier
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            arrowParens: 'avoid',
          },
        ],
      },
    },
  );
};

export default codpoeConfig;
