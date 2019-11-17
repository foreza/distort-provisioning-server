$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
});


// POST a session to the distort service
/*
    -  Note that validation should be done server side as well.
    -  TODO: Properly extend and utilize the success/error handlers.
    -  TODO: Implement some modal to indicate to user when validation catches something.
*/
function createSession() {


    if (!util_validateUidInput($("#form_broadcastUID").val())) {
        // Short terminate for now.
        return;
    }

    $.ajax({
        url: '/api/distortAdmin/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify (
            { "broadcastUID": $("#form_broadcastUID").val(), 
            "broadcastText": $("#form_broadcastContent").val() 
        }),
        processData: false,
        success: function (data, textStatus, jQxhr) { $(".result").html(data); },
        error: function (jqXhr, textStatus, errorThrown) { console.log(errorThrown); }
    });

}

// GET a list of all sessions from the distort service
function getListOfAllSessions() {
    $.ajax({
        url: '/api/distortAdmin/',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        processData: false,
        success: function (data, textStatus, jQxhr) {
            $("#sessionList").html(util_formatSessionData(data));
        },
        error: function (jqXhr, textStatus, errorThrown) { console.log(errorThrown); }
    });
}

function util_formatSessionData(data) {

    var htmlReturn = "";

    for (var i = 0; i < data.length; ++i) {

        htmlReturn += "<tr>"
            + "<td class='td_genID'>" + data[i]._id + "</td>"
            + "<td class='td_uID'>" + data[i].broadcastUID + "</td>"
            + "<td class='td_isActive'>" + data[i].isSessionActive + "</td>"
            + "<td id='td_detail[" + [i] + "]'><a class='waves-effect waves-light btn'>Details</a></td>"
            + "</tr>";

    }

    return htmlReturn;

}

// Utility function to perform some basic input validation
/*
    - UID must be at least 4 characters long (recommended 5-6 characters)
    - UID must be alphaNumeric
    - Regular expression from here: https://stackoverflow.com/questions/336210/regular-expression-for-alphanumeric-and-underscores
    - * Collision checking will be performed by DB *
*/
function util_validateUidInput(input) {
    
    // Match against not just english characters
    if (input.match(/^\w+$/) != null){
        return true;
    } 

    return false;

}