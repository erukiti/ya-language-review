// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript')
const tsConfig = require('../tsconfig.json')
tsConfig.compilerOptions.module = 'commonjs'

module.exports = {
  process(src, path, conf, options) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return tsc.transpile(src, tsConfig.compilerOptions, path, [])
    }
    return src
  }
}
