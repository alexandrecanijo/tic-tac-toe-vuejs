// vue.config.js file to be place in the root of your repository
// make sure you update `yourProjectName` with the name of your GitLab project
const path = require('path');

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/tictactoevuejs/" : "/",
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)));
  }
};

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/index.scss'),
        path.resolve(__dirname, './src/styles/base-theme/index.scss')
      ],
    })
}
