 var path = require('path');
 var webpack = require('webpack');
 var ExtractTextPlugin = require('extract-text-webpack-plugin');
 var BATH_PATH = './public/assets/';

 const extractSass = new ExtractTextPlugin({
     filename: "./css/app.css"
     //disable: process.env.NODE_ENV === "development"
 });

 module.exports = {
     entry: BATH_PATH + 'js/entry.js',
     watch: true,
     output: {
         path: path.resolve(__dirname, './build'),
         filename: './js/app.js'
     },
     module: {
         loaders: [{
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             },
             {
                 test: /\.scss$/,
                 use: ExtractTextPlugin.extract({
                     use: [{
                         loader: "css-loader"
                     }, {
                         loader: "sass-loader"
                     }],
                     // use style-loader in development
                     fallback: "style-loader"
                 })
             },
             {
                test:/\.(png|svg|jpeg|ttf)$/,
                loader  : 'file-loader',
                options : {
                    name: '../../Image/[name].[ext]'
                }
             }
         ]
     },
     plugins: [
         extractSass
     ],
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };