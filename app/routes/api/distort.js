const router = require('express').Router();
const distortUtils = require('../../utilities/utils_distort');


router.get('/', (req, res) => {

	console.log('req: ' + req.query.distortUID);

	if(req.query.distortUID){
		distortUtils.getDistortSessionByDistortSessionUID(req.query.distortUID)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found with that ID' )
					return res.send(session);
				}
			});
	}	
	else {
		distortUtils.listAllDistortSessions().then(sessionList => {
			if (!sessionList){
				return res.sendStatus(400);
			} else {
				return res.send(sessionList);
			}
		});
	}
});

router.post('/', (req, res) => {
	const { broadcastUID, broadcastText } = req.body;

	// If we are not provided the ID or fname or last name in the req body, fail it
	if (!broadcastUID || !broadcastText) {
        return res.sendStatus(400);
    }
		console.log('Creating session' );
		distortUtils.createSession({ broadcastUID, broadcastText}), () => res.sendStatus(400);
		res.sendStatus(201);


});



module.exports = router;
