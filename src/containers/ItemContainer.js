import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'

const CATEGORY_URL = "http://localhost:3000/categories/"

class ItemContainer extends React.Component {
	state={
		categories: [],
		filter: null
	}

	componentDidMount(){
		fetch(CATEGORY_URL)
			.then(res => res.json())
			.then(cats => this.setState({ categories: cats }))
	}

	updateFilter(event){
		this.setState({
			filter: event.target.value
		})
	}

	clearFilter = () => {
		this.setState({
			filter: null
		})
		document.getElementById('stocked-item-filter').value = null
	}

	filteredItems = () => {
		if (this.state.filter) {
			return this.props.items.filter(item => item.category.name === this.state.filter)
		} else {
			return this.props.items
		}
	}

	render(){
		console.log("ItemContainer", this.props.items)

		return(
			<React.Fragment>
				<div>
					<select id="stocked-item-filter" defaultValue = { this.state.filter } onChange={event => this.updateFilter(event)}>
						<option value='' disabled>Filter By Type:</option>
						{ this.state.categories.map(cat => <option value={cat.name} key={cat.name}>{cat.name}</option>) }
					</select>
					{ this.state.filter ? <button onClick={ this.clearFilter }>Clear Filter</button> : null}
				</div>
				<List celled verticalAlign='middle' size="massive">
					{ this.filteredItems().map(item =>
							<KitchenItem 
								item={item}
								key={item.name + item.id}
								updateItem={ this.props.updateItem }
								deleteItem={ this.props.deleteItem }
							/>
						)
					}
				</List>
			</React.Fragment>
		)
	}
}

export default ItemContainer