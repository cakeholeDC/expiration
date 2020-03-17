import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'


const KITCHEN_URL = "http://localhost:3000/kitchens/"

class ItemContainer extends React.Component {
	render(){
		return(
			<List celled verticalAlign='middle' size="massive">
				{ this.props.items.map(item => <KitchenItem item={item} key={item.name} />) }
			</List>
		)
	}
}

export default ItemContainer