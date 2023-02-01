//npm i html-webpack-plugin- need this to run html through webpack-PUTS OUTPUT INTO DIST FOLDER
const HtmlWebpackPlugin = require('html-webpack-plugin');
//npm i webpack-pwa-manifest-MAKES APP INSTALLABLE
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
//SERVICE WORKER PLUGIN
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      //[name]-makes dist folder have the three files
      filename: '[name].bundle.js',
      //CREATE A DIST FOLDER THAT BUNDLES ALL THE JS FILES AND LINK INTO INDEX.HTML BECAUSE WE USE HTML-WEBPACK-PLUGIN
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ],

    module: {
      rules: [
         //use css-loader-needs css-loader and style-loader together
         {
          test:/\.css$/i,
          use:['style-loader','css-loader'],
        },
      ],
    },
  };
};
