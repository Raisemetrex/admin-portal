
import React from 'react';
import * as mobxReact from 'mobx-react';
import PieChart from '../pieChart';

const PostsByCategory = (props) => {
  const postsByCategory = props.menu.findByPath('charts.posts-pie-chart');
  if (!postsByCategory) return null;
  // console.log('postsByCategory:', postsByCategory)
  const { query } = postsByCategory['data-action'];
  return (
    <PieChart {...props} query={query} showTitle="no"/>
  )
}

export default mobxReact.observer(PostsByCategory);
