

import React from 'react';

import QueryStore from '../../mobx/queryStore';

import PieChart from '../../lib/components/pieChart';

const PostsByCategory = () => {
  const query = QueryStore.find('charts.posts-pie-chart');
  return (
    <PieChart query={query} showTitle="no"/>
  )
}

export default PostsByCategory;
