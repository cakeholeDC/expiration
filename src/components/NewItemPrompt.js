import React from 'react'
import NewItemForm from '../components/NewItemForm.js'
import { Form, Input } from 'semantic-ui-react'


class NewItemPrompt extends React.Component {
	state={
		showNewItemForm: false,
		search: null
	}

	handleNewItemPromptChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
		return(
			<React.Fragment>
				<Form 
					onChange={(event) => this.handleNewItemPromptChange(event)}
					onSubmit={() => console.log("clicked", this.state.search)}
				>
					<Input name="search" icon='search' placeholder='Add an item...' />
				</Form>
				{
					this.state.showNewItemForm 
						? <NewItemForm />
						: null
				}
			</React.Fragment>
		)
	}
}

export default NewItemPrompt