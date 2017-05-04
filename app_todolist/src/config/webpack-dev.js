/**
 * Created by li-rz on 17-4-27.
 * Webpack development config
 */
const commonConfig = require('./webpack-common');
const helper = require('./helper');
const WebpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');

module.exports = function(option) {
    let cssLoader = 'style-loader!css-loader';
    let sassLoader = 'style-loader!css-loader!sass-loader?sourceMap';
    return WebpackMerge(commonConfig({debug: true}),
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
            devtool: 'cheap-module-source-map',
            plugins: [
                new LoaderOptionsPlugin({
                    debug: true,
                    options: {}
                }),
                new OccurrenceOrderPlugin(),
                new DefinePlugin({     // for react
                    "process.env" : {
                        "NODE_ENV" : JSON.stringify("development")
                    }}
                ),
                new HotModuleReplacementPlugin(),
                new NoEmitOnErrorsPlugin()
            ],
            node: {
                global: true,
                crypto: 'empty',
                process: true,
                module: false,
                clearImmediate: false,
                setImmediate: false
            }
        });
};