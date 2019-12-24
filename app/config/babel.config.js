const ReactBabel = require("../templates/react/babel");
const VueBabel = require("../templates/vue/babel");

module.exports = js => {
  let _babel = null;

  switch(js) {
    case "vue": 
      _babel = VueBabel;
    break;

    case "react":
      _babel = ReactBabel;
    break;
  }

  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": { "browsers": ["last 2 versions", "ie >= 11"] },
          "debug": true,
        }
      ],
      ..._babel.presets
    ],
    "plugins" : [
      ..._babel.plugins
    ]
  }
};