const Generator = require("yeoman-generator");

class WebpackPageGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    
    // setup
    this.argument("pagename", { type: String, required: true });
    this.option('js', { type: String });
  }

  writing() {
    const { 
      pagename, 
      js = "vue" 
    } = this.options;
    
    /* ==============
     * src folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`general/`),
      this.destinationPath(`src/${pagename}`)
    );

    /* ==============
     * js src folder
     * =============*/
    this.fs.copyTpl(
      this.templatePath(`${js}/`),
      this.destinationPath(`src/${pagename}`)
    );
  }
}

module.exports = WebpackPageGenerator;