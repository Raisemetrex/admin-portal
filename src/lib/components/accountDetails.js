
import React from 'react';
import shortid from 'shortid';

import { ipsum } from '../utils/random';
import { formatDate, formatCurrency, formatDateTime } from '../utils/formatters';

function mapToDl(data, details) {
  const aData = [];
  details.map(item => {
    const value = item.format ? item.format(data[item.key]) : data[item.key];
    aData.push(<dt key={`dt_${item.key}`}>{`${item.text}:`}</dt>);
    aData.push(<dd key={`dd_${item.key}`}>{value || <span>&nbsp;</span>}</dd>);
  });
  return aData;
  // return (
  //   <dl>
  //     {
  //       details.map(item => {
  //         return (
  //           <dt key={`dt_${item.key}`}>{`${item.text}:`}</dt>
  //         )
  //       })
  //     }
  //     {
  //       details.map(item => {
  //         if (!item.key) return <span>&nbsp;</span>;
  //         return (
  //           <dd key={`dd_${item.key}`}>{data[item.key]}</dd>
  //         )
  //       })
  //     }
  //   </dl>
  // );
}

function AccountDetails(props) {
  const { data, WooAdmin } = props;
  const root = WooAdmin.getDesktopEndpoint(data.subdomain);
  const feedRoot = WooAdmin.getFeedEndpoint();
  const details = [
    {text: 'Account Name', key: 'name'},
    {text: 'Email Address', key: 'email_address'},
    {text: 'First Name', key: 'first_name'},
    {text: 'Last Name', key: 'last_name'},
    {text: 'Subdomain', key: 'subdomain'},
    {text: 'Created', key: 'inserted_at', format: formatDateTime},
    {text: 'ID', key: 'id'},
  ];
  const paymentDetails = [
    {text: 'Status', key: 'status'},
    {text: 'Payment Token', key: 'payment_token'},
    {text: 'Demo Data', key: 'has_demo_data'},
    {text: 'Expired At', key: 'trial_expired_at', format: formatDateTime},
    {text: 'Rewards Region', key: 'rewards_region'}
  ];
  const settingsDetails = [
    // {text: 'Targets', },
    {text: 'Points', key: 'weekly_points_target'},
    {text: 'Comments', key: 'weekly_comments_target'},
    {text: 'Recognition', key: 'weekly_recognition_target'},
    {text: 'Rewards', key:'weekly_rewards_target'},
    {text: 'User $ Limit', key: 'weekly_user_dollar_limit', format: formatCurrency},
    {text: '$ Per Point', key: 'weekly_dollars_per_point', format: formatCurrency},
  ];

  const className = 'col-lg-4 col-md-8 col-sm-12';

  return (
    <div className="account-details">
      <div className="container-fluid">
        <div className="row" style={{marginBottom: '10px'}}>
          <div className={className}>
            <div><strong>Details:</strong></div>
            {mapToDl(data, details)}
          </div>
          <div className={className}>
            <div><strong>Payment:</strong></div>
            {mapToDl(data, paymentDetails)}
          </div>
          <div className={className}>
            <div><strong>Weekly Targets:</strong></div>
            {mapToDl(data, settingsDetails)}
          </div>
        </div>
        <div className="row">
          <div className={className}>
            <div><strong>TV Mode:</strong></div>
            <dt>TV Mode Link:</dt>
            <dd>
              <a href={`${root}/#/screen?mode=tv&account_id=${data.id}`} target="_blank">TV Mode</a>
            </dd>
          </div>
          <div className={className}>
            <div><strong>Branding:</strong></div>
            <dt>Banner Image:</dt>
            {
              data.banner_url && data.banner_url.length ?
                <dd>
                  <a href={data.banner_url} target="_blank">Show Image</a>
                </dd>
              :null
            }
          </div>
          <div className={className}>
            <div><strong>Integrations:</strong></div>
            <dt>RSS URL:</dt>
            <dd>
              <a href={`${feedRoot}/communications/feed/${data.id}.rss`} target="_blank">Show RSS Feed</a>
            </dd>
            <dt>JSON URL:</dt>
            <dd>
              <a href={`${feedRoot}/communications/feed/${data.id}.json`} target="_blank">Show JSON Feed</a>
            </dd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails;
