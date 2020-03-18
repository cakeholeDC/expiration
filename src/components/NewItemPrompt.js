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

	handleNewItemPromptAction(event){
		event.preventDefault()
		this.toggleNewItemFormModal()
		event.target.reset()
	}

	toggleNewItemFormModal = () => {
		this.setState({
			showNewItemForm: !this.state.showNewItemForm
		})
	}

	render(){
		return(
			<React.Fragment>
				<Form 
					onChange={(event) => this.handleNewItemPromptChange(event)}
					onSubmit={(event) => this.handleNewItemPromptAction(event)}
				>
					<Input name="search" icon='search' placeholder='Add an item...' />
				</Form>
				<NewItemForm
					search={this.state.search}
					status={this.state.showNewItemForm}
					handleItemPost={this.props.handleItemPost}
					closeModal={this.toggleNewItemFormModal}
				/>
			</React.Fragment>
		)
	}
}

export default NewItemPrompt