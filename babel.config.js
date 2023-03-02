module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react'
  ],
  plugins: [
    'babel-plugin-macros',
    ['babel-plugin-styled-components', { ssr: true }]
  ]
};
