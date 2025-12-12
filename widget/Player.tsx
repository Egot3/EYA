import { For,  createBinding, createState, createEffect, createComputed } from 'ags'
import AstalMpris from "gi://AstalMpris"
import Adw from "gi://Adw"
import { Gtk } from "ags/gtk4"

/*
 *	DEPRICATED 	*(not like it worked)
 *
const [currentPlayer, setCurrentPlayer] = createState<Mpris.Player | null>(null)
const [isPlayerMounted, setIsPlayerMounted] = createState<boolean>(false)
const [trackData, setTrackData] = createState<Record>({
	ready: false,
    	title: "",
    	creator: "",
    	album: "",
    	cover: '',
    	length: 0,
    	position: 0,
    	playbackStatus: 3 //holy typing
})

Mpris.get_default().connect('player-added', (_, player)=>{
	console.log('appeared: ',player.identity)
	console.log('Current player:', currentPlayer())
    	console.log('New player:', player)
	console.log('current title^', player.title)
	
	if (player.bus_name.includes('spotify') || player.identity.toLowerCase().includes('spotify')) {
        setCurrentPlayer(player)
	setIsPlayerMounted(true)
	
	console.log("in state:",currentPlayer().identity,"in variable:", player.identity)
	player.connect("notify",()=>{
		setTrackData(updateInfo())
		//console.log(data())
	}) 
}
})

const setPosition = (pos: number) => {
	const player = currentPlayer()
	console.log("player in position: ",player)
	if(player){
		player.position = pos
	}
}



const updateInfo = () =>{
	const player = currentPlayer()
		

	if(!player){ //was !!! for fun and jiggles
		return{
			ready: false,
			title: "accessing...",
			creator: "guess, lmao",
			album: 'none and all at the same time',
			cover: '',
			length: 0,
			position: 0,	//fun fact: they were string type b4
			playbackStatus: 3
		}
	}
	
	//console.log(player.playback_status)
	return{
		ready: true,
		title: player.title || '',    //"player is ready" type double pipes
		creator: player.artist || '',
		album: player.album || '',
		cover: player.cover_art || '',
		length: player.length || 0,
		position: player.position || 0,
		playbackStatus: player.playback_status 
	}
}
*/ //worthless hours of pain(but tsx is hella cool)




const Player = () => {
    	console.log("render")
	
	const mpris = AstalMpris.get_default()

	const players = createBinding(mpris, 'players')		
		
	return(
	<For each={players}>
	{(player) => {console.log('five')
		
		if(player.identity==="Spotify"){
			
			const playerPositionBinding = createBinding(player, 'position')

			const [isDragged, setIsDragged] = createState<boolean>(false) //define uselessness
			const [sliderValue, setSliderValue] = createState<number>(0)
				
			createEffect(()=>{
				const dragging = isDragged()
				const position = playerPositionBinding() //maybe () used wrong //it is //no it wasn't
				console.log("effect's effect: drag:", dragging, "position:", position)
				if(!dragging){
					console.log('completely ordinary situation')
					setSliderValue(position)
				}
			})
			
			createEffect(()=>{
				console.log("drag changed:", isDragged())
			}) //my friendship with createComputed is over, now createEffect is my best friend

			return(
			<Adw.Clamp maximumSize={400}>
        		<centerbox class={"playerHolder"} vexpand={true}>
			<box $type="start">	
			<box class={'imageWrapper'} >
           		<image	
	   		class={"cover"} 
	    		file={createBinding(player, "coverArt")}
	   		pixelSize={26}
	    		/>
			</box>

        		<box class={"generalInfo"} homogeneous={true} $type="center"  orientation={Gtk.Orientation.VERTICAL}>
				<centerbox orientation={Gtk.Orientation.VERTICAL}>
				
				<centerbox $type="center">
					<box $type='start' homogeneous={true} >
         				<label label={createBinding(player, "title")} class={"title"} maxWidthChars={32}/>
					</box>
				</centerbox>
				
				<centerbox orientation={Gtk.Orientation.HORIZONTAL} $type="end">
				<box homogeneous={true} $type="start">
					<label label={createBinding(player, 'artist')} class={"creator"}/>
				</box>
				<box $type="center" class="creator">|</box>
				<box homogeneous={true} $type="end">
					<label label={createBinding(player, 'album')} class="album"/>
				</box>
				</centerbox>
				</centerbox>{/*DOMAIN EXPANSION: CSS GRID CRUTCH*/}
	       		</box>{/*which is general info*/}
			</box>{/*which is center position*/}
			
			<button 
			$type="end"
			class={"sliderHolder"} 
			can-focus={false}
			onClicked={
				()=>{
					console.log("I think I am")
					player.position = sliderValue()
					setTimeout(()=>{
						setIsDragged(false)
						player.play()	
					}, 100)
					
				}
			}
			halign={0} //it's probably already 0(stock val)
			
			>
        		<slider
				$type="end"
				value={createComputed(()=>sliderValue())} //why //патамучта панабирают там всяких 

        			min={0}
             			max={createBinding(player, "length")}

				class={"positionSlider"}
                		onChangeValue={(slider)=>{
					player.pause()
					setIsDragged(true)
					//console.log(isDragged())
					setSliderValue(slider.value)
					//console.log('isDragged:', isDragged(), "player.pos", player.position)
                   		}}
            />
	    </button>
        			</centerbox>
			</Adw.Clamp>
	)
	}else return (<box></box>)
	//lmfao, wtf is ts ^^^
	}//arrow function(sounds redutant, but is not)

	}{/*//used in for*/}
	</For>

    )   
}

export default Player;
