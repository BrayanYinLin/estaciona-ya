import globals from 'globals'
import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules']
  },
  // JS puro (Node)
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
    plugins: { prettier: prettierPlugin },
    rules: {
      semi: ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ]
    }
  },
  // TypeScript (API)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      semi: ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'no-explicit-any': 'off'
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig
    ]
  }
)
