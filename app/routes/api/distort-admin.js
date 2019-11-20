const router = require('express').Router();
const distortUtils = require('../../utilities/utils_distort');


// [Admin] Get an session by a provided UID.
/*
    - By default, the session will be set to false (not broadcasting)
    - The public facing route will apply a filter to search
*/
router.get('/:uid', (req, res) => {

	//  Look up uid from our URL path
	console.log('req: ' + req.params.uid);

	if(req.params.uid){
		distortUtils.getDistortSessionByDistortSessionUID(req.params.uid)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session exists with that ID' )
					return res.sendStatus(404)
				}else {
					console.log('SUCCESS [], a session found with that ID' )
					return res.status(200).send(session);
				}
			});
	}
});


// [Admin] Activate a distort session and deactivate it shortly afterwards
router.put('/activateWithLimit', (req, res) => {

	const { broadcastUID, timeLimit } = req.body;
	console.log('Activation request of ' + broadcastUID +  'with limit:' + timeLimit);

	if(broadcastUID){
		distortUtils.activateDistortSessionWithDistortSessionUID(broadcastUID)
			.then(session => {
				if(!session){
					console.log('ERROR [-1], no session with that ID' )
					return res.sendStatus(404)
				}else{
					console.log('SUCCESS [], session found with that ID' )
					
					// Close the session after some time - TODO: There is totally a better way to do this, this makes this not truly 'RESTFUL'
					/*
						- Perhaps consider adding this to a set-interval "sweep and clean" so that we don't cause weird logic.
					*/
					setTimeout(function () {
						console.log('Now disabling limited activation request - ', broadcastUID);

						distortUtils.deactivateDistortSessionWithDistortSessionUID(broadcastUID)
							.then(session => {
								if (!session) {
									console.log('ERROR [-1], no session with that ID')
									// return res.sendStatus(404)
								} else {
									console.log('SUCCESS [], session found with that ID')
									// return res.sendStatus(202)
								}
							});
					}, timeLimit);		// TODO: We should be able to configure this value more easily.

					return res.sendStatus(202)
				}
			});
	} else {
		console.log('ERROR [-1], invalid request' )
		return res.sendStatus(404)
	}

});



// [Admin] Activate a distort session
router.put('/activate', (req, res) => {

	const { broadcastUID } = req.body;
	console.log('Activation request!!', broadcastUID);

	if(broadcastUID){
		distortUtils.activateDistortSessionWithDistortSessionUID(broadcastUID)
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


// [Admin] DeActivate a distort session
router.put('/deactivate', (req, res) => {

	const { broadcastUID } = req.body;
	console.log('Deactivation request!!', broadcastUID);

	if(broadcastUID){
		distortUtils.deactivateDistortSessionWithDistortSessionUID(broadcastUID)
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




// [Admin] Get an active session by a provide UID.
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
	}
});



// [Admin] Delete an active session by a provide UID.
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
	}
});


// [Admin] Create a new session
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


module.exports = router;
