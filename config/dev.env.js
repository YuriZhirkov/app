'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    baseURL: "http://ygtq.natapp1.cc/v2/api-docs",
})
