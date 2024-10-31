import { DynamoDB } from 'aws-sdk';

const { ENDPOINT_URL, REGION } = process.env;


export const dynamoDBClient = new DynamoDB.DocumentClient({
  region: REGION,
});
