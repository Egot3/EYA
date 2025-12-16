import AstalMpris from "gi://AstalMpris"
import Adw from "gi://Adw"
import { Gtk } from "ags/gtk4"
import { createEffect, createComputed, createBinding, With } from "ags"
import { currentPlayer } from "./Variables.tsx"
import logger from "../../utils/logger"

const Controls = () => {	

	return(
		<With value={currentPlayer}>
		{(player) => {
			logger(`With in Controls.tsx: ${player?.identity || 'Not found'}`)
			if(player){
				const playerPlaybackStatusBinding = createBinding(player, 'playbackStatus')
				const isPlaying = createComputed(()=>{
					const status = playerPlaybackStatusBinding()
					return status
				})

		return(
		<box
		overflow={Gtk.Overflow.HIDDEN} 
			>
			<centerbox width-request={87} class={'controlsHolder'}>
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
			</box>
		)}
		else{
			return(
				<box>
					<label label="No controls availible!"/>
				</box>
			)
		}
		}}</With>
	)
}

export default Controls
