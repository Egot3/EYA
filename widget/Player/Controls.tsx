import AstalMpris from "gi://AstalMpris"
import Adw from "gi://Adw"
import { Gtk } from "ags/gtk4"
import { createComputed, createBinding } from "ags"
import { currentPlayer, isExpanded } from "./Variables.tsx"

const Controls = () => {
	const player = currentPlayer()
	if(player){
	const isPlaying = createComputed(()=>{
		const status = playerPlaybackStatusBinding()
		return status
	})

	return(
		<Adw.Clamp maximum-size={84} overflow={Gtk.Overflow.HIDDEN}>
			<centerbox width-request={84} class={'controlsHolder', isExpanded() ? 'active' : 'retrieved'}>
				<box $type='start'>
					<button onClicked={()=>player.previous()}>
						<image iconName="media-seek-backward-symbolic" pixelSize={26}/>
					</button>
				</box>
				<box $type='center'>
					<button onClicked={()=>player.play_pause()}>
			<image iconName={
						createComputed(()=>isPlaying()===AstalMpris.PlaybackStatus.PLAYING
						? "media-playback-pause-symbolic"
						: "media-playback-start-symbolic"
					)}
				
			/>
					</button>
				</box>
				<box $type='end'>
					<button onClicked={()=>player.next()}>
						<image iconName="media-seek-forward-symbolic" pixelSize={26}/>
					</button>
				</box>
			</centerbox>
			</Adw.Clamp>
	)}
	else{
		return null
	}
}

export default Controls
