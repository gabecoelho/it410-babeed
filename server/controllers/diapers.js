const Diaper = require('../models/diaper')

exports.getDiapers = function (req, res) {
    Diaper.find((err, diapers) => {
        if (err)
            console.log(err);
        else
            res.json(diapers)
    });
}
exports.getDiapersByUser = function (req, res) {
    const username = req.params.username
    Diaper.find({ username }, (err, diapers) => {
        if (err)
            console.log(err);
        else
            res.json(diapers)
    });
}

exports.addDiaper = async function (req, res) {
    let diaper = new Diaper(req.body)
    try {
        await diaper.save()
        res.status(200).json({ "Message": "New diaper added successfully." })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to create new diaper." })
    }
}

// exports.getDiaperById = async function (req, res) {
//     const id = req.params.id
//     try {
//         let result = await Diaper.findById(id)
//         res.send(result)
//     } catch (error) {
//         res.status(400).json({ "Message": "Failed to get specified diaper." })
//     }
// }

exports.updateDiaperById = async function (req, res) {
    let diaper = new Diaper(req.body)
    const id = req.params.id
    try {
        let result = await Diaper.findByIdAndUpdate(id, diaper, {
            new: true
        })
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to update diaper." })
    }
}

exports.deleteDiaperById = async function (req, res) {
    const id = req.params.id
    try {
        await Diaper.deleteOne({ _id: id })
        res.send('Deleted record')
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to delete diaper." })
    }
}