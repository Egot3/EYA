import { With,  createBinding, createState, createEffect, createComputed } from 'ags'
import { currentPlayer, setIsExpanded } from "./Variables.tsx" //TODO in github
import AstalMpris from "gi://AstalMpris"
import Adw from "gi://Adw"
import { Gtk } from "ags/gtk4"

// this comment was made at time when I decided to make widget have minor and major versions via scss, 12/13/25 19:00
// no scss will fix it

const Player = () => {
    	console.log("render")
		
	const [isDragged, setIsDragged] = createState<boolean>(false) //define uselessness
	const [sliderValue, setSliderValue] = createState<number>(0)
	

	createEffect(()=>{
		const player = currentPlayer()
		const dragging = isDragged()

		console.log('Effect: player:', player?.identity || 'none', "dragging:", dragging)

		if(!player||dragging){
			return	
		}
		
		const playerPositionBinding = createBinding(player, 'position')
		const playerPlaybackStatusBinding = createBinding(player, 'playbackStatus')

		const position = playerPositionBinding() //maybe () used wrong //it is //no it wasn't
		console.log("effect's effect: drag:", dragging, "position:", position)
		
		console.log('completely ordinary situation')
		setSliderValue(position)
		
	})
			
	createEffect(()=>{
		console.log("drag changed:", isDragged())
	}) //my friendship with createComputed is over, now createEffect is my best friend
	


	return(
		<With value={currentPlayer}>
		{(player) => {

			console.log("<with>:", player?.identity || 'Not found')
			
			if(player){
				return(
			<box orientation={Gtk.Orientation.VERTICAL}>

			<Gtk.EventControllerMotion
				propagationPhase={Gtk.PropagationPhase.CAPTURE}
				onEnter={()=>{
					popoverRef?.popup()
					setIsExpanded(true)
				}}
				onLeave={()=>{
					popoverRef?.popdown()
					setIsExpanded(false)
				}}
			/>

			<Adw.Clamp maximumSize={400}>
        		<centerbox class={"minorPlayerHolder"} vexpand={true}>
			<box $type="start">	
			<box
  				css="
  				border-radius: 4px;
				margin: 5px;	
				"
  				overflow={Gtk.Overflow.HIDDEN}
				hexpand={false}
				vexpand={false}
				>
  				<image
   					pixelSize={26}
   					file={createBinding(player, "coverArt")}
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
			
			<box 
			$type="end"
			class={"sliderHolder"} 
			can-focus={false}
			halign={0} //it's probably already 0(stock val)
			>

			<Gtk.GestureDrag
				propagationPhase={Gtk.PropagationPhase.CAPTURE}
				onDragEnd={()=>{
					player.position = sliderValue()
					setTimeout(()=>{
						setIsDragged(false)
						player.play()	
					}, 75) //could go to 50, but then it will cut not my ears, but eyes
		}}
		/>

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
            /> {/*to my future self(or if somebody discovers this): always use gestures on boxes*/}
	    </box>
        			</centerbox>
			</Adw.Clamp>

			{/*extended*/}
			
			{/*301*/}
			
			</box>
	
	
				)}
			else{
				return(
				<box>
					<label label="not found!"/>
				</box>
				)
			}
		}}
		</With>
	)
}



export { Player } //22:35, apperantly
export default Player;
