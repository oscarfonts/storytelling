var path = require('path');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryPath = path.join(__dirname, 'src');
var outputPath = path.join(__dirname, 'dist');

var htmlPlugin = new HtmlWebpackPlugin({
    title: 'storytelling',
    files: {
        "css": "https://fonts.googleapis.com/css?family=Roboto:300,400,500"
    }
});

module.exports = {
    context: entryPath,
    entry: './index.jsx',
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            webworkify: 'webworkify-webpack-dropin'
        }
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            }, {
                loader: 'eslint-loader'
            }]
        },{
            include: /node_modules\/mapbox-gl.*\.js$/,
            loader: 'transform-loader?brfs-babel',
            enforce: 'post'
        }]
    },
    plugins: debug ? [
        htmlPlugin,
    ] : [
        htmlPlugin,
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devtool: debug ? 'inline-source-map' : false,
    devServer: {
        contentBase: outputPath
    },
    node: {
      fs: 'empty'
    }
};
