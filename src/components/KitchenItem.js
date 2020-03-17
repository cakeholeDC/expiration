import React from 'react'
import { Button, Image, List, Icon, Table } from 'semantic-ui-react'

class KitchenItem extends React.Component {

	formatDate(input){
		const moment = require('moment');

		return moment(input).format("MMM DD, YYYY")
	}

	getFontAwesomeIcon(type){
		switch(type.toLowerCase()){
			case "vegetable":
				return <i class="fas fa-carrot"></i>
			case "fruit":
				return <i class="fas fa-apple-alt"></i>
			case "grain":
				return <i class="fas fa-bread-slice"></i>
			case "protein":
				return <i class="fas fa-fish"></i>
			case "dairy":
				return <i class="fas fa-cheese"></i>
			case "beverage":
				return <i class="fas fa-beer"></i>
			default:
			 return <i class="fas fa-utensils"></i>
		}

	}

	render(){
		console.log(this.props.item)
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
		        <Button>Edit</Button>
		      </List.Content> */}
		      
		      { <List.Content>
		      	<Table basic='very' columns={5}>
				    <Table.Body>
				      <Table.Row>
				      	<Table.Cell width="one" textAlign='center'>{ this.getFontAwesomeIcon(this.props.item.category.name) }</Table.Cell>
					    <Table.Cell width="one" textAlign='right'>{this.props.item.qty}x</Table.Cell>
				        <Table.Cell textAlign='left'>{this.props.item.name}</Table.Cell>
				        <Table.Cell>Expires: {this.formatDate(this.props.item.expiration)}</Table.Cell>
				        <Table.Cell width="one"><Button>Edit</Button></Table.Cell>
				      </Table.Row>
				    </Table.Body>
				  </Table>
		      </List.Content> }
		    </List.Item>
			)
	}
}

export default KitchenItem