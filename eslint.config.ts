import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  markdown: false,
  ignores: ['dist', 'docs'],
  rules: {
    'ts/no-use-before-define': 'off',
    'style/max-statements-per-line': 'off',
  },
})
