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
			<Adw.Clamp class={"minHeight"} maximumSize={15} orientation={1}>
		
			<centerbox class={"minHeight"} width-request={87} height-request={15} class={'controlsHolder'}>
				<box $type='start' class={"minHeight"}>
					<button class={"minHeight"} onClicked={()=>player.previous()}>
						<image iconName="media-seek-backward-symbolic" pixelSize={15}/>
					</button>
				</box>
				<box class={"minHeight"} $type='center'>
					<button class={"minHeight"} onClicked={()=>player.play_pause()}>
			<image pixelSize={15} iconName={
						createComputed(()=>isPlaying()===AstalMpris.PlaybackStatus.PLAYING
						? "media-playback-pause-symbolic"
						: "media-playback-start-symbolic"
					)}
				
			/>
					</button>
				</box>
				<box $type='end' class={"minHeight"}>
					<button class={"minHeight"} onClicked={()=>player.next()}>
						<image iconName="media-seek-forward-symbolic" pixelSize={15}/>
					</button>
				</box>
			</centerbox>
			
			</Adw.Clamp>
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
