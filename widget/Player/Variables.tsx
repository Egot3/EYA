import AstalMpris from "gi://AstalMpris"	//new start of old tree
import {createBinding, createState, createComputed} from 'ags'

const mpris = AstalMpris.get_default()

const [isExpanded, setIsExpanded] = createState<boolean>(false)
const [chosenPlayerIdentity, setChosenPlayerIdentity] = createState<string>("Spotify")	//modesty state(like a vanity url, but opposite, get it?)

const players = createBinding(mpris, 'players')

const currentPlayer = createComputed(()=>{
	const iden = chosenPlayerIdentity()
	const availiblePlayers = players()
	
	console.log("Looking for player with identity:", iden);
    	console.log("players avail:", availiblePlayers.map(p => p.identity));
    
    	const found = availiblePlayers.find(p => p.identity.toLowerCase() === iden.toLowerCase());
    	console.log("player:", found?.identity || "null");

	return availiblePlayers.find(p => p.identity === iden) || null
})

setTimeout(() => {
    console.log("DEBUG - Players after delay:", players().map(p => p.identity));
}, 3000);

export{
	isExpanded,
	setIsExpanded,
	chosenPlayerIdentity,
	setChosenPlayerIdentity,
	players,
	currentPlayer
}
