
import Moment from 'moment';

function formatDateTime(value) {
  return value ? Moment(value).format('YYYY-MM-DD HH:mm:ss') : value;
}

export default formatDateTime;
