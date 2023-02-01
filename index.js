const chalk = require('chalk')

const { getProductTaxes, roundToNearest } = require('./utils.js')

const { input1, input2, input3 } = require('./products.json')

const log = console.log;

const calculate = (input, inputNumber) => {
  log(chalk.cyanBright(`Output ${chalk.greenBright(inputNumber)}:`))
  let inputTaxes = 0
  let inputTotal = 0

  Object.values(input).forEach(product => {
    const { amount, price } = product
    const taxes = getProductTaxes(product)
    const finalPrice = roundToNearest(taxes + price)

    log(`${chalk.cyanBright(amount)} ${product.name}: ${chalk.greenBright((finalPrice * amount).toFixed(2))}`)
    inputTaxes += amount * taxes
    inputTotal += amount * finalPrice
  });

  console.log(`${chalk.cyanBright('Sales')} Taxes: ${chalk.greenBright(roundToNearest(inputTaxes).toFixed(2))}`)
  console.log(`${chalk.cyanBright('Total')}: ${chalk.greenBright((inputTotal).toFixed(2))}`)
}

const start = () => {
  calculate(input1, 1)
  console.log('------')
  calculate(input2, 2)
  console.log('------')
  calculate(input3, 3)

}

start()
