
import React from 'react';
import shortid from 'shortid';

import { ipsum } from '../utils/random';

function mapToDl(data, details) {
  const aData = [];
  details.map(item => {
    aData.push(<dt key={`dt_${item.key}`}>{`${item.text}:`}</dt>);
    aData.push(<dd key={`dd_${item.key}`}>{data[item.key] || <span>&nbsp;</span>}</dd>);
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
  const { data } = props;
  const details = [
    {text: 'Account Name', key: 'name'},
    {text: 'Email Address', key: 'email_address'},
    {text: 'First Name', key: 'first_name'},
    {text: 'Last Name', key: 'last_name'},
    {text: 'Subdomain', key: 'subdomain'},
    {text: 'Created', key: 'inserted_at'},
    {text: 'ID', key: 'id'},
  ];
  const paymentDetails = [
    {text: 'Status', key: 'status'},
    {text: 'Payment Token', key: 'payment_token'},
    {text: 'Demo Data', key: 'has_demo_data'},
    {text: 'Expired At', key: 'trial_expired_at'},
    {text: 'Rewards Region', key: 'rewards_region'}
  ];
  const settingsDetails = [
    // {text: 'Targets', },
    {text: 'Points', key: 'weekly_points_target'},
    {text: 'Comments', key: 'weekly_comments_target'},
    {text: 'Recognition', key: 'weekly_recognition_target'},
    {text: 'Rewards', key:'weekly_rewards_target'},
    {text: 'User $ Limit', key: 'weekly_user_dollar_limit'},
    {text: '$ Per Point', key: 'weekly_dollars_per_point'},
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
      </div>
    </div>
  )
}

export default AccountDetails;
