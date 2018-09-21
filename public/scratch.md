

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



INSERT INTO account_customisation
(
id,
account_id,
account_customisation_property_id,
name,
value,
inserted_at,
updated_at
)
VALUES
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'A533D2C1-8F76-4D40-A6EA-2301C2922AAC','Slack Access Token','xoxp-5021741061-295749618035-403858202497-da421da7fa15a68340ac07222bbbd165',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'D4C76BB5-41C5-4CCF-91C0-67C8F3999BDB','Slack Scope','identify,bot,commands,incoming-webhook,users:read,users:read.email',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'63E8D9BA-6F30-4373-829B-C760E8F75204','Slack Team Name','REFFIND',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'C9ECD92A-3FBD-4C60-A6EB-6AA612A9F86C','Slack Team ID','T050MMT1T',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'EFAEDB72-0316-4AD0-BFDF-EA23F73E5C40','Slack Webhook URL','https://hooks.slack.com/services/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',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'B945F2DB-97E2-470D-ADE1-98221C112226','Slack Webhook Channel','#wooboard',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'C0F3C12F-79BF-430B-A8FE-219DD9874C7C','Slack Webhook Configuration URL','https://reffindapp.slack.com/services/BCY9UKTFF',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'2DAD8AF1-47E0-41E9-889C-D35F9BA65639','Slack Bot User ID','UCYADK05V',
now(),now()
),
(uuid_generate_v4(),'8bf248f5-afaf-49f3-86d0-3e886c375ed1',
'F3A693F3-7355-4094-B5BA-9E7094A5820C','Slack Bot Access Token','xoxb-5021741061-440353646199-TMO3qwfnAeDcqAc0LqHnBcjo',
now(),now()
)

;
