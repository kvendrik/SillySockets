# SillySockets [WIP]
#### A host-it-yourself easy to use and setup service for languages that don't play nice with sockets

Now and then you want to or have to use a language that doesn't play nice with sockets, thats when you use SillySockets. A host it yourself sockets service that can be controlled with simple HTTP requests.

### Setup
```
git clone git@github.com:kvendrik/SillySockets.git
cd SillySockets
make install
make run
```

### How to use

#### Listening for Events

##### SillySockets
```
./db create superapp
./db add-event superapp set-awesomeness http://your-server-url/set-awesomeness
```

##### Client
```javascript
io.connect('[SILLYSOCKETS_URL]', { query: 'APP_ID=superapp' });
io.emit('set-awesomeness', { level: 'over9000' });
```

##### Your Server
```javascript
app.post('/set-awesomeness', function(req, res){
    console.log(req.body);
    //{ level: 'over9000' }
});
```

#### Emitting Events
```
curl -H "Content-Type: application/json" -X POST
-d '{ event: 'new-awesomeness', action: 'emit', data: { level: 'over90000' } }' <SILLYSOCKETS_URL>/<APP_ID>
```
