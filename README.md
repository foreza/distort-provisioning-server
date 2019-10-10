## Distort 
MVP Backend server for provisioning test devices. 

*Problem*: Setting up new devices on a new wifi connection for a large amount of users/devices is troublesome.

*Solution*: Use a master device (already connected) to broadcast said password over a temporary session to all clients (slaves). 


## TODOs:
* Upgrade Node Dependencies to latest versions (done)
* Add all proposed APIs to documentation
* Add API authentication to 'admin' routes (ie: listing all sessions should be an admin only function)
* Add additional layer of encryption to the broadcast info (using hmac/bcrypt)


# API DOCUMENTATION 

*[ADMIN] Show all available distort sessions.*

**URL** : `/api/distort`
**Method** : `GET`
**Data constraints** : `{}`

## Success Responses
**Condition** : No sessions in the DB / sessions unavailable.
**Code** : `200 OK`
**Content** : `{[]}`

### OR
**Condition** : User can see 1 or more distort sessions.
**Code** : `200 OK`
**Content** : User will be provided a list of the sessions.


```json
{
    "TODO": 123
}
```


*[PUBLIC] Get a specific distort session information by ID (if present)*

**URL** : `/api/distort`
**Method** : `GET`
**Data constraints** : 
Provide the UID of the specific session to be retrieved.

```json
{
    "broadcastUID": "[]"
}
```

**Working example** 
All fields must be sent.

```json
{
    "broadcastUID": "123456"
}
```

## Success Responses

**Condition** : No matching session found.
**Code** : `200 OK`
**Content** : `{[]}`

### OR
**Condition** : Matching session was found.
**Code** : `200 OK`
**Content** : User will be provided with the information of that session.


```json
{
    "TODO": 123
}
```


*TODO: Create a new distort session*
**URL** : `/api/distort`
**Method** : `POST`

*TODO: Update a new distort session*
**URL** : `/api/distort`
**Method** : `PUT`

*TODO: Delete a distort session*
**URL** : `/api/distort`
**Method** : `DELETE`

*TODO: Delete all distort sessions*
**URL** : `/api/distort`
**Method** : `DELETE`
