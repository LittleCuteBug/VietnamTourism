const db = require('../db/models');
const Location = db.Location;

const addLocation = async (req, res) => {
    const newLocation = {
        name: req.body.name,
        address: req.body.address,
        image: req.body.image,
        priceMinPerPerson: req.body.priceMinPerPerson,
        priceMaxPerPerson: req.body.priceMaxPerPerson,
        timeOpen: req.body.timeOpen,
        timeClose: req.body.timeClose,
        type: req.body.type
    }
    try {
        await Location.create(newLocation);
        res.status(200).send({
            code: 0,
            message: "Add new location success!"
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const getAllLocations = async (req, res) => {
    try {
        let locationList = await Location.findAll();
        res.status(200).send(locationList);
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const getLocationWithId = async (req, res) => {
    try {
        let location = await Location.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send(location);
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const deleteLocationWithId = async (req, res) => {
    try {
        let location = await Location.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            message: `Deleted location with id: ${req.params.id}`
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}



const location = {
    addLocation: addLocation,
    getAllLocations: getAllLocations,
    getLocationWithId: getLocationWithId,
    deleteLocationWithId: deleteLocationWithId
}
module.exports = location;