const router = require('express').Router();
const distortUtils = require('../../utilities/utils_distort');


// [Public] Get an active session by a provide UID.
/*
	- By default, the session will be set to false (not broadcasting)
*/
router.get('/:uid', (req, res) => {

	//  Look up uid from our URL path
	console.log('req: ' + req.params.uid);

	if(req.params.uid){
		distortUtils.getDistortSessionByDistortSessionUID(req.params.uid)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found with that ID' )
					return res.status(200).send(session);
				}
			});
	}0
});


// [Public] Get an active session by a provide UID.
/*
	- By default, the session will be set to false (not broadcasting)
*/
router.delete('/:uid', (req, res) => {

	//  Look up uid from our URL path
	console.log('req: ' + req.params.uid);

	if(req.params.uid){
		distortUtils.removeDistortSessionWithDistortSessionUID(req.params.uid)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found and deleted with that ID' )
					return res.status(200).send(session);
				}
			});
	}0
});


// [Admin] Get all of the sessions.
router.get('/', (req, res) => {

		distortUtils.listAllDistortSessions().then(sessionList => {
			if (!sessionList){
				return res.sendStatus(400);
			} else {
				return res.send(sessionList);
			}
		});
		
});



// [Admin] Remove all of the sessions.
router.delete('/', (req, res) => {

	distortUtils.deleteAllDistortSessions().then(sessionList => {
		if (!sessionList){
			return res.sendStatus(400);
		} else {
			return res.send(sessionList);
		}
	});
	
});

router.post('/', (req, res) => {

	const { broadcastUID, broadcastText} = req.body;
	console.log('POST request!!', broadcastUID);

	// If we are not provided the ID or fname or last name in the req body, fail it
	if (!broadcastUID || !broadcastText) {
        return res.sendStatus(400);
    }
		console.log('Creating session' );
		distortUtils.createSession({ broadcastUID, broadcastText}), () => res.sendStatus(400);
		res.sendStatus(201);


});


router.put('/activate', (req, res) => {

	const { broadcastUID } = req.body;
	console.log('Put request!!', broadcastUID);

	if(broadcastUID){
		distortUtils.startDistortSessionWithDistortSessionUID(broadcastUID)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found with that ID' )
					return res.sendStatus(202)
				}
			});
	} else {
		console.log('ERROR [-1], invalid request' )
		return res.sendStatus(404)
	}


});




module.exports = router;
