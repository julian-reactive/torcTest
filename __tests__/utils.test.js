const { getProductTaxes, roundToNearest } = require('../utils')
const { TAX_BASIC, TAX_IMPORTED } = require('../constants')

const product = {
  price: 10,
  tax_free: true,
  imported: true
}

describe('utils', () => {
  describe('getProductTaxes', () => {
    describe('when product is only imported', () => {
      it('tax import should be TAX_IMPORTED rate', () => {
        const expectedValue = product.price * TAX_IMPORTED
        const taxes = getProductTaxes(product)

        expect(taxes).toEqual(expectedValue)
      })
    })

    describe('when product is NOT tax_free and NOT imported', () => {
      it('tax import should be zero', () => {
        const expectedValue = 0
        const taxes = getProductTaxes({ ...product, imported: false })

        expect(taxes).toEqual(expectedValue)
      })
    })

    describe('when product is NOT tax_free and is imported', () => {
      it('tax import should be TAX_BASIC + TAX_IMPORTED rate', () => {
        const expectedValue = (product.price * TAX_BASIC) + (product.price * TAX_IMPORTED)
        const taxes = getProductTaxes({ ...product, tax_free: false })

        expect(taxes).toEqual(expectedValue)
      })
    })
  })

  describe('roundToNearest', () => {
    describe('when value is set', () => {
      it('should round to 2 decimals', () => {
        const value = 1.86565656
        const expectedValue = 1.87

        expect(roundToNearest(value)).toEqual(expectedValue)
      })
    })

    describe('when decimal value is below than 0.05', () => {
      it('should round up to 0.05', () => {
        const value = 1.81
        const expectedValue = 1.85

        expect(roundToNearest(value)).toEqual(expectedValue)
      })
    })
  })
})