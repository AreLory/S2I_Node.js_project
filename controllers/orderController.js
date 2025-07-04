const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

//Create Order (POST)  
exports.createOrder = async (req, res) => {

    try {
        const { user, products } = req.body

        const userFound = await User.findById(user);
        if (!userFound) {
            return res.status(404).json({ error: 'User not found' });
        }

        const prodArr = [];

        for (const productId of products) {
            const productFound = await Product.findById(productId);
            if (productFound) {
                prodArr.push(productFound._id);
            } else {
                return res.status(404).json({ error: `Product not found` });
            }
        }


        const order = new Order({
            user: userFound._id,
            products: prodArr
        });

        await order.save();
        res.status(201).json(order);

    } catch (err) {
        res.status(500).json({ error: 'Errore nel server' });
    }
}

//Get orders (GET)

exports.getOrdersList = async (req, res) => {
    try {
        const { date, product } = req.query;

        const filter = {};

        if (date) {
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate() + 1);

            filter.data = { $gte: start, $lt: end };
        }

        if (product) {
            filter.products = product;
        }

        orders = await Order.find(filter);
        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' })
    }
}


//Get a order (GET)
exports.getOrder = async (req, res) => {
    try {
        const orderId = req.params.id

        const getOrder = await Order.findById(orderId)
        if (!getOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(getOrder)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' })
    }
}


//Delete order (DELETE)

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json('Order deleted');
    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' });
    }
};

//Update order (PATCH)

exports.updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const changes = req.body

    try {
        const updateOrder = await Order.findByIdAndUpdate(orderId, { $set: changes }, { new: true })
        res.status(200).json('Order updated')
    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' })
    }
}