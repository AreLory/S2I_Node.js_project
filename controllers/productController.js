const Product = require('../models/product');
//Create product (POST)
exports.createProduct = async (req, res) => {
    try {
        const { name } = req.body
        const product = new Product({ name })
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
};
//Get all products (GET)
exports.getProductsList = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
}
//Get a product (GET)
exports.getProduct = async (req, res) => {
    const prodId = req.params.id
    const product = await Product.findById(prodId).then((result) => {
        res.status(200).json(product);
    }).catch((err) => {
        res.status(404).json(err);
    })

}


//Delete product (Delete)
exports.deleteProduct = async (req, res) => {
    try {
        const prodId = req.params.id
        Product.findByIdAndDelete(prodId).then(() => {
            res.status(201).json('Product Deleted')
        })
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
}
//Update product (PUT)
exports.updateProduct = async (req, res) => {
    try {
        let prodId = req.params.id
        const product = Product.updateById(
            prodId,
            { name: req.body.name },
            { new: true }
        );
        res.status(201).json('Product Updated')
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
}

