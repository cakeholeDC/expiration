import React from 'react'
import { Button, List, Icon, Table } from 'semantic-ui-react'
import ItemFormModal from '../components/ItemFormModal.js'
import AdvanceModal from '../components/AdvanceModal.js'

class KitchenItem extends React.Component {
	state={
		showEditModal: false,
		showAdvanceModal: false
	}

	getFontAwesomeIcon(item){
		if (!item) {
			debugger
		} else {
			switch(item.category.name.toLowerCase()){
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

	}

	displayExpiration(input){
		const moment = require('moment');
		const expiration = moment(input).format("MMM DD, YYYY")
		const timeUntil = moment(expiration).fromNow()
		const dateHasPassed = moment(expiration).isBefore(moment())
		const isToday = moment(expiration).isSame(moment().format("MMM DD, YYYY"))

		return (
			<div style={ isToday || dateHasPassed ? { color: "red" } : timeUntil.includes("hours") ? { color: "orange" } : null } >
				{ 
					isToday ? "Expires Today"
						: timeUntil.includes("hours") ? "Expires Tomorrow"
						: dateHasPassed ? `Expired: ${timeUntil}` 
					: `Expires ${timeUntil}` 
				} <br/>
				<small style={{ color: "red" }}>{ dateHasPassed || timeUntil.includes("hours") ? null : expiration }</small>
			</div>
		)
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
		      	onClick={ () => this.toggleAdvanceModal() /*this.handleAdvanceDate()*/ }
		      	alt="Advance Date"
		      >
		        <Icon name='redo' alt="Advance Date"/>
		      </Button>
		    </Button.Group>
		)
	}

	toggleAdvanceModal = () => {
		this.setState({
			showAdvanceModal: !this.state.showAdvanceModal
		})
	}

	toggleEditModal = () => {
		this.setState({
			showEditModal: !this.state.showEditModal
		})
	}
	
	handleDelete(){
		this.props.deleteItem(this.props.item.id)
	}

	handleAdvanceDate = (num=1, increment="day") => {
		const moment = require('moment');
		const itemObject = {
			id: this.props.item.id,
			expiration: moment(this.props.item.expiration).add(num, increment).format()
		}

		this.props.updateItem(itemObject)
		this.toggleAdvanceModal()
	}

	render(){
		const item = this.props.item 
		const showEditModal = this.state.showEditModal //boolean
		const showAdvanceModal = this.state.showAdvanceModal //boolean

		return(
			<List.Item>
		      { /*<React.Fragment>
			      <List.Content floated='left'>
				        { this.getFontAwesomeIcon(item) }
			      </List.Content>
			      <List.Content>
			      	<div>
				        { `${item.name} (x${item.qty})`}
			        </div>
			        <div>
				        Expires: {this.displayExpiration(item.expiration)}
			        </div>
			      </List.Content>
			      <List.Content floated='right'>
			        { this.renderActionButtons() }
			        <AdvanceModal 
					  	showModal={ showAdvanceModal }
						closeModal={ this.toggleAdvanceModal }
						advanceDate={ this.handleAdvanceDate }
					  />
					  <ItemFormModal
						prefillData={ item }
						showModal={ showEditModal }
						closeModal={ this.toggleEditModal }
						submitForm={ this.props.updateItem }
					/>
			      </List.Content>
		      </React.Fragment> */}
		      
		      { <List.Content>
		      	<Table basic='very' columns={5}>
				    <Table.Body>
				      <Table.Row>
				      	<Table.Cell width="one" textAlign='center'>{ this.getFontAwesomeIcon(item) }</Table.Cell>
					    <Table.Cell width="one" textAlign='right'>{item.qty}</Table.Cell>
				        <Table.Cell width="five" textAlign='left'>{item.name}</Table.Cell>
				        <Table.Cell width="five">{this.displayExpiration(item.expiration)}</Table.Cell>
				        <Table.Cell width="one">
				        	{ this.renderActionButtons() }
				        </Table.Cell>
				      </Table.Row>
				    </Table.Body>
				  </Table>
				  <AdvanceModal 
				  	showModal={ showAdvanceModal }
					closeModal={ this.toggleAdvanceModal }
					advanceDate={ this.handleAdvanceDate }
				  />
				  <ItemFormModal
					prefillData={ item }
					showModal={ showEditModal }
					closeModal={ this.toggleEditModal }
					submitForm={ this.props.updateItem }
				/>
		      </List.Content> }
		    </List.Item>
			)
	}
}

export default KitchenItem