# puhk-core

The core of Puhk - physics, network, etc

## Development

Run

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
hostGame('name', 'avatar'); // Create a new game
moveToTeam(id, 'red'); // Move player to a team (host id is -1)
controller.start(); // start game
controller.stop(); // stop game
```
