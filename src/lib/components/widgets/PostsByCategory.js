
import React from 'react';
import * as mobxReact from 'mobx-react';
import PieChart from '../pieChart';

const PostsByCategory = (props) => {
  const postsByCategory = props.menu.find('charts.posts-pie-chart');
  if (!postsByCategory) return null;
  return (
    <PieChart {...props} query={postsByCategory} showTitle="no"/>
  )
}

export default mobxReact.observer(PostsByCategory);
