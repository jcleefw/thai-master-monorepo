import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      '.storybook/**',
      '*.config.ts',
      '*.config.js',
    ],
  },
];
