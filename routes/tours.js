const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is tours pages');
})
router.get('/:name/:location/:rating/:price', (req, res) => {
    res.send(req.params);
})

module.exports = router;