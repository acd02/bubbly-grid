const postcss = require('postcss')
const symGrid = require('./src/symGrid')
const asymGrid = require('./src/asymGrid')
const center = require('./src/center')
const push = require('./src/push')
const pull = require('./src/pull')

module.exports = postcss.plugin('postcss-bubbly-grid',
  function bubblyGrid(options) {
    return function (css) {
      options = options || {}

      css.walkDecls(function (decl, i) {
        const rule = decl.parent
        const value = decl.prop

        if (decl.prop === 'sym-grid') {
          symGrid(decl, rule)
        }

        if (decl.prop === 'asym-grid') {
          asymGrid(decl, rule)
        }

        if (decl.prop === 'center') {
          center(decl, rule)
        }

        if (decl.prop === 'push') {
          push(decl, rule)
        }

        if (decl.prop === 'pull') {
          pull(decl, rule)
        }
      })
    }
  })
