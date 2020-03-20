import React from 'react'
import KitchenItem from '../components/KitchenItem.js'
import { List } from 'semantic-ui-react'

function ItemContainer(props) {
	console.log("ItemContainer", props.items)
	return(
		<List celled verticalAlign='middle' size="massive">
			{ props.items.map(item =>
					<KitchenItem 
						item={item}
						key={item.name + item.id}
						updateItem={ props.updateItem }
						deleteItem={ props.deleteItem }
					/>
				)
			}
		</List>
	)
}

export default ItemContainer