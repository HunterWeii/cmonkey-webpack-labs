const ReactPackage = require("../templates/react/package");
const VuePackage = require("../templates/vue/package");

module.exports = js => {
  let _package = null;

  switch(js) {
    case "vue": 
      _package = VuePackage;
    break;

    case "react":
      _package = ReactPackage;
    break;
  }

  return {
    "name": "",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack --mode=development -p -w",
      "prod": "webpack --mode=production",
      "server": "webpack-dev-server --hot --inline"
    },
    "author": "hunter",
    "license": "ISC",
    "dependencies": {
      ..._package.dependencies
    },
    "devDependencies": {
      ..._package.devDependencies
    }
  }
}