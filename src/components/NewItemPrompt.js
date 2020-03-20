import React from 'react'
import ItemFormModal from '../components/ItemFormModal.js'
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
		this.toggleNewItemModal()
		event.target.reset()
	}

	toggleNewItemModal = () => {
		this.setState({
			showNewItemForm: !this.state.showNewItemForm
		})
	}

	render(){
		const newItemName = this.state.search
		const showNewItemModal = this.state.showNewItemForm
		return(
			<React.Fragment>
				<Form 
					onChange={(event) => this.handleNewItemPromptChange(event)}
					onSubmit={(event) => this.handleNewItemPromptAction(event)}
				>
					<Input name="search" icon='search' placeholder='Add an item...' />
				</Form>
				<ItemFormModal
					search={ newItemName }
					showModal={ showNewItemModal }
					closeModal={ this.toggleNewItemModal }
					submitForm={ this.props.createItem }
				/>
			</React.Fragment>
		)
	}
}

export default NewItemPrompt