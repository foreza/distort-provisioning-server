
const router = require('express').Router();


const distortSessions = require('./distort-public');            // For public sessions, use the distort-public path
const distortAdministration = require('./distort-admin');       // For administrative / testing, use distort-admin path

router.use('/distort', distortSessions);
router.use('/distortAdmin', distortAdministration);

// Nobody should be accessing this.
router.get('/', (req, res) => {
    return res.sendStatus(403);
});

module.exports = router;
