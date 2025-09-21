export const handler = async (event) => {
    try {
        console.log('Request successfully received from SNS');                            

        let name = event['Records'][0]['Sns']['Message'];
        let response = {
            statusCode: 200,
            body: JSON.stringify(`Hello ${name}. Greetings from InternalLambda!`),
        };       
        console.log('Response: ', response);                                                
        return response;
    } catch (err) {                            
        let response = {
            statusCode: 500,
            body: JSON.stringify('An error occurred while processing your request.'),
        };

        console.error('Error processing event', err);
        return response;
    }   
};