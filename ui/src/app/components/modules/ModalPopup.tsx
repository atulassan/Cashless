import React, {Fragment} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalPopup = (props:any) => {

	let { showModal, productDescription, productDesignation } = props;

	console.log("MOdal Popup Props", props);

	const handleClose = () => {
		props.handleClose(false);
	}

	return(
		<Fragment> 
			<Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productDesignation}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productDescription && productDescription }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>schließen</Button>
        </Modal.Footer>
      </Modal>
		</Fragment>
	)
}

export default ModalPopup

