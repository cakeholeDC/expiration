import React from 'react'
import ItemContainer from './ItemContainer.js'
import NewItemPrompt from '../components/NewItemPrompt.js'

const KITCHEN_URL = "http://localhost:3000/kitchens"
const ITEM_URL = "http://localhost:3000/items"

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

	handleItemPost = (item) => {
		const postObj = {
			...item
		}

		const newItemConfig = {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(postObj)
		}
		// this.sendItemToAPI(newItemConfig)
		
		fetch(ITEM_URL, newItemConfig)
			.then(res => res.json())
			.then(item => {
				console.log(item)
				debugger
				this.setState({
					kitchen: {
						...this.state.kitchen, 
						stocked_items: [...this.state.kitchen.stocked_items, item]
					}
				})
		})
	}

	handleItemPatch = (item) => {
		const updateObj = {
			expiration: item.expiration
		}

		const updateItemConfig = {
			method: "PATCH",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			},
			body: JSON.stringify(updateObj)
		}
		// this.sendItemToAPI(updateItemConfig, item.id)
		fetch(`${ITEM_URL}/${item.id}`, updateItemConfig)
			.then(res => res.json())
			.then(item => this.setState({
				kitchen: {
					...this.state.kitchen,
					stocked_items: [...this.state.kitchen.stocked_items.filter(oldItem => oldItem.id !== item.id), item ]
				}
			}))
	}

	handleItemDelete = (id) => {
		const deleteItemConfig = {
			method: "DELETE",
			headers: {
				'Content-Type': "application/json",
				"Accept" : "application/json"
			}
		}
		// this.sendItemToAPI(deleteItemConfig, id)
		fetch(`${ITEM_URL}/${id}`, deleteItemConfig)
			.then(res => res.json())
			.then(jsonData => this.setState({
				kitchen: {
					...this.state.kitchen,
					stocked_items: [...this.state.kitchen.stocked_items.filter(item => item.id !== id)]
				}
			})
			)
	}

	// sendItemToAPI(config, id=null){
	// 	fetch(`${ITEM_URL}/${id}`, config)
	// 		.then(res => res.json())
	// 		.then(kitchenData => this.setState({
	// 			kitchen: kitchenData
	// 		}))
	// }

	render(){
		const sortedItems = this.state.kitchen
			? [...this.state.kitchen.stocked_items.sort((a, b) => a.expiration > b.expiration ? 1 : -1)].sort((a,b) => a.name < b.name ? 1 : -1)
			: null

		return(
			this.state.kitchen ?
				<React.Fragment>
					<div>
						<h1>{this.state.kitchen.name}</h1>
						<h3>{this.state.kitchen.location}</h3>
					</div>
					<NewItemPrompt 
						handleItemPost={this.handleItemPost}/>
					<ItemContainer 
						items={ sortedItems }
						handleItemPatch={ this.handleItemPatch }
						handleItemDelete={ this.handleItemDelete }
					/>
				</React.Fragment>
			: null
		)
	}
}

export default KitchenContainer