# articles_api
An API to fetch data from a postgresql which can be cached

# Installation
After cloning the project:

With yarn:
```
$ yarn install
```

Or with npm:
```
$ npm i
```

Then launch the project:
With yarn:
```
$ yarn start
```

Or with npm:
```
$ npm start
```

# Routes
No finished documentation for routes yet. Available routes can be checked in router.js.

# Host 
Host is set by default to '0.0.0.0' it means that it will be available on your public IP.
If you prefer localhost, simply remove '0.0.0.0' params in index.js, it will set host to localhost.

# TODO list: 
- Response serializer to send exact same data structure for a game no matter the endpoint.
- RoomId is now stored in room as localRoomId. This is transitory. And roomId should be deleted from events to use only localRoomId (and refactore it into roomId) EDIT: Not sure it is a good idea. On leaving due to timeout localRoomId seems to be empty