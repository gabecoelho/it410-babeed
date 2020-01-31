exports.getDiapers = function (req, res, next) {
    let diapers = []
    let diaper = {
        "type": "poop",
        "timestamp": "1580322570431"
    }
    diapers.push(diaper)
    res.send(diapers)
}

exports.addDiaper = function (req, res, next) {
    res.send('OK')
}

exports.getDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('OK')
}

exports.updateDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('OK')
}

exports.deleteDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('OK')
}