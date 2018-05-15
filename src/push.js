const getFileName = require('./utils').getFileName

module.exports = function push(decl, rule) {
  const asymRatio = decl.parent.asymRatio
  const _asymGutter = decl.parent.asymGutter

  const isReset = decl.value === 'reset'

  const ratio = ((value) => {
    const [nominator = NaN, denominator = NaN] = value.split('/')
    const toNum = val => Number(val)
    const toInt = val => parseFloat(val)

    if (!toNum(nominator) || !toNum(denominator)) return NaN
    return (toInt(nominator) / toInt(denominator) * 100).toFixed(5)
  })(decl.value)

  // handle type errors
  if (isNaN(ratio) && !isReset) {
    throw decl.error(`"${ decl.value }" is not valid value, expected "reset" or something like "1/4" or "4/10",
      in ${ getFileName(rule) }
    `);
  }

  if (!isReset && !asymRatio) {
    throw decl.error(`make sure you declare "push" after you declared "asym-grid", e.g.:

      asym-grid: 2/10 10px;
      push: 4/10;

      in ${ getFileName(rule) }
    `);
  }

  const asymGutter = _asymGutter === '0'
    ? '0px'
    : _asymGutter

  if (isReset) {
    rule.append('position: static')
  } else {
    rule.append('position: relative')
    rule.append(`left: calc(99.99% * (${ ratio }/100) + (${ asymGutter } + ${ asymGutter } * (${ ratio }/100)) - ${ asymGutter })`)
  }

  rule.removeChild(decl)
}
