const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // or wherever your HTML template is located
      filename: 'index.html',
      inject: 'body' // This ensures the script is injected into the <body> tag
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_FIREBASE_API_KEY: '',
      REACT_APP_FIREBASE_AUTH_DOMAIN: '',
      REACT_APP_FIREBASE_PROJECT_ID: '',
      REACT_APP_FIREBASE_STORAGE_BUCKET: '',
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: '',
      REACT_APP_FIREBASE_APP_ID: '',
      REACT_APP_FIREBASE_MEASUREMENT_ID: ''
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};