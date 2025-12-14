import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import Time from './Time' 
import Workspaces from "./Workspace"
import Player from "./Player/Player"
import Controls from "./Player/Controls"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
	<box $type="start">
		<Workspaces/>
	</box>
        <menubutton $type="center" hexpand halign={Gtk.Align.CENTER}>
		<Player/>
		<popover>
			<Controls/>
		</popover>
	</menubutton>
        <menubutton $type="end" hexpand halign={Gtk.Align.END}>
          <Time /> 
          <popover>
            <Gtk.Calendar />
          </popover>
        </menubutton>
      </centerbox>
    </window>
  )
}
