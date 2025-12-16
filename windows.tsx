import app from "ags/gtk4/app"
import Bar from './widget/Bar'
import { createBinding, For, This, onCleanup } from "ags"

export function windows(){

	const monitors = createBinding(app, 'monitors')

	return(
		<For each={monitors}>
		{(monitor)=>{
			return(
			<This this={app}>
			<Bar
			gdkmonitor={monitor}
			$={(self)=>onCleanup(()=>self.destroy())}
			/>
			</This>
			)
		}}
	</For>)
}
