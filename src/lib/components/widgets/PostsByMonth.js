
import React from 'react';
import * as mobxReact from 'mobx-react';
import BarChart from '../barChart';

const PostsByMonth = (props) => {
  const postsByMonth = props.menu.find('charts.posts-by-month');
  if (!postsByMonth) return null;
  return (
    <BarChart {...props} query={postsByMonth} showTitle="no" />
  )
}

export default mobxReact.observer(PostsByMonth);
