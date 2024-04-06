import session from 'express-session';
import bodyParser from 'body-parser';
import { cognitoClient, docClient, PutCommand } from "../server.js";

const idGenerator = (name, email) => {
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const emailHash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fullHash = nameHash + emailHash;
    return fullHash.toString();
}

const authenticateUser = async (req, res) => {
    console.log("authenticating user...")
    const { email, password } = req.body;
    const cognitoParams = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            'USERNAME': email,
            'PASSWORD': password,
        },
    };
    cognitoClient.initiateAuth(cognitoParams, (err, data) => {
        if (err) {
            console.error('Error authenticating user:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('successfully authenticated user');
            res.json({ success: 'User authenticated successfully' });
        }
    });
    req.session.email = email;
    req.session.authenticated = true;
}

const register = async (req, res) => {
    console.log("registering user...")
    const { name, email, password } = req.body;
    const id = idGenerator(name, email);
    const cognitoParams = {
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'name', Value: name },
        ],
    };
    cognitoClient.signUp(cognitoParams, async (err, data) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('successfully added user to cognito');
            const ddbParams = {
                TableName: 'users',
                Item: {
                    email: email,
                    name: name,
                    id: id,
                },
            };
            try {
                await docClient.send(new PutCommand(ddbParams));
                console.log('successfully added user to dynamoDB');
                res.json({ success: 'User created successfully' });
            } catch (err) {
                console.error('Error creating user:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    });
    req.session.email = email;
    req.session.authenticated = true;
}

export { authenticateUser, register };