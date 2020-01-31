exports.getUserById = function (req, res, next) {
    const user = {
        "email": "Mock@Email.com",
        "name": "Mock Name"
    }
    res.send(user)
}

exports.addUser = function (req, res, next) {
    res.send('MOCK ADD USER OK')
}

exports.login = function (req, res, next) {
    res.send('MOCK LOGIN OK')
}

exports.logout = function (req, res, next) {
    res.send('MOCK LOGOUT OK')
}