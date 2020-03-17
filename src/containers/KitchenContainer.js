import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'


const KITCHEN_URL = "http://localhost:3000/kitchens/"

class KitchenContainer extends React.Component {
	state={
		kitchen: null
	}
	componentDidMount(){
		fetch(`${KITCHEN_URL}/${this.props.id}`)
			.then(res => res.json())
			.then(kitchenData => this.setState({
				kitchen: kitchenData
			}))
	}
	render(){
		return(
			this.state.kitchen ?
				<React.Fragment>
					<div>
						<h1>{this.state.kitchen.name}</h1>
						<h3>{this.state.kitchen.location}</h3>
					</div>
					<form>
						<input name="new-item" placeholder="Add an item" />
						<button type="submit">Add</button>
					</form>
					<List celled verticalAlign='middle' size="massive">
						{ this.state.kitchen.stocked_items.map(item => <KitchenItem item={item} key={item.name} />) }
					</List>
				</React.Fragment>
			: null
		)
	}
}

export default KitchenContainer