import { createBinding, createComputed, For, createState } from 'ags'
import AstalHyprland from "gi://AstalHyprland"

const hyprland = AstalHyprland.Hyprland.get_default()
const workspacesBinding = createBinding(hyprland, 'workspaces')
const activeWorkspaceBinding = createBinding(hyprland, 'focused_workspace')

const activeWorkspaceId = createComputed(() => {
	const focusedWs = activeWorkspaceBinding()
	
	return focusedWs.id
})

const reversedWorkspaces = createComputed(() => {
    	const wss = workspacesBinding();

    	return [...wss].sort(function (a,b){
		return a.id-b.id
    	}).filter(ws => ws.id>0)
})  //unholy stuff



export default function Workspaces() {
    return (
        <box class="workspaces">
           <For each={reversedWorkspaces}>
	   	{
		(ws) => {
			const buttonClass = createComputed(()=>{
			const isActive = ws.id === activeWorkspaceId()
			return `workspace ${isActive? 'active' : ''}` //parry ts
			})


			reversedWorkspaces().map((val)=>console.log(val.id))
			return(
			<button class={buttonClass} onClicked={()=>ws.focus()}>
			<label label={`${ws.id}`} />
			</button>
			)
		}
		}
	   </For>
        </box>
    );
}
