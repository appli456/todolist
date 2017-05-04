/**
 * Created by li-rz on 17-4-27.
 */
const webpack = require('webpack');
const helpers = require('./helper');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const pathMap = require('./pathmap');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.UV_THREADPOOL_SIZE = 100;

const srcDir = helpers.root('src');
const nodeModule = helpers.root('node_modules');
const outputPath = helpers.root('..', 'static', 'dist');
const publicPath = helpers.root('public');

let entry = (() => {
    let entryFiles = glob.sync(srcDir +'/*.{js,jsx}');
    let map = {};
    entryFiles.forEach((file)=>{
        let filename = file.substring(file.lastIndexOf("\/") + 1, file.lastIndexOf("."));
        map[filename] = file;
    });
    return map;
})();

module.exports = function(option) {
    let debug = option.debug;

    return {
        entry: Object.assign(entry, {
            "vendor": ["react"]
        }),
        output: {
            path: outputPath,
            filename: debug ? "[name].js" : "js/[chunkhash:8].[name].min.js",
            chunkFilename: debug ? "[chunkhash:8].chunk.js" : "js/[chunkhash:8].chunk.min.js",
            hotUpdateChunkFilename: debug ? "[id].js" : "js/[id].[chunkhash:8].min.js",
            publicPath: outputPath
        },
        resolve: {
            // root: [srcDir, nodeModule],
            alias: pathMap,
            extensions: [".js", ".css", ".scss", ".tpl", ".png", ".jpg"]
        },

        module: {
            loaders: [
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    loaders: [
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        "url?limit=10000&name=/img/[hash:8].[name].[ext]",
                        "image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:'65-80',speed:4}}"
                    ]
                },
                {
                    test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                    loader: "url?limit=10000&name=/fonts/[hash:8].[name].[ext]"
                },
                {
                    test: /\.(tpl|ejs)$/,
                    loader: "ejs"
                },
                {
                    test: /\.js$/,
                    exclude : /(node_modules|bower_modules)/,
                    query: {
                        plugins: ['transform-runtime'],
                        presets: ['react','es2015']
                    },
                    loader: 'babel-loader'
                    // loaders: 'babel?presets[]=react,presets[]=es2015'
                },
                {
                    test : /\.jsx$/,
                    exclude : /(node_modules|bower_modules)/,
                    loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader',
                }
            ]
        },

        plugins: [
            // new CommonsChunkPlugin({
            //     name: "common-b-c",
            //     chunks: ["b", "c"]
            // }),
            // new CommonsChunkPlugin({
            //     name: "common",
            //     chunks: ["common-b-c", "a"]
            // }),
            new CommonsChunkPlugin({
                name: "vendor",
                chunks: entry
            })
        ],
        watch: true,
        devServer: {
            watchOptions: {
                ignored: /node_module/,
                poll: 1000
            },
            // proxy: {
            //     "*":{
            //         target: 'http://localhost:8000'
            //     }
            // },
            watchContentBase: true,
            contentBase: publicPath,
            compress: true,
            port: 8080,
            hot: true,
            // noInfo: false,
            // inline: true,
            publicPath: outputPath,
            stats: {
                cached: false,
                colors: true
            }
        }
    }
};