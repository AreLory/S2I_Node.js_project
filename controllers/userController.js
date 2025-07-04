const User = require('../models/user');
//Create a new user (POST)
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = (req.body);
        const newUser = new User({ firstName, lastName, email });
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
};


//Get all users saved (GET)
exports.getUserList = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
}

//Get one user (GET)
exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        res.status(200).json();

    } catch (error) {
        res.status(500).json({ error: error.message || 'Server error' })
    }
}


//Delete user (Delete)
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        User.findByIdAndDelete(userId)
        res.status(200).json('User Deleted')
    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' })
    }
}

//Update user (Patch)
exports.updateUser = async (req, res) => {

    const userId = req.params.id
    const changes = req.body
    try {
        const user = await User.findByIdAndUpdate(userId, { $set: changes }, { new: true })
        res.status(200).json('User Updated')
    } catch (error) {
        res.status(500).json({ error: error.message || 'Errore nel server' })
    }
}