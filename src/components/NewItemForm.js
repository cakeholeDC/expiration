import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const CATEGORY_URL = "http://localhost:3000/categories/"
const LOCATIONS_URL = "http://localhost:3000/locations/"


class NewItemForm extends React.Component {
	state={
		categories: null,
		locations: null
	}

	componentDidMount(){
		fetch(`${CATEGORY_URL}`)
			.then(res => res.json())
			.then(catData => this.setState({
				categories: catData
			}))

		fetch(`${LOCATIONS_URL}`)
			.then(res => res.json())
			.then(locData => this.setState({
				locations: locData
			}))
	}
	render(){
		const moment = require('moment')
		const categoryOptions = this.state.categories ? this.state.categories.map((cat) => ({ "key": cat, "text": cat, "value": cat }) ) : null
		const locationOptions = this.state.locations ? this.state.locations.map((location) => ({ "key": location, "text": location, "value": location }) ) : null
		
		return(
			<Form 
		    	onChange={ event => console.log(event) }
		    	onSubmit={ event => console.log(event) }
	    	>
	    		<Form.Group widths="equal">
		    		<Form.Input 
		    			type="text"
		    			name="item" 
		    			value={this.props.search} 
		    			placeholder="Bagels"/>
		    		<Form.Input 
		    			type="text" 
		    			name="qty"
		    			placeholder="1 package"/>
	    		</Form.Group>
	    		<Form.Select
		            fluid
		            label='Category'
		            options={ categoryOptions }
		            placeholder='Please Select'
		        />
		        <Form.Select
		            fluid
		            label='Location'
		            options={ locationOptions }
		            placeholder='Please Select'
		        />
	    		<Form.Group widths="equal">
		    		<Form.Input 
		    			type="date" 
		    			name="purchased" 
		    			label="Purchased On"
		    			value={ moment().format("YYYY-MM-DD") }/>
		    		<Form.Input 
		    			type="date" 
		    			name="expires" 
		    			label="Expiration"
		    			value={ moment().add(1, 'month').format("YYYY-MM-DD") }/>
		    	</Form.Group>
	    		<Form.TextArea 
	    			type="text" 
	    			name="notes" 
	    			label="Notes:" 
	    			placeholder="Planning to use for Short Rib Chili on MM/DD/YYYY"/>
	    		<Button floated="right" type='submit'>Schedule Trip</Button>
	    	</Form>
			)
	}
}

export default NewItemForm