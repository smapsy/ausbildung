var price = 199.99
var access = 15.49
var bank = 1869.45
var amount = 0
var mentalPay = 500
var anzahl = 0
const TAX = 0.19

function calcTax(amount) {
  return amount + (amount * TAX)
}

function format(amount) {
  return "$" + amount.toFixed(2)
}

while (amount +calcTax(price) < bank) {
  amount = amount + calcTax(price)
  anzahl++
  if (amount < mentalPay) {
    amount = amount + calcTax(access)
  }
}

console.log(format(amount), anzahl)

