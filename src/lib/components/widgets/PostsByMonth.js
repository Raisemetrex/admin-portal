
import React from 'react';
import * as mobxReact from 'mobx-react';
import BarChart from '../barChart';

const PostsByMonth = (props) => {
  const postsByMonth = props.menu.findByPath('charts.posts-by-month');
  if (!postsByMonth) return null;
  // console.log('postsByMonth:', postsByMonth);
  const { query } = postsByMonth['data-action'];
  return (
    <BarChart {...props} query={query} showTitle="no" />
  )
}

export default mobxReact.observer(PostsByMonth);
