// Order in which to create resources
* SNS topic
* Secret in AWS Secrets Manager
* Internal Lambda with roles & permissions
* External Lambda 1 & 2 with roles & permissions
* WAF
* 2 Cognito User pools for user1 and user2
* API gateway with 2 resources and one POST endpoint each + WAF + Client certificate + throttling & rate limit

// Deletion order
* Secrets Manager
* Cognito users, App clients & User pools
* API gateway endpoints, reources, gateway, stage & client certificate
* WAF IP pool & WAF
* Lambdas
* Lambdas roles and policies
* CloudWatch Log Groups for Lambda functions
* SNS Topic
* IAM roles for the 3 Lambdas and corresponding permissions - Cloudwatch, Secrets Manager, SNS

// Requirements/ Pre-requisite
* Basic knowledege of AWS
* AWS Account with admin privilege
* AWS cli
* Git/ GitHub Account (to clone project repository)
* API clients (Postman, Thunderclient etc)