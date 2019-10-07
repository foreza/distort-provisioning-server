var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*

broadcastUID        - some unique string identifier we can index the broadcast Text by.
broadcastText       - some text string that we want to share with all slave clients
isSessionActive     - boolean value that indicates whether a session is active or not.

meta - 
    created_at      - Track the date the session was first created
    times_requested - Track the # of times the session was created.
*/


var DistortSessionSchema = new Schema({
    broadcastUID: {
        type: String,
        require: true
    },
    broadcastText: {
        type: String,
        default: "123456789",
        require: true
    },
    isSessionActive: {
        type: Boolean,
        default: true,          // Set isSessionActive to default to 'true' for ease of testing
        require: false
    },
    meta: {
        created_at: {
            type: Date,
            default: Date.now
        },
        times_requested: {
            type: Number,
            default: 0
        }

    }
});

module.exports = mongoose.model('DistortSession', DistortSessionSchema);
