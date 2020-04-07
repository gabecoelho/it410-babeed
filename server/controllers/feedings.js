const Feeding = require('../models/feeding')

exports.getFeedings = (req, res) => {
    const email = req.user.email
    Feeding.find({ email }, (err, feedings) => {
        if (err)
            console.log(err);
        else
            res.json(feedings)
    });
}

exports.addFeeding = async (req, res) => {
    let feeding = new Feeding(req.body)
    console.log(feeding.toString());
    try {
        await feeding.save()
        res.status(200).json({ "Message": "New feeding entry added successfully." })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to create new feeding." })
    }
}

exports.getFeedingById = async (req, res) => {
    const id = req.params.id
    try {
        let result = await Feeding.findById(id)
        res.send(result)
    } catch (error) {
        res.status(400).json({ "Message": "Failed to get specified feeding entry." })
    }
}

exports.updateFeedingById = async (req, res) => {
    let feeding = new Feeding(req.body)
    const id = req.params.id
    try {
        let result = await Feeding.findByIdAndUpdate(id, feeding, {
            new: true
        })
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to update feeding entry." })
    }
}

exports.deleteFeedingById = async (req, res) => {
    const id = req.params.id
    try {
        await Feeding.deleteOne({ _id: id })
        res.send('Deleted record')
    } catch (error) {
        console.log(error)
        res.status(400).json({ "Message": "Failed to delete feeding." })
    }
}