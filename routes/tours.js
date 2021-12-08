const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', (req, res) => {
    res.send('This is tours pages');
})

router.post(
    '/create',
    controller.tour.createTour
)

router.post(
    '/add_location',
    controller.tour.addLocation
)
module.exports = router;