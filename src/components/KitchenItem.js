import React from 'react'
import { Button, Image, List, Icon, Table } from 'semantic-ui-react'
import ItemFormModal from '../components/EditItemForm.js'

const ITEM_URL = "http://localhost:3000/items/"

class KitchenItem extends React.Component {
	state={
		showEditModal: false
	}

	formatDate(input){
		const moment = require('moment');

		return moment(input).format("MMM DD, YYYY")
	}

	getFontAwesomeIcon(type){
		switch(type.toLowerCase()){
			case "vegetable":
				return <i className="fas fa-carrot" style={{fontSize: "1.5em"}}></i>
			case "fruit":
				return <i className="fas fa-apple-alt" style={{fontSize: "1.5em"}}></i>
			case "grain":
				return <i className="fas fa-bread-slice" style={{fontSize: "1.5em"}}></i>
			case "protein":
				return <i className="fas fa-fish" style={{fontSize: "1.5em"}}></i>
			case "dairy":
				return <i className="fas fa-cheese" style={{fontSize: "1.5em"}}></i>
			case "beverage":
				return <i className="fas fa-beer" style={{fontSize: "1.5em"}}></i>
			default:
			 return <i className="fas fa-utensils" style={{fontSize: "1.5em"}}></i>
		}

	}

	handleAdvanceDate(increment="day"){
		const moment = require('moment');
		const itemObject = {
			id: this.props.item.id,
			expiration: moment(this.props.item.expiration).add(1, increment).format()
		}

		this.props.updateItem(itemObject)
	}

	handleDelete(){
		this.props.deleteItem(this.props.item.id)
	}

	toggleEditModal = () => {
		this.setState({
			showEditModal: !this.state.showEditModal
		})
	}

	closeEditModal = () => {
		this.toggleEditModal()
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
		      	onClick={ () => this.toggleEditModal() }
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
		const item = this.props.item 
		const showEditModal = this.state.showEditModal //boolean

		return(
			<List.Item>
		      {/* <List.Content floated='left'>
			        { this.getFontAwesomeIcon(item.category.name) }
		      </List.Content>
		      <List.Content>
		      	<div>
			        { `${item.name} (x${item.qty})`}
		        </div>
		        <div>
			        Expires: {this.formatDate(item.expiration)}
		        </div>
		      </List.Content>
		      <List.Content floated='right'>
		        { this.renderActionButtons() }
		      </List.Content> */}
		      
		      { <List.Content>
		      	<Table basic='very' columns={5}>
				    <Table.Body>
				      <Table.Row>
				      	<Table.Cell width="one" textAlign='center'>{ this.getFontAwesomeIcon(item.category.name) }</Table.Cell>
					    <Table.Cell width="one" textAlign='right'>{item.qty}</Table.Cell>
				        <Table.Cell width="five" textAlign='left'>{item.name}</Table.Cell>
				        <Table.Cell width="five">Expires: {this.formatDate(item.expiration)}</Table.Cell>
				        <Table.Cell width="one">
				        	{ this.renderActionButtons() }
				        </Table.Cell>
				      </Table.Row>
				    </Table.Body>
				  </Table>
				  <ItemFormModal
					prefillData={ item }
					showModal={ showEditModal }
					closeModal={ this.closeEditModal }
					handleFormSubmit={ () => console.log("form submit")}
				/>
		      </List.Content> }
		    </List.Item>
			)
	}
}

export default KitchenItem