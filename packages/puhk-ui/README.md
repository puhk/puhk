# puhk-ui

Puhk react-based client UI

## Development

```
yarn start
```

In another tab spawn the peerjs server

```
yarn peerjs --port 9000
```

Open `http://localhost:8080`

In the console use the following commands to start a game

```javascript
hostGame('name', 'avatar'); // create a new game
joinGame(hostId, 'name', 'avatar'); // join an existing game (host id can be retrieved with 'controller.network.peer._id')
```
