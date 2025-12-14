import AstalMpris from "gi://AstalMpris"	//new start of old tree
import {createBinding, createState, createComputed} from 'ags'
import logger from "../../utils/logger"

const mpris = AstalMpris.get_default()

const [isExpanded, setIsExpanded] = createState<boolean>(false)
const [chosenPlayerIdentity, setChosenPlayerIdentity] = createState<string>("Spotify")	//modesty state(like a vanity url, but opposite, get it?)

const players = createBinding(mpris, 'players')

const currentPlayer = createComputed(() => {
	const availiblePlayers = players()
	const targetIdentity = chosenPlayerIdentity()

	logger(`looking for player: ${targetIdentity}`, 100)
	logger(`players avail: ${availiblePlayers}`)

    
    	let player = availiblePlayers.find(p =>
        	p.identity.toLowerCase().includes(targetIdentity.toLowerCase())
    	);

    	if (player) {
        	logger(`player: ${player.identity}`, 200)
        	return player
	}

    	logger("Player not available at the moment", 300)
    	return null
});

setTimeout(() => {
    logger(`Players after delay: ${currentPlayer().identity}`,100);
}, 3000);

export{
	isExpanded,
	setIsExpanded,
	chosenPlayerIdentity,
	setChosenPlayerIdentity,
	players,
	currentPlayer
}
