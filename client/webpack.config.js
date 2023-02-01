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
        template: './index.html',
        title: "J.A.T.E"
      }),
    

      new WebpackPwaManifest({
        ////?????do i need this next two lines?????????
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        publicPath:'/',
        //crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),// images-logo.png
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("assets", "icons")
          },
         
        ]
      }),
      new InjectManifest({//need to gergister servbice worker in entry point file
        // These are some common options, and not all are required.
        // Consult the docs for more info.
        // exclude: [/.../, '...'],
        // maximumFileSizeToCacheInBytes: ...,
        swSrc: './src-sw.js', //service worker source is found in ./src-sw.js
        swDest:"src-sw.js"
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test:/(\.(png|jpg|jpeg|svg|gif))$/i,
          type:'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },

    // module: {
    //   rules: [
    //      //use css-loader-needs css-loader and style-loader together
    //      {
    //       test:/\.css$/i,
    //       use:['style-loader','css-loader'],
    //     },
    //      //rule for including images-wont show logo!   
    //      {
    //       test:/(\.(png|jpg|jpeg|svg|gif))$/i,
    //       type:'asset/resource',
    //     },
    //   ],
    // },
  };
};
