const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.getUserById = async function (req, res) {
    try {
        let user = await User.findById(req.id)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send("Failed to find user.")
    }
}
exports.getUserByEmail = async function (email, res) {
    try {
        return await User.find({ email: email })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

exports.addUser = async function (req, res) {
    try {
        await bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            if (err) throw err
            let user = new User({ email: req.body.email, password: hash, username: req.body.username, name: req.body.name })
            try {
                await user.save()
                res.status(200).send({ name: user.name, email: user.email, username: user.username })
            } catch (error) {
                console.log(error)
                res.status(400).send("Failed to create new user.")
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).send("Failed to create new user.")
    }
}

exports.logout = async function (req, res) {
    try {
        req.logout()
        res.status(200).send("Logged out")
    }
    catch (error) {
        res.status(400).send("Could not logout")
    }
}

exports.validatePwd = async function (password, hashedPwd) {
    return await bcrypt.compare(password, hashedPwd);
}