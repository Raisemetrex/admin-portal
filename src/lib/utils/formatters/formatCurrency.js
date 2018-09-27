
import Numeral from 'numeral'

function formatCurrency(value) {
  return value ? Numeral(value).format('$0,0.00') : value;
}

export default formatCurrency;
