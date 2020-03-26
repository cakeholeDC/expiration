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
			console.error("item not found")
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

	getIconPNG(item) {
		switch(item.category.name.toLowerCase()){
			case "vegetable":
				return <img className="png-icon" src="/icons/gastro/salad.png" alt="vegetable"/>
			case "fruit":
				return <img className="png-icon" src="/icons/gastro/carrot.png" alt="fruit"/>
			case "grain":
				return <img className="png-icon" src="/icons/gastro/grain.png" alt="grain"/>
			case "protein":
				return <img className="png-icon" src="/icons/gastro/meat-1.png" alt="protein"/>
			case "dairy":
				return <img className="png-icon" src="/icons/gastro/milk-1.png" alt="dairy"/>
			case "beverage":
				return <img className="png-icon" src="/icons/gastro/pint.png" alt="beverage"/>
			default:
			 return <img className="png-icon" src="/icons/gastro/cutlery.png" alt="fork"/>
		}
	}

	getItemIcon = (item) => {
		console.log(item)
		const imageExists = require('image-exists');
		const icon = item.name.replace(' ','-').toLowerCase()
		const src = `/icons/gastro/${ icon }.png`;
		
		return imageExists(src, function(exists) {
			console.log(icon, exists, src)
		  if (exists) {
		    return <img className="png-icon" src={ src } alt={ icon }/>
		  }
		  else {
		  	// debugger
		    //return <img className="png-icon" src="/icons/gastro/cutlery.png" alt="fork"/>
		    switch(item.category.name.toLowerCase()){
				case "vegetable":
					return <img className="png-icon" src="/icons/gastro/salad.png" alt="vegetable"/>
				case "fruit":
					return <img className="png-icon" src="/icons/gastro/carrot.png" alt="fruit"/>
				case "grain":
					return <img className="png-icon" src="/icons/gastro/grain.png" alt="grain"/>
				case "protein":
					return <img className="png-icon" src="/icons/gastro/meat-1.png" alt="protein"/>
				case "dairy":
					return <img className="png-icon" src="/icons/gastro/milk-1.png" alt="dairy"/>
				case "beverage":
					return <img className="png-icon" src="/icons/gastro/pint.png" alt="beverage"/>
				default:
				 return <img className="png-icon" src="/icons/gastro/cutlery.png" alt="fork"/>
			}
		  }
		});
	}

	displayExpiration(input){
		const moment = require('moment');
		const expiration = moment(input).format("MMM DD, YYYY")
		const timeUntil = moment(expiration).fromNow()
		const dateHasPassed = moment(expiration).isBefore(moment())
		const isToday = moment(expiration).isSame(moment().format("MMM DD, YYYY"))

		return (
			<div style={ isToday || dateHasPassed ? { color: "red" } : timeUntil.includes("hours") ? { color: "orange" } : null } >
				{ isToday ? "Expires Today" //expires today
						//account for return of "nn Hours"
						: timeUntil.includes("hours") ? "Expires Tomorrow"
						//account for expired items
						: dateHasPassed ? `Expired: ${timeUntil}` 
					// show expiration
					: `Expires ${timeUntil}` 
				} <br/>
				<small style={{ color: "red" }}>{ dateHasPassed || timeUntil.includes("hours") ? null : expiration }</small>
			</div>
		)
	}

	renderActionButtons(){
		return (
			<Button.Group size="huge">
		      <Button icon negative alt="Delete Item" onClick={ () => this.handleDelete() }>
		        <Icon name='trash alternate' alt="Delete Item"/>
		      </Button>
		      <Button icon alt="Edit Item" onClick={ () => this.toggleEditModal() }>
		        <Icon name='edit' alt="Edit Item"/>
		      </Button>
		      <Button icon positive onClick={ () => this.toggleAdvanceModal() } alt="Advance Date">
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
		      { <div class="kichen-item-container">
					<div class="item-icon" floated='left'>
					    { /*this.getFontAwesomeIcon(item)*/ }
					    { /* this.getIconPNG(item) */ }
					    { this.getItemIcon(item) }
					</div>
					<div class="item-qty">
						{ item.qty }
						&nbsp;|&nbsp;
					</div>
					<div class="item-name">
						{ item.name }
					</div>
					<div class="item-expire">
						{ this.displayExpiration(item.expiration) }
					</div>
					<div class="item-actions">
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
					</div>
		      </div> }
		      
		      { /*<List.Content>
		      	<Table basic='very' columns={5}>
				    <Table.Body>
				      <Table.Row>
				      	<Table.Cell width="one" textAlign='center'>{ this.getFontAwesomeIcon(item) }</Table.Cell>
					    <Table.Cell width="two" textAlign='right'>{item.qty}</Table.Cell>
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
		      </List.Content> */}
		    </List.Item>
			)
	}
}

export default KitchenItem