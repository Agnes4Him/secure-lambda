import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

import { SNSClient, 
    PublishCommand 
} from "@aws-sdk/client-sns";

const secretsManagerClient = new SecretsManagerClient();

const snsClient = new SNSClient({});

// Fetch topicArn from AWS Secrets Manager
async function getSecretValue(secretName) {
    try {
        const data = await secretsManagerClient.send(
                            new GetSecretValueCommand({
                            SecretId: secretName,
                            }),
                        );
        if (data.SecretString) {
            return JSON.parse(data.SecretString);
        }   else {
            let buff = Buffer.from(data.SecretBinary, 'base64');
            return JSON.parse(buff.toString("utf-8"));
        }
    } catch (err) {
        console.error('Error retrieving secret', err);                             // added for debugging
        throw err;
    }
}                                        

export const handler = async (event) => {

    let name = event['name'];
    console.log(`Request successfully received from ${name}`);    
    
    // Retrieve SNS Topic ARN from Secrets Manager
    let topicArn;
    let response;
    try {
        const secret = await getSecretValue('LambdaSNSTopicARN');
        topicArn = secret.TOPIC_ARN;
    } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify('An error occured, try again later.'),
        };
        console.error('Failed to load SNS Topic ARN from Secrets Manager', err);
        return response;        
    }

    // Publish to SNS topic
   try {
        const snsResponse = await snsClient.send(
        new PublishCommand({
            Message: name,
            TopicArn: topicArn,
        })
        );
        console.log("Message published successfully:", snsResponse.MessageId);
        response = {
            statusCode: 200,
            body: JSON.stringify(`Hello ${name}. Greetings from ExternalLambda1! Message forwarded to InternalLambda.`),
        };
        return response;
  } catch (err) {
        response = {
            statusCode: 500,
            body: JSON.stringify(`Sorry ${name}.An error occurred while processing your request.`),
        };
        console.error("Failed to publish message:", err);
        return response;
  }  
};