exports.getUserById = function (req, res, next) {
    const user = {
        "email": "someemail@email.com",
        "name": "Some Name"
    }
    res.send(user)
}

exports.addUser = function (req, res, next) {
    res.send("Hi " + req.body.name + "! Here is your secret value: " + req.secret)
}

exports.login = function (req, res, next) {
    res.send("Here it is again: " + req.body.secret)
}

exports.logout = function (req, res, next) {
    res.send('OK')
}