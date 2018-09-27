
import formatDate from './formatDate';
import formatDateTime from './formatDateTime';
import formatCurrency from './formatCurrency';

export { formatDate as formatDate };
export { formatDateTime as formatDateTime };
export { formatCurrency as formatCurrency };

const formatters = {
  formatDate,
  formatCurrency,
  formatDateTime,
};

export default formatters;
