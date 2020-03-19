import React from 'react'
import { Button, Modal, Icon, Container } from 'semantic-ui-react'

function AdvanceModal(props) {
	return(
		<Modal
		    open={ props.showModal }
		    onClose={ props.closeModal }
		    closeOnDimmerClick
		    closeOnEscape
		    closeIcon
		    size="small"
	    >
			<Modal.Header>Advance Date By...?</Modal.Header>
		    <Modal.Content>
		    	<Modal.Description style={{width: "100%"}}>
		    		<Container>
				      <Button
				      size="huge"
				      	alt="day"
				      	onClick={ () => props.advanceDate("day") }
				      >
				        <Icon name='plus' alt="day"/>1 Day
				      </Button>
				      <Button
				      size="huge"
				      	alt="week"
				      	onClick={ () => props.advanceDate("week") }
				      >
				        <Icon name='plus' alt="week"/>1 Week
				      </Button>
				      <Button 
				        size="huge"
				      	alt="month"
				      	onClick={ () => props.advanceDate("month") }
				      >
				        <Icon name='plus' alt="month"/>1 Month
				      </Button>
				    </Container>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	)
}

export default AdvanceModal