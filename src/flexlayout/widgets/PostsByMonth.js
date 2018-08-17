
import React from 'react';

import QueryStore from '../../mobx/queryStore';

import BarChart from '../../lib/components/barChart';

const PostsByMonth = () => {
  const postsByMonth = QueryStore.find('charts.posts-by-month');
  return (
    <BarChart query={postsByMonth} showTitle="no" />
  )
}

export default PostsByMonth;
