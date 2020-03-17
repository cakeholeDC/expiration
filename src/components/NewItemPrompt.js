import React from 'react'

function NewItemPrompt(){
	return(
		<form>
			<input name="new-item" placeholder="Add an item" />
			<button type="submit">Add</button>
		</form>
	)
}

export default NewItemPrompt