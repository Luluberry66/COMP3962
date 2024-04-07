import {docClient, PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand} from '../server.js';

const getShoppingCart = async (req, res) => {
    if (req.session.email) {
        const email = req.session.email;
        const params = {
            TableName: 'users',
            Key: {
                email: email,
            },
        };
        try {
            const data = await docClient.send(new GetCommand(params));
            res.json({ shoppingCart: data.Item.shoppingCart });
        } catch (err) {
            console.error('Error getting shopping cart from DynamoDB:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const updateShoppingCart = async (req, res) => {
    if (req.session.email) {
        const email = req.session.email;
        const shoppingCart = req.body.shoppingCart;
        const params = {
            TableName: 'users',
            Key: {
                email: email,
            },
            UpdateExpression: 'set shoppingCart = :c',
            ExpressionAttributeValues: {
                ':c': shoppingCart,
            },
        };
        try {
            await docClient.send(new UpdateCommand(params));
            res.json({ message: 'Shopping cart updated' });
        } catch (err) {
            console.error('Error updating shopping cart in DynamoDB:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export { getShoppingCart, updateShoppingCart };