import { docClient, ScanCommand } from '../server.js';

export const getItems = async (req, res) => {
    const params = {
        TableName: 'cloud_items',
    };
    try {
        const data = await docClient.send(new ScanCommand(params));
        res.json( data.Items );
    } catch (err) {
        console.error('Error getting tasks from DynamoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};