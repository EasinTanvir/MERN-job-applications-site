import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Modals = ({ btn1, desc, title, show, handleClose, approveUser }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="btn btn-dark">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{desc}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => approveUser()} variant="secondary">
            {btn1}
          </Button>
          <Button onClick={handleClose} variant="primary">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modals;
