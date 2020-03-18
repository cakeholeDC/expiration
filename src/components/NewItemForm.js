import React from 'react'
import { Form, Button, Modal } from 'semantic-ui-react'

const CATEGORY_URL = "http://localhost:3000/categories/"
const LOCATIONS_URL = "http://localhost:3000/locations/"


class NewItemForm extends React.Component {
	state={
		categories: null,
		locations: null,
		item: null,
		qty: null,
		purchased: null,
		expiration: null,
		notes: null,
		location: null,
		category: null
	}

	componentDidMount(){
		const moment = require('moment')

		fetch(`${CATEGORY_URL}`)
			.then(res => res.json())
			.then(catData => this.setState({
				categories: catData,
				purchased: moment().format("YYYY-MM-DD"),
				expiration: moment().add(1, 'month').format("YYYY-MM-DD")
			}))

		fetch(`${LOCATIONS_URL}`)
			.then(res => res.json())
			.then(locData => this.setState({
				locations: locData
			}))
	}

	handleNewItemFormChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleNewItemFormSubmit(event){
		const moment = require('moment')
		event.preventDefault()

		const formData = {
			name: this.state.item ? this.state.item : this.props.search,
			qty: this.state.qty,
			purchased: moment(this.state.purchased).format(),
			expiration: moment(this.state.expiration).format(),
			notes: this.state.notes,
			location_id: this.state.location,
			category_id: this.state.category
		}

		// debugger
		this.props.handleItemPost(formData)
		this.props.closeModal()
	}

	render(){
		const moment = require('moment')
		const categoryOptions = this.state.categories ? this.state.categories.map(category => <option key={category.name} name={category.name} value={category.id} >{category.name}</option>).sort((a, b) => a.value > b.value ? 1 : -1) : null
		const locationOptions = this.state.locations ? this.state.locations.map(location => <option key={location.name} name={location.name} value={location.id} >{location.name}</option>).sort((a, b) => a.value > b.value ? 1 : -1) : null
		
		return(
			<Modal
			    open={ this.props.status }
			    onClose={ this.props.close }
			    closeOnDimmerClick
			    closeOnEscape
			    closeIcon
		    >
				<Modal.Header>Add an Item</Modal.Header>
			    <Modal.Content>
			    	<Modal.Description style={{width: "100%"}}>
						<Form 
					    	onChange={(event) => this.handleNewItemFormChange(event)}
					    	onSubmit={ event => this.handleNewItemFormSubmit(event) }
				    	>
				    		<Form.Group widths="equal">
					    		<Form.Input 
					    			type="text"
					    			name="item" 
					    			label="Item"
					    			value={this.props.search} 
					    			placeholder="Bagels"/>
					    		<Form.Input 
					    			type="text" 
					    			name="qty"
					    			label='Quantity (ex. "3oz" or "1 jar")'
					    			placeholder="1 package"/>
				    		</Form.Group>
				    		<div className="field">
					    		<label>Category</label>
					    		<select className="ui fluid selection dropdown" name="category" placeholder="Select a Category...">
					    			<option value="" default disabled selected>Select a Category...</option>
					    			{ categoryOptions }
					    		</select>
				    		</div>
				    		<div className="field">
					    		<label>Location</label>
					    		<select className="ui fluid selection dropdown" name="location" placeholder="Select a Category...">
					    			<option value="" default disabled selected>Select a Location...</option>
					    			{ locationOptions }
					    		</select>
				    		</div>
				    		<Form.Group widths="equal">
					    		<Form.Input 
					    			type="date" 
					    			name="purchased" 
					    			label="Purchased On"
					    			value={ this.state.purchased }/>
					    		<Form.Input 
					    			type="date" 
					    			name="expiration" 
					    			label="Expiration"
					    			value={ this.state.expiration }/>
					    	</Form.Group>
				    		<Form.TextArea 
				    			type="text" 
				    			name="notes" 
				    			label="Notes:" 
				    			placeholder="Planning to use for Short Rib Chili on MM/DD/YYYY"/>
				    		<Button floated="right" type='submit'>Add Item</Button>
				    	</Form>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
}

export default NewItemForm