import React from 'react'
import { Button, Modal, Icon, Container, Input } from 'semantic-ui-react'

class AdvanceModal extends React.Component {
	state={
		advanceQty: 1
	}

	changeQty = (increment) => {
		this.setState({
			advanceQty: this.state.advanceQty + increment
		})
	}
	
	render(){
		const advanceQty = this.state.advanceQty

		return(
			<Modal
			    open={ this.props.showModal }
			    onClose={ this.props.closeModal }
			    closeOnDimmerClick
			    closeOnEscape
			    closeIcon
			    size="small"
		    >
				<Modal.Header>
					<Container textAlign="center">
						Advance Expiration Date By:
					</Container>
				</Modal.Header>
			    <Modal.Content>
			    	<Modal.Description style={{width: "100%"}}>
			    		<Container textAlign="center">
				    		<Button size="huge" attached="left" icon="minus" onClick={ () => this.changeQty(-1) }/>
					    		<Input size="huge" type="number" value={ advanceQty } style={{ width: "100px"}}/>
				    		<Button size="huge" attached="right" icon="plus" onClick={ () => this.changeQty(1) }/>
			    		</Container>
			    		<Container textAlign="center">
					      <Button
					      size="huge"
					      	alt="day"
					      	onClick={ () => this.props.advanceDate(advanceQty,"day") }
					      >
					        Day
					      </Button>
					      <Button
					      size="huge"
					      	alt="week"
					      	onClick={ () => this.props.advanceDate(advanceQty,"week") }
					      >
					        Week
					      </Button>
					      <Button 
					        size="huge"
					      	alt="month"
					      	onClick={ () => this.props.advanceDate(advanceQty,"month") }
					      >
					        Month
					      </Button>
					    </Container>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		)
	}
}

export default AdvanceModal