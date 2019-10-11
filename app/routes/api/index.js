
const router = require('express').Router();
const distortSessions = require('./distort');
router.use('/distort', distortSessions);


router.get('/', (req, res) => {
    return res.send("Can't touch this");
});



module.exports = router;
