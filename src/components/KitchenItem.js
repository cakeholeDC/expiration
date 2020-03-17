import React from 'react'
import { Button, Image, List, Icon, Table } from 'semantic-ui-react'

class KitchenItem extends React.Component {
	render(){
		console.log(this.props.item)
		return(
			<List.Item>
		      <List.Content floated='right'>
		        <Button>Edit</Button>
		      </List.Content>
		      <Image floated="left" avatar src='https://cdn2.iconfinder.com/data/icons/travel-181/64/17-travel-512.png' />
		      <List.Content>
		      	<Table basic='very'>
				    <Table.Body>
				      <Table.Row>
					    <Table.Cell>{this.props.item.category_id}</Table.Cell>
				        <Table.Cell>{this.props.item.name}</Table.Cell>
					    <Table.Cell>x{this.props.item.qty}</Table.Cell>
				        <Table.Cell>Expires: {this.props.item.expiration}</Table.Cell>
				        <Table.Cell>Purchased: {this.props.item.purchased}</Table.Cell>
				      </Table.Row>
				    </Table.Body>

				    {/*<Table.Body>
				      <Table.Row>
				        <Table.Cell>John</Table.Cell>
				        <Table.Cell>Approved</Table.Cell>
				        <Table.Cell>None</Table.Cell>
				      </Table.Row>
				    </Table.Body> */}
				  </Table>
		      </List.Content>
		    </List.Item>
			)
	}
}

export default KitchenItem