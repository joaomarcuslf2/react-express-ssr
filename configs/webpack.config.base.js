const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pathsConfig = require('./paths.config');

module.exports = {
  entry: {
    vendor: ['@babel/polyfill', 'react'],
    index: pathsConfig.entryFiles,
  },
  output: {
    path: pathsConfig.distDir,
    filename: '[name].js',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
  },
  plugins: [
    new CopyPlugin([
      {
        from: pathsConfig.imagesDir,
        to: `${pathsConfig.distDir}/images`,
      },
    ]),
    new CopyPlugin([
      {
        from: pathsConfig.fontsDir,
        to: `${pathsConfig.distDir}/fonts`,
      },
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer'), require('cssnano')],
            },
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
        },
      },
      {
        test: /\.(csv|tsv)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'csv',
        },
      },
      {
        test: /\.xml$/,
        loader: 'file-loader',
        options: {
          outputPath: 'xml',
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: [/node_modules/, /public/],
      },
    ],
  },
};
