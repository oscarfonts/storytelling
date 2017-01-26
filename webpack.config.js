var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var src_path = path.join(__dirname, "src");
var dist_path = path.join(__dirname, "src");

module.exports = {
    context: src_path,
    entry: "./js/main.js",
    output: {
        path: dist_path,
        filename: "app.min.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            }
        ]
    },
    plugins: debug ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devtool: debug ? "inline-source-map" : "source-map",
    devServer: {
        contentBase: dist_path
    }
};
