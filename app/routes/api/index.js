
const router = require('express').Router();
const distortSessions = require('./distort');
router.use('/distort', distortSessions);
module.exports = router;
