const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get(
    '/', 
    controller.location.getAllLocations
);
router.get(
    '/:id',
    controller.location.getLocationWithId
);
router.post(
    '/filter',
    (req, res) => {
        res.send(req.body);
    }
);
router.post(
    '/add',
    controller.location.addLocation
);

module.exports = router;