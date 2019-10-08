const distortSessionModel =  require('../models/distortSession');
const distortSessionUtils = {};

// This utility method creates a new session
distortSessionUtils.createSession = newDistortSession => {
    return new Promise((resolve, reject) => {
        distortSessionModel.create(newDistortSession, (err, createdDistortDession) => {
            if (err) reject(err);
            resolve(createdDistortDession);
        });
    });
}

// This utility returns a session information given a session unique ID
distortSessionUtils.getDistortSessionByDistortSessionUID = distortSessionID => {
    return new Promise((resolve, reject) => {
        console.log('Performing lookup on this id: ', distortSessionID);
        distortSessionModel.find({broadcastUID : distortSessionID}, (err, returnedDistortSession) => {
            if (err) reject(err);
            resolve(returnedDistortSession);
        });
    });
};


// This utility returns a session information given a session unique ID
// distortSessionUtils.startDistortSessionWithDistortSessionUID = distortSessionID => {
//     return new Promise((resolve, reject) => {
//         console.log('Performing lookup on this id: ', distortSessionID);
//         distortSessionModel.updateOne({broadcastUID : distortSessionID}, {
//             isSessionActive: true
//           }, (err, ret) => {
//             if (err) reject(err);
//             resolve(ret);
//         });
//     });
// };

distortSessionUtils.startDistortSessionWithDistortSessionUID = distortSessionID => {

    console.log('Performing lookup on this id: ', distortSessionID);

    return new Promise((resolve, reject) => {

        const filter = {broadcastUID : distortSessionID}
        const update = { isSessionActive: true};

        distortSessionModel.findOneAndUpdate(filter, update, (err, ret) => {
            if (err) {
                console.log('Error findOneAndUpdate: ', err);
                reject(err);
            }
            else {
                console.log('Did findOneAndUpdate: ');
                resolve(ret);
            }
        });
    });
};




// This utility lists all known distort sessions in the DB
distortSessionUtils.listAllDistortSessions = () => {
  return new Promise((resolve, reject) => {
    distortSessionModel.find({}, function(err, distortSessionList) {
      if (err){
        reject(err);
      }
      resolve(distortSessionList);

    });

});
};


module.exports = distortSessionUtils;
