const { TAX_BASIC, TAX_IMPORTED } = require('./constants.js')

const getProductTaxes = ({price, tax_free, imported}) => {
  const basicTax = tax_free ? 0 : price * TAX_BASIC
  
  const importedTax = imported ? price * TAX_IMPORTED : 0
  
  return basicTax + importedTax
}


const roundToNearest = value => {
  const roundedValue = parseFloat(value.toFixed(2))

  const lastValue = parseInt(roundedValue.toString().slice(-1), 10)

  if (lastValue < 5) {
    return parseFloat(roundedValue.toFixed(1)) + 0.05
  }

  return roundedValue
}

module.exports = {
  getProductTaxes,
  roundToNearest
}