import React from 'react'
import ItemContainer from './ItemContainer.js'
import NewItemPrompt from '../components/NewItemPrompt.js'

const KITCHEN_URL = "http://localhost:3000/kitchens"
const ITEM_URL = "http://localhost:3000/items"
const CATEGORY_URL = "http://localhost:3000/categories"
const LOCATION_URL = "http://localhost:3000/locations"

class KitchenContainer extends React.Component {
	state={
		kitchen: null,
		categories: [],
		locations: []
	}

	componentDidMount(){
		fetch(`${KITCHEN_URL}/${this.props.id}`)
			.then(res => res.json())
			.then(kitchenData => this.setState({
				kitchen: kitchenData
			}))

		fetch(CATEGORY_URL)
			.then(res => res.json())
			.then(cats => this.setState({ categories: cats }))

		fetch(LOCATION_URL)
			.then(res => res.json())
			.then(locs => this.setState({ locations: locs }))
	}

	createNewItem = (item) => {
		const postObj = {
			...item
		}

		const postConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(postObj)
		}
		
		fetch(ITEM_URL, postConfig)
			.then(res => res.json())
			.then(item => {
				console.log(item)
				this.setState({
					kitchen: {
						...this.state.kitchen, 
						stocked_items: [...this.state.kitchen.stocked_items, item]
					}
				})
		})
	}

	updateItem = (item) => {

		const patchConfig = {
			method: "PATCH",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(item)
		}
		
		fetch(`${ITEM_URL}/${item.id}`, patchConfig)
			.then(res => res.json())
			.then(item => {
				this.setState({
					kitchen: {
						...this.state.kitchen,
						stocked_items: [...this.state.kitchen.stocked_items.filter(oldItem => oldItem.id !== item.id), item ]
					}
				})
		})
	}

	deleteItem = (item) => {
		const confirmDelete = window.confirm(`Are you sure you want to delete ${item.qty + ' ' + item.name}?\n\nThis cannot be undone.`)

		if (confirmDelete){
			const deleteConfig = {
				method: "DELETE",
				headers: {
					'Content-Type': "application/json",
					"Accept" : "application/json"
				}
			}
			fetch(`${ITEM_URL}/${item.id}`, deleteConfig)
				.then(res => res.json())
				.then(jsonData => this.setState({
					kitchen: {
						...this.state.kitchen,
						stocked_items: [...this.state.kitchen.stocked_items.filter(i => i.id !== item.id)]
					}
				})
				)
		}
	}

	sortStockedItems(items=[]){
		return [...items].sort((a, b) => {
			//sort by expiration
			if (a.expiration > b.expiration) return 1;
			if (a.expiration < b.expiration) return -1;
			//then by name
			if (a.name > b.name) return 1;
			if (a.name < b.name) return -1;
		})
	}

	render(){
		const sortedItems = this.state.kitchen ? this.sortStockedItems(this.state.kitchen.stocked_items) : []

		return(
			this.state.kitchen ?
				<React.Fragment>
					<div id="kitchen-details">
						<h1 className="kitchen-name">{this.state.kitchen.name} - {this.state.kitchen.stocked_items.length} Items</h1>
						<h3 className="kitchen-address">{this.state.kitchen.location}</h3>
					</div>
					<div>
						<NewItemPrompt createItem={this.createNewItem}/>
					</div>
					<ItemContainer
						items={ sortedItems }
						updateItem={ this.updateItem }
						deleteItem={ this.deleteItem }
						categories={ this.state.categories }
						locations={ this.state.locations }
					/>
				</React.Fragment>
			: null
		)
	}
}

export default KitchenContainer