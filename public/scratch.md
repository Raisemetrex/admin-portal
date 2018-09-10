

#  Users Order:
* id
* first_name
* last_name
* email_address
* current_account_id
* job_title
* job_description
* profile_image_url
* role
* timezone
* inserted_at
* updated_at

"columnOrder":[
"id",
"first_name",
"last_name",
"email_address",
"current_account_id",
"job_title",
"job_description",
"profile_image_url",
"role",
"timezone",
"inserted_at",
"updated_at"
]


# Accounts Order:
* id
* name
* subdomain
* status
* payment_token
* trial_expired_at
* banner_url
* has_demo_data
* weekly_recognition_target
* weekly_comments_target
* weekly_points_target
* weekly_user_dollar_limit
* weekly_dollars_per_point
* rewards_region
* inserted_at
* updated_at
* deactivated_at

"componentOptions":{
"columnOrder":[
"id",
"name",
"subdomain",
"status",
"payment_token",
"trial_expired_at",
"banner_url",
"has_demo_data",
"weekly_recognition_target",
"weekly_comments_target",
"weekly_points_target",
"weekly_user_dollar_limit",
"weekly_dollars_per_point",
"rewards_region",
"inserted_at",
"updated_at",
"deactivated_at"
]}


{
  "sql":
"SELECT * ,date_part('day', age(a1.trial_expired_at, now()))::int4 AS trial_expires
,(
    SELECT count(ps.id) FROM posts ps
    INNER JOIN users u ON u.id = ps.sender_id AND u.role != 'demo-member'
    WHERE ps.account_id = a1.id AND category = 'status-post'
) AS status_updates
,(
    SELECT count(ps.id) FROM posts ps
    INNER JOIN users u ON u.id = ps.sender_id AND u.role != 'demo-member'
    WHERE ps.account_id = a1.id AND category IN ('recognition-post', 'group-recognition-post', 'team-recognition-post')
) AS woos
,(
    SELECT count(i.id) FROM invitations i
    WHERE i.account_id = a1.id
) AS invitations
,(
    SELECT count(u.id) FROM users u
    WHERE u.current_account_id = a1.id AND u.role != 'demo-member'
) AS users
,(
    SELECT count(r.id) FROM post_reactions r
    INNER JOIN posts p ON r.post_id = p.id AND p.account_id = a1.id
) AS likes
,(
    SELECT count(c.id) FROM post_comments c
    INNER JOIN posts p ON c.post_id = p.id AND p.account_id = a1.id
) AS comments
FROM accounts a1
WHERE
status = 'free-trial'
",
"componentOptions": {
  "columnOrder": [
  "id",
  "name",
  "subdomain",
  "status",
  "payment_token",
  "trial_expired_at",
  "trial_expires",
  "status_updates",
  "woos",
  "invitations",
  "users",
  "likes",
  "comments",
  "banner_url",
  "has_demo_data",
  "weekly_recognition_target",
  "weekly_comments_target",
  "weekly_points_target",
  "weekly_user_dollar_limit",
  "weekly_dollars_per_point",
  "rewards_region",
  "inserted_at",
  "updated_at",
  "deactivated_at"
  ]
}
}



SELECT
a.*,u.email_address
FROM accounts a INNER JOIN users u ON a.id = u.current_account_id AND u.role = 'owner'
