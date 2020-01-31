exports.getDiapers = function (req, res, next) {
    let diapers = []
    let diaper = {
        "type": "wet",
        "timestamp": "1580322570431"
    }
    diapers.push(diaper)
    res.send(diapers)
}

exports.addDiaper = function (req, res, next) {
    res.send('MOCK ADD DIAPER OK')
}

exports.getDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('MOCK GET DIAPER BY ID OK')
}

exports.updateDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('MOCK UPDATE DIAPER OK')
}

exports.deleteDiaperById = function (req, res, next) {
    const id = req.params.diaperId
    res.send('MOCK DELETE DIAPER OK')
}