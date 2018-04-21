const newBlock = require('./newBlock')
const range = require('./range')

module.exports = function symGrid(decl, rule) {
  const args = decl.value.split(' ')

  const [_col, gutter = '0px', stretch = ''] = args

  const col = Number(parseInt(_col, 10))

  // handle type errors
  if (isNaN(_col)) {
    throw decl.error(`"${ _col }" is not valid value, expected an number`);
  }

  if (isNaN(parseFloat(gutter))) {
    throw decl.error(`"${ gutter }" is not valid value, expected something like "10px" or "1em"`);
  }

  if (stretch && (stretch !== 'stretch' && stretch !== 'nostretch')) {
    throw decl.error(`"${ stretch }" is not valid value, valid values are "stretch" | "nostretch"`);
  }

  const clearing = col + 1

  if (parseFloat(gutter) === 0) {
    rule.append(`width: calc(99.99% * 1/${ col })`)
  } else {
    rule.append(`width: calc(99.99% * 1/${ col } - (${ gutter } - ${ gutter } * 1/${ col }))`)
  }

  rule.append(`margin-right: ${ gutter }`)

  newBlock(
    decl,
    `:nth-of-type(${ col }n+${ col })`,
    ['margin-right'],
    [0]
  )

  newBlock(
    decl,
    ':nth-of-type(n)',
    ['margin-right'],
    [gutter]
  )

  if (stretch === 'stretch') {
    range(2, col).forEach(i => {
      newBlock(
        decl,
        `:nth-of-type(${ col }n+${ i }):last-of-type`,
        ['flex-grow', 'margin-right'],
        [1, 0]
      )

      newBlock(
        decl,
        `:nth-of-type(${ col }n+${ clearing }):last-of-type`,
        ['flex-grow', 'margin-right'],
        [1, 0]
      )
    })
  }

  if (stretch === 'nostretch') {
    range(2, col).forEach(i => {
      newBlock(
        decl,
        `:nth-of-type(${ col }n+${ i }):last-of-type`,
        ['flex-grow'],
        [0]
      )

      newBlock(
        decl,
        `:nth-of-type(${ col }n+${ clearing }):last-of-type`,
        ['flex-grow'],
        [0]
      )
    })
  }

  rule.removeChild(decl)
}
