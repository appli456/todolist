/**
 * Created by li-rz on 17-4-27.
 */
const path = require("path");

const join = (pathname) => {
    return path.join(__dirname, pathname)
};
module.exports = {
    "BowerModules" : join("./src/bower_modules"),
    "Components" : join("./src/components"),
    "Containers" : join("./src/containers"),
    "Reducers" : join("./src/reducers"),
    "Actions" : join("./src/actions"),
    "NodeModules" : join("../node_modules"),
    "React" : join("../node_modules/react/react.js"),
    "bootstrap": join("../node_modules/dist/js/bootstrap.min.js")
};