# examNode
examNode

To run
Setup .env
``` bash
PORT = #Which port the server is runnning on;
SESSION_SECRET = #Secret for session
STATIC_PATH =  "../client/dist" # or where your building the client to

DEV_MODE = # "true" if running without SSR
DEV_ORIGIN = # Used for socket.io - where your client code is running on

```

Run:

``` bash
$ cd client
$ npm run build

$ cd ../server
$ node app.js
```

currently got support for body data with text, json and urlencoded