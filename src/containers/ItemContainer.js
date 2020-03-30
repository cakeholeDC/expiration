import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List, Button } from 'semantic-ui-react'


class ItemContainer extends React.Component {
	state={
		categoryFilter: '',
		locationFilter: []
	}

	updateCategoryFilter(event){
		this.setState({
			categoryFilter: event.target.value
		})
	}

	updateLocationFilter(event){
		// debugger
		if (this.state.locationFilter.includes(event.target.value)){
			this.setState({
				locationFilter: [...this.state.locationFilter.filter(value => value !== event.target.value)]
			})
			console.log('locationFilter', [...this.state.locationFilter.filter(value => value !== event.target.value)])
		} else {
			this.setState({
				locationFilter: [...this.state.locationFilter, event.target.value]
			})
			console.log('locationFilter', [...this.state.locationFilter, event.target.value])
		}
	}

	clearFilter = () => {
		this.setState({
			categoryFilter: ''
		})
		document.getElementById('stocked-item-select').value = ''
	}

	categoryFilter = () => {
		if (this.state.categoryFilter) {
			return this.props.items.filter(item => item.category.name === this.state.categoryFilter)
		} else {
			return this.props.items
		}
	}

	filteredItems = () => {
		// return this.categoryFilter()
		if (this.state.locationFilter < 1){
			return this.categoryFilter()
		}
		else {
			return this.categoryFilter().filter(item => this.state.locationFilter.includes(item.location.name))
		}

	}

	getNumResults(){
		return `Displaying ${this.filteredItems().length} ${this.filteredItems().length > 1 ? "Items" : "Item"}`
	}

	render(){
		return(
			<div id="item-container">
				<div id="item-filter-container">
					{ /* LOCATION FILTERING */ }
					<div className='location-filters inline-label-form'>
					<label>Locations:</label>
						<div className="location-boxes quarter">
							{ 
								this.props.locations.map(loc => <label className="loc-filter" key={ loc.name }><input type="checkbox" name={ loc.name } key={ loc.name } value={ loc.name } onChange={event => this.updateLocationFilter(event) }/>{ loc.name }</label> ) 
							}
						</div>
					</div>
					{ /* CATEGORY FILTERING */ }
					<div className='category-filters'>
						<label>Filter By Type:</label>
						<select className="ui dropdown" id="stocked-item-select" defaultValue = { this.state.categoryFilter } onChange={ event => this.updateCategoryFilter(event) }>
							<option value='' >All</option>
							{ /* add options for categories */ }
							{ this.props.categories.map(cat => <option value={ cat.name } key={ cat.name }>{ cat.name }</option>) }
						</select>
						{ this.state.categoryFilter ? <Button size="medium" onClick={ this.clearFilter }>Clear Filter</Button> : null}
					</div>
					<h4>{ this.getNumResults() }</h4>
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