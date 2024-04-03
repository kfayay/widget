const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
const { dependencies } = require('./package.json');

module.exports = (env) => {
  return {
    mode: 'development',
    devServer: {
      port: 9002,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(jpe?g|png|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new ModuleFederationPlugin({
        name: 'Widget1',
        filename: 'remoteEntry.js',
        exposes: {
          SampleWidget: './src/SampleWidget/remote',
        },
        shared: {
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react'],
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
          dmeditor: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['dmeditor'],
          },
        },
      }),
    ],
    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
};
