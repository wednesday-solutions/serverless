const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { targets: { node: '6.10' } }]]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules', './'],
    alias: {
      '@utils': path.resolve(__dirname, 'utils/'),
      '@models': path.resolve(__dirname, 'models/'),
      '@services': path.resolve(__dirname, 'services/'),
      '@mocks': path.resolve(__dirname, '__mocks__/')
    },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
