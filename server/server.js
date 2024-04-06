import express from 'express';
import {router} from './router.js';
import path from 'path';
import { fileURLToPath } from 'url';


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
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// for deployment: don't touch this!!!!!!!!!!!!!! by Grace
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(router);  // Use router
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Test route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// export dynamoDB credentialed modules
export { docClient, PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand };

app.listen(port, () => {
    console.log('Server is running on port 5000');
});