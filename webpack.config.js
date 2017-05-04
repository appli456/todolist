/**
 * Created by li-rz on 17-4-27.
 */
let load;

switch (process.env.NODE_ENV) {
    case "prod":
    case "production":

        load = require('./app_todolist/src/config/webpack-build')({debug: false});
        break;
    case "dev":
    case "development":
    default:
        load = require('./app_todolist/src/config/webpack-dev')({debug: true});
}
//console.log(load);
module.exports = load;