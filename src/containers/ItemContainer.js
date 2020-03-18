import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'

function ItemContainer(props) {
	return(
		<List celled verticalAlign='middle' size="massive">
			{ props.items.map(item => <KitchenItem item={item} key={item.name} patchItem={ props.handleItemPatch } deleteItem={ props.handleItemDelete} />) }
		</List>
	)
}

export default ItemContainer