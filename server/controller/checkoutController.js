import {docClient, PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand} from '../server.js';

const orderIdGenerator = () => {
    const now = new Date();

    // Generate date and time components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    // Generate a random number component
    const randomComponent = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    // Concatenate all components to form the order number
    const orderNumber = `${year}${month}${day}${hour}${minute}${second}${randomComponent}`;

    return orderNumber;

}

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
        // res.status(401).json({ error: 'Unauthorized' });
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
        // res.status(401).json({ error: 'Unauthorized' });
    }
}

const placeOrder = async (req, res) => {
    if (req.session.email) {
        const email = req.session.email;  // primary key for the user referred to in the users table
        const orderItems = req.body.orderItems;
        const totalAmount = req.body.totalAmount;
        const orderID = orderIdGenerator();
        const orderDate = new Date().toISOString().split('T')[0]; // output : 2024-04-01

        const order = {
            orderID: orderID,
            orderDate: orderDate,
            orderItems: orderItems,
        };
        const params = {
            TableName: 'orders',
            Item: {
                email: email,
                orderID: orderID,
                orderDate: orderDate,
                orderStatus : 'Order Placed',
                trackingNumber : "",
                orderItems: orderItems,
                totalAmount: totalAmount,
            },
        };
        try {
            await docClient.send(new PutCommand(params));
            res.json({ order: order });
        } catch (err) {
            console.error('Error placing order in DynamoDB:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // res.status(401).json({ error: 'Unauthorized' });
    }
}

const getOrderHistory = async (req, res) => {
    if (req.session.email) {
        const email = req.session.email;
        const params = {
            TableName: 'orders',
            FilterExpression: 'email = :e',
            ExpressionAttributeValues: {
                ':e': email,
            },
        };
        try {
            const data = await docClient.send(new ScanCommand(params));
            res.json({ orders: data.Items });
        } catch (err) {
            console.error('Error getting order history from DynamoDB:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // res.status(401).json({ error: 'Unauthorized' });
    }
}

export { getShoppingCart, updateShoppingCart, placeOrder, getOrderHistory };