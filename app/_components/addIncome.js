"use client";
import { Modal, Form, FormGroup, Button } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";

const AddIncome = (props) => {
  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>הוספת הכנסה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownMenu menuOptions={props.incomes} />
        <div className="mt-3">
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>שם הכנסה</Form.Label>
            <Form.Control
              type="text"
              //   value={expense}
              //   onChange={(e) => setExpense(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>סכום</Form.Label>
            <Form.Control
              type="text"
              //   value={customInputSum}
              //   onChange={(e) => setCustomInputSum(e.target.value)}
            />
          </FormGroup>
          <div className="mt-3 d-flex justify-content-center">
            <Button className="me-3">שמור</Button>
            <Button onClick={props.onClose}>סגור</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddIncome;
