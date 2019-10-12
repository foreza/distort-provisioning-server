
const router = require('express').Router();
const distortSessions = require('./distort');
router.use('/distort', distortSessions);

// Nobody should be accessing this.
router.get('/', (req, res) => {
    return res.sendStatus(403);
});



module.exports = router;
