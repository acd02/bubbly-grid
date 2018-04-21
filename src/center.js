module.exports = function center(decl, rule) {
  const asymRatio = decl.parent.asymRatio

  // handle type errors
  if (decl.value !== 'true' && decl.value !== 'false') {
    throw decl.error(`"${ decl.value }" is not valid value, expected "true" or "false"`);
  }

  if (!asymRatio) {
    throw decl.error(`make sure you declare "center" after you declared "asym-grid", e.g.:

      asym-grid: 1/2 10px;
      center: true;
    `);
  }

  rule.append(`margin-left: calc(((100 - ${ asymRatio }) * 1%) / 2)`)
  rule.append(`margin-right: calc(((100 - ${ asymRatio }) * 1%) / 2)`)

  rule.removeChild(decl)
}