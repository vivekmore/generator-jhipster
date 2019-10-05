const webpack = require('webpack');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

module.exports = (config, options) => {
  console.log(options);
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
        // APP_VERSION is passed as an environment variable from the Gradle / Maven build tasks.
        VERSION: `'${process.env.hasOwnProperty('APP_VERSION') ? process.env.APP_VERSION : 'DEV'}'`,
        // DEBUG_INFO_ENABLED: options.env === 'development',
        // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
        // If this URL is left empty (""), then it will be relative to the current context.
        // If you use an API server, in `prod` mode, you will need to enable CORS
        // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
        SERVER_API_URL: `''`
      }
    }),
    new MergeJsonWebpackPlugin({
      output: {
        groupBy: [
          { pattern: './src/main/webapp/i18n/en/*.json', fileName: './i18n/en.json' }
          // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
        ]
      }
    })
  );

  return config;
};
