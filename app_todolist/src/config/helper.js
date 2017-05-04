/**
 * Created by li-rz on 17-4-27.
 */
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EVENT = process.env.npm_lifecycle || '';

/**
 * find process argv
 * @param flag
 * @returns {boolean}
 */
function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

/**
 *
 * @param flag
 * @return {boolean}
 */
function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

/**
 * in webpack server
 * @returns {*|boolean}
 */
function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

/**
 * get root dir
 * @type {function}
 */
let root = path.join.bind(path, ROOT);

module.exports = {
    root: root,
    isWebpackDevServer: isWebpackDevServer,
    hasNpmFlag: hasNpmFlag,
    hasProcessFlag: hasProcessFlag
};
