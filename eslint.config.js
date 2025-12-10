import js from '@eslint/js';
import queryPlugin from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    paths: ['src'],
                },
            },
        },
    },
    // Global ignores
    {
        ignores: ['coverage', 'dist', 'node_modules'],
    },
    // Base configs
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    // Custom config
    {
        files: ['**/*.{js,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            import: importPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            '@tanstack/query': queryPlugin,
        },
        rules: {
            // React rules
            ...reactPlugin.configs.recommended.rules,
            'react/jsx-use-react': 'off',
            'react/react-in-jsx-scope': 'off',

            // React Hooks rules
            ...reactHooksPlugin.configs.recommended.rules,

            // React Refresh rules
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // Enforce semicolons
            semi: ['error', 'always'],

            // Import sorting and grouping
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling'],
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
];
