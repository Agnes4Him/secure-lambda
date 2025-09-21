import boto3

client = boto3.client("cognito-idp")

response = client.initiate_auth(
    AuthFlow="USER_PASSWORD_AUTH",  # or ADMIN_USER_PASSWORD_AUTH if using admin creds
    AuthParameters={
        "USERNAME": "",             # user1 email
        "PASSWORD": ""              # user1 password
    },
    ClientId=""                     # Cognito App Client ID
)

id_token = response["AuthenticationResult"]["IdToken"]
access_token = response["AuthenticationResult"]["AccessToken"]
refresh_token = response["AuthenticationResult"]["RefreshToken"]

print("ID Token:", id_token)
