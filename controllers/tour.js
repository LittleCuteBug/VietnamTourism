const db = require('../db/models');
const Tour = db.Tour;
const Location = db.Location;

const createTour = async (req, res) => {
    const newTour = {
        UserId: req.body.userId,
        name: req.body.name,
        description: req.body.description
    }
    try {
        await Tour.create(newTour);
        res.status(200).send({
            code: 0,
            message: "Add new Tour success!"
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const addLocation = async (req, res) => {
    try {
        let thisTour = await Tour.findOne({
            where: {
                id: req.body.tourId
            }
        });
        if (!thisTour)
            throw "Tour not found!";

        let locationIdList = req.body.locations;
        let locationList = await Location.findAll({
            where: {
                id: locationIdList
            }
        })
        await thisTour.setLocations(locationList);

        
        res.status(200).send({
            code: 0,
            message: "Add Tour's locations success!"
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}




const tour = {
    createTour: createTour,
    addLocation: addLocation
}
module.exports = tour;