
import Moment from 'moment';

function formatDate(value) {
  return value ? Moment(value).format('YYYY-MM-DD') : value;
}

export default formatDate;
