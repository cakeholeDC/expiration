import React from 'react'
import { Button, Image, List, Icon, Table } from 'semantic-ui-react'

const ITEM_URL = "http://localhost:3000/items/"

class KitchenItem extends React.Component {

	formatDate(input){
		const moment = require('moment');

		return moment(input).format("MMM DD, YYYY")
	}

	getFontAwesomeIcon(type){
		switch(type.toLowerCase()){
			case "vegetable":
				return <i class="fas fa-carrot" style={{fontSize: "1.5em"}}></i>
			case "fruit":
				return <i class="fas fa-apple-alt" style={{fontSize: "1.5em"}}></i>
			case "grain":
				return <i class="fas fa-bread-slice" style={{fontSize: "1.5em"}}></i>
			case "protein":
				return <i class="fas fa-fish" style={{fontSize: "1.5em"}}></i>
			case "dairy":
				return <i class="fas fa-cheese" style={{fontSize: "1.5em"}}></i>
			case "beverage":
				return <i class="fas fa-beer" style={{fontSize: "1.5em"}}></i>
			default:
			 return <i class="fas fa-utensils" style={{fontSize: "1.5em"}}></i>
		}

	}

	handleAdvanceDate(increment="day"){
		const moment = require('moment');
		const itemObject = {
			id: this.props.item.id,
			expiration: moment(this.props.item.expiration).add(1, increment).format()
		}

		this.props.patchItem(itemObject)
	}

	handleDelete(){
		this.props.deleteItem(this.props.item.id)
	}

	renderActionButtons(){
		return (
			<Button.Group size="huge">
		      <Button
		      	icon
		      	negative
		      	alt="Delete Item"
		      	onClick={ () => this.handleDelete() }
		      >
		        <Icon name='trash alternate' alt="Delete Item"/>
		      </Button>
		      <Button
		      	icon
		      	alt="Edit Item"
		      >
		        <Icon name='edit' alt="Edit Item"/>
		      </Button>
		      <Button 
		      	icon
		      	positive
		      	onClick={ () => this.handleAdvanceDate() }
		      	alt="Advance Date"
		      >
		        <Icon name='redo' alt="Advance Date"/>
		      </Button>
		    </Button.Group>
		)
	}

	render(){
		// console.log(this.props.item)
		return(
			<List.Item>
		      {/* <List.Content floated='left'>
			        { this.getFontAwesomeIcon(this.props.item.category.name) }
		      </List.Content>
		      <List.Content>
		      	<div>
			        { `${this.props.item.name} (x${this.props.item.qty})`}
		        </div>
		        <div>
			        Expires: {this.formatDate(this.props.item.expiration)}
		        </div>
		      </List.Content>
		      <List.Content floated='right'>
		        { this.renderActionButtons() }
		      </List.Content> */}
		      
		      { <List.Content>
		      	<Table basic='very' columns={5}>
				    <Table.Body>
				      <Table.Row>
				      	<Table.Cell width="one" textAlign='center'>{ this.getFontAwesomeIcon(this.props.item.category.name) }</Table.Cell>
					    <Table.Cell width="one" textAlign='right'>{this.props.item.qty}</Table.Cell>
				        <Table.Cell width="five" textAlign='left'>{this.props.item.name}</Table.Cell>
				        <Table.Cell width="five">Expires: {this.formatDate(this.props.item.expiration)}</Table.Cell>
				        <Table.Cell width="one">
				        	{ this.renderActionButtons() }
				        </Table.Cell>
				      </Table.Row>
				    </Table.Body>
				  </Table>
		      </List.Content> }
		    </List.Item>
			)
	}
}

export default KitchenItem