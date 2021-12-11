const db = require('../db/models');
const Tour = db.Tour;
const Location = db.Location;
const TourReview = db.TourReview;

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

const deleteTour = async (req, res) => {
    try {
        await Tour.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            code: 0,
            message: "Delete Tour success!"
        });
    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}

const addReview = async (req, res) => {
    try {
        let thisTour = await Tour.findOne({
            where:{
                id: req.body.tourId
            }
        });
        if (!thisTour)
            throw "Tour not found!";
        let newTourReview = {
            userId: req.body.userId,
            comment: req.body.comment,
            star: req.body.star,
            create_date: Date.now()
        }
        let TourReviewInstace = await TourReview.create(newTourReview);
        thisTour.setTourReviews(TourReviewInstace);
        res.status(200).send({
            code: 0,
            message: "Add new tour review success"
        });

    } catch (error) {
        res.status(500).send({
            code: 1,
            message: error.message
        });
    }
}
const deleteReview = async (req, res) => {
    try {
        let thisTour = await Tour.findOne({
            where:{
                id: req.body.tourId
            }
        });
        if (!thisTour)
            throw "Tour not found!";

        await thisTour.removeTourReviews({
            where: {
                userId: req.body.userId,
                create_date: req.body.create_date
            }
        });
        await TourReview.destroy({
            where: {
                userId: req.body.userId,
                create_date: req.body.create_date
            }
        })
        res.status(200).send({
            code: 0,
            message: "Delete tour review success"
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
    addLocation: addLocation,
    deleteTour: deleteTour,
    addReview: addReview,
    deleteReview: deleteReview
}
module.exports = tour;