const ENV = process.env.NODE_ENV || 'development';

const webpackConfig = require(`./webpack-${ENV}-config`)

module.exports = webpackConfig;
