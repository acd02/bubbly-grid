module.exports = function asymGrid(decl, rule) {
  const args = decl.value.split(' ')

  const [_ratio, gutter = '0px', last = ''] = args

  const ratio = ((value) => {
    const [nominator = NaN, denominator = NaN] = value.split('/')
    const toNum = val => Number(val)
    const toInt = val => parseInt(val, 10)

    if (!toNum(nominator) || !toNum(denominator)) return NaN
    return (toInt(nominator) / toInt(denominator) * 100).toFixed(5)
  })(_ratio)

  if (!isNaN(ratio)) {
    // make the ratio, gutter, accessible from outside of this function
    decl.parent.asymRatio = ratio
    decl.parent.asymGutter = gutter
  }

  // handle type errors
  if (isNaN(ratio)) {
    throw decl.error(`"${ _ratio }" is not valid value, expected something like "1/4" or "4/10"`);
  }

  if (isNaN(parseFloat(gutter))) {
    throw decl.error(`"${ gutter }" is not valid value, expected something like "10px" or "1em"`);
  }

  if (last && (last !== 'last')) {
    throw decl.error(`"${ last }" is not valid value, you meant "last"?`);
  }

  rule.append(`margin-right: ${ gutter }`)

  if (parseFloat(gutter) === 0) {
    rule.append(`width: calc(99.99% * (${ ratio }/100))`)
  } else {
    rule.append(`width: calc(99.99% * (${ ratio }/100) - (${ gutter } - ${ gutter } * (${ ratio }/100)))`)
  }

  if (last === 'last') {
    rule.append('margin-right: auto');
  }

  rule.removeChild(decl)
}
