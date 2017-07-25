# Nojball Game

The core of nojball - physics, network, etc

## Installing

```
yarn install
yarn global add peer
```

## Running in Development

Start PeerJS server
```
peerjs --port 9000 --path p2p
```

Run nojball
```
yarn start
```

Open `http://localhost:8080`

In the console use the following commands to start a game
```
hostGame('name', 'avatar') - Create a new game
moveToTeam(id, 'red') - Move player to a team (host id is -1)
controller.start() - start game
controller.stop() - stop game
