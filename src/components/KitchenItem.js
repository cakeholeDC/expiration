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
		const imageExists = require('image-exists');
		let icon = item.name.replace(/ /g,"-").toLowerCase()

		//specific overrides
		switch(icon){
			case "guacamole": 
				icon = "avocado"
				break;
			case "mozzarella": 
				icon = "cheese-1"
				break;
			case "swiss-cheese": 
				icon = "cheese-1"
				break;
		}

		// keywords
		if (icon.indexOf("sausage") !== -1) { icon = 'sausage' }
		if (icon.indexOf("keilbasa") !== -1) { icon = 'sausage' }
		if (icon.indexOf("salami") !== -1) { icon = 'salami' }
		if (icon.indexOf("pepper") !== -1) { icon = 'pepper' }
		if (icon.indexOf("cookie") !== -1) { icon = 'cookies' }
		if (icon.indexOf("orange") !== -1) { icon = 'orange' } //to catch orange juice and plural oranges
		if (icon.indexOf("carrot") !== -1) { icon = 'carrot' }
		if (icon.indexOf("banana") !== -1) { icon = 'banana' }
		if (icon.indexOf("lettuce") !== -1) { icon = 'lettuce' }
		if (icon.indexOf("mushroom") !== -1) { icon = 'mushrooms' }
		if (icon.indexOf("bread") !== -1) { icon = 'bread-1' }
		if (icon.indexOf("tortilla") !== -1) { icon = 'bread-1' }
		if (icon.indexOf("hamburger") !== -1) { icon = 'hamburger' }
		if (icon.indexOf("hot dog") !== -1) { icon = 'hot-dog' }
		if (icon.indexOf("hot-dog") !== -1) { icon = 'hot-dog' }
		if (icon.indexOf("hotdog") !== -1) { icon = 'hot-dog' }
		if (icon.indexOf("milk") !== -1) { icon = 'milk' }
		if (icon.indexOf("beer") !== -1) { icon = 'pint' }
		if (icon.indexOf("salmon") !== -1) { icon = 'fish' }
		if (icon.indexOf("cod") !== -1) { icon = 'fish' }
		if (icon.indexOf("fish") !== -1) { icon = 'fish' }
		if (icon.indexOf("salad") !== -1) { icon = 'salad' }

		// pizza vs pizza crust vs pizza dough
		if (icon.indexOf("pizza") !== -1) { 
			if (icon.indexOf("crust") !== -1){
				icon = 'pizza-1'
			} else if (icon.indexOf("dough") !== -1){
				icon = 'pizza-1'
			} else {
				icon = 'pizza' 
			}
		}

		// onion, but not red onion
		if (icon.indexOf("onion") !== -1) { 
			if (icon.indexOf("red") !== -1){
				icon = 'red-onion'
			} else {
				icon = 'onion' 
			}
		}

		var src = `/icons/gastro/${ icon }.png`;

		imageExists(src, function(exists) {
			// console.log(icon, exists, src)
		  if (!exists) {
		    switch(item.category.name.toLowerCase()){
				case "vegetable":
					src="/icons/gastro/cabbage.png"
					break;
				case "cheese":
					src="/icons/gastro/cheese.png"
					break;
				case "snack":
					src="/icons/gastro/chips.png"
					break;
				case "fruit":
					src="/icons/gastro/carrot.png"
					break;
				case "grain":
					src="/icons/gastro/grain.png"
					break;
				case "protein":
					src="/icons/gastro/meat-1.png"
					break;
				// case "dairy":
				// 	src="/icons/gastro/milk-1.png"
				// 	break;
				case "beverage":
					src="/icons/gastro/water-1.png"
					break;
				default:
				 	src ="/icons/gastro/groceries.png"
					break;
			}
		  }
		})
		
		return <img className="png-icon" src={ src }/>
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
		this.props.deleteItem(this.props.item)
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
		      { <div className="kichen-item-container">
					<div className="item-icon" floated='left'>
					    { /* this.getFontAwesomeIcon(item) */ }
					    { /* this.getIconPNG(item) */ }
					    { this.getItemIcon(item) }
					</div>
					<div className="item-qty">
						{ item.qty }
						&nbsp;|&nbsp;
					</div>
					<div className="item-name">
						{ item.name }
						{ item.note ? <p className="item-note">{ item.note }</p> : null }
					</div>
					<div className="item-expire">
						{ this.displayExpiration(item.expiration) }
					</div>
					<div className="item-actions">
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