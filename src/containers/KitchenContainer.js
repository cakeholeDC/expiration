import React from 'react'
import ItemContainer from './ItemContainer.js'
import NewItemPrompt from '../components/NewItemPrompt.js'


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
					<NewItemPrompt />
					<ItemContainer items={this.state.kitchen.stocked_items} />
				</React.Fragment>
			: null
		)
	}
}

export default KitchenContainer