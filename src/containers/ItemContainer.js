import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'


class ItemContainer extends React.Component {
	state={
		categories: [],
		filter: ''
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
		document.getElementById('stocked-item-filter').value = ''
	}

	categoryFilter = () => {
		if (this.state.filter) {
			return this.props.items.filter(item => item.category.name === this.state.filter)
		} else {
			return this.props.items
		}
	}

	filteredItems = () => {
		return this.categoryFilter()
	}

	render(){
		return(
			<div id="item-container">
				<div id="item-filter-container">
					{ /* LOCATION FILTERING */ }
					<div className='location-filters'>
					{ 
						this.props.locations.map(loc => <label className="loc-filter"><input type="checkbox" name={ loc.name } value={ loc.name }/>{ loc.name }</label> ) 
					}
					</div>
					{ /* CATEGORY FILTERING */ }
					<div>
						<label>Filter By Type:</label>
						<select className="ui dropdown" id="stocked-item-select" defaultValue = { this.state.filter } onChange={ event => this.updateFilter(event) }>
							<option value='' >All</option>
							{ /* add options for categories */ }
							{ /*this.props.categories.map(cat => <option value={ cat.name } key={ cat.name }>{ cat.name }</option>) */}
						</select>
						{ this.state.filter ? <button onClick={ this.clearFilter }>Clear Filter</button> : null}
					</div>
				</div>
				<div id="item-list-container">
					<List className="item-list" celled verticalAlign='middle' size="massive">
						{ this.filteredItems().map(item =>
								<KitchenItem 
									item={ item }
									key={ item.name + item.id }
									updateItem={ this.props.updateItem }
									deleteItem={ this.props.deleteItem }
								/>
							)
						}
					</List>
				</div>
			</div>
		)
	}
}

export default ItemContainer