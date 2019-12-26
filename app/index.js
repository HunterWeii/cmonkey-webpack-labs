const Generator = require("yeoman-generator");
const promptMessage = require("./config/prompts.config");
const packageGenerator = require("./config/package.config");
const tsGenerator = require("./config/ts.config");
const babelGenerator = require("./config/babel.config");

class WebpackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // setup
    this.argument("projectname", { type: String, required: true });
  }

  async prompting() {
    const userInput = await this.prompt(promptMessage);
    this.userInput = userInput;
  }

  writing() {
    const { projectname } = this.options;
    const {
      js
    } = this.userInput;

    /* ==============
     * src folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`general/`),
      this.destinationPath(`${projectname}/src`)
    );

    /* ==============
     * js src folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`${js}/src`),
      this.destinationPath(`${projectname}/src/Home`)
    );

    /* ==============
     * ts folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`${js}/ts`),
      this.destinationPath(`${projectname}/src/`)
    );

    /* ==============
     * config folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`config/`),
      this.destinationPath(`${projectname}/config`)
    );

    /* ==============
     * webpack.config.js
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`${js}/webpack.config.js`),
      this.destinationPath(`${projectname}/webpack.config.js`)
    );

    /* ==============
     * typescript.json
     * =============*/
    this.fs.writeJSON(   
      this.destinationPath(`${projectname}/tsconfig.json`),
      tsGenerator()
    );

    /* ==============
     * babel.json
     * =============*/
    this.fs.writeJSON(   
      this.destinationPath(`${projectname}/babel.rc`),
      babelGenerator(js)
    );

    /* ==============
     * package.json
     * =============*/
    this.fs.writeJSON(   
      this.destinationPath(`${projectname}/package.json`),
      packageGenerator(js)
    );

  }
}

module.exports = WebpackGenerator;