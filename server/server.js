import express from 'express';
import path from 'path';
// Import necessary AWS SDK v3 packages
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

//Import aws cognito
import { CognitoIdentityProviderClient, 
    SignUpCommand, 
    ConfirmSignUpCommand, 
    InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Initialize DynamoDB Client
const ddbClient = new DynamoDBClient({ 
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }, });
const docClient = DynamoDBDocumentClient.from(ddbClient); // Initialize DynamoDB Document Client

//initialize cognito client
const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-west-2' });

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});