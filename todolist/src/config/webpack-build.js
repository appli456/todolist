/**
 * Created by li-rz on 17-4-27.
 */
const commonConfig = require('./webpack-common');
const helper = require('./helper');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');


module.exports = function(option) {
    let extractCSS = new ExtractTextPlugin({
        filename: "css/[contenthash:8].[name].min.css",
        allChunks: false
    });
    let cssLoader = extractCSS.extract(["css?minimize"]);
    let sassLoader = extractCSS.extract(["css?minimize", "sass"]);
    return webpackMerge(commonConfig({debug: false}),
        {
            module: {
                loaders: [{
                    test: /\.css$/,
                    loader: cssLoader
                },
                {
                    test: /\.scss$/,
                    loader: sassLoader
                }]
            },
            devtool: 'source-map',
            plugins: [
                extractCSS,
                new UglifyJsPlugin({
                    beautify: false,
                    compress: {
                        warnings: false,
                        unused: true,
                        sequences: true,
                        if_return: true
                    },
                    output: {
                        comments: false
                    },
                    mangle: {
                        except: ["$", "exports", "require"]
                    }
                }),
                new NoErrorsPlugin(),
                new DedupePlugin(),
                new DefinePlugin({     // for react
                    "process.env" : {
                        "NODE_ENV" : JSON.stringify("production")
                    }}
                ),
                new LoaderOptionsPlugin({
                    minimize: true,
                    debug: false,
                    options: {

                    }
                })
            ],

            node: {
                global: true,
                crypto: 'empty',
                process: false,
                module: false
            }
        });
};