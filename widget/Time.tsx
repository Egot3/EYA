import { createPoll } from "ags/time"

const time = createPoll('', 1000, `bash -c 'date +%D" "%H:%M'`)

export default function Time(){
	return(
	<box>
		<label label={time} />
	</box>
	)
}
