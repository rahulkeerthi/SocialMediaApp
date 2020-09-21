import React from "react"

function FlashMessages(props) {
	return (
		<div className='floating-alerts'>
			{props.messages.map((msg, index) => {
				return (
					<div key={index} className={"alert text-center floating-alert shadow-sem " + (props.colour == "red" ? "alert-danger" : "alert-success")}>
						{msg}
					</div>
				)
			})}
		</div>
	)
}

export default FlashMessages
