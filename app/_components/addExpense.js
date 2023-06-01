"use client";
import { Modal, Form, FormGroup, Button } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAddition } from "../_utils/store/expenses";
import { updateOneExpense } from "../_utils/store/users";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [sum, setSum] = useState(0);
  const [expense, setExpense] = useState("");
  const [customInputSum, setCustomInputSum] = useState(0);
  const [showCustom, setShowCustom] = useState(false);

  const handleSelection = (selection) => {
    setSelected(selection);
  };

  const onAddCustom = () => {
    setShowCustom(true);
  };
  const onSaveClick = () => {};

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header>
        <Modal.Title>הוספת הוצאה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownMenu menuOptions={props.expenses} selected={handleSelection} />
      {  <div className="mt-3">
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>סכום</Form.Label>
            <Form.Control
              type="text"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </FormGroup>
          <div className="d-flex justify-content-center">
            <Button className="mt-3">הוספת הוצאה לא מהרשימה </Button>
          </div>
          <div>
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>שם הוצאה</Form.Label>
            <Form.Control
              type="text"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>סכום</Form.Label>
            <Form.Control
              type="text"
              value={customInputSum}
              onChange={(e) => setCustomInputSum(e.target.value)}
            />
          </FormGroup>
          </div>}

      
          <div className="mt-3 d-flex justify-content-center">
            <Button className="me-3">שמור</Button>
            <Button onClick={props.onClose}>סגור</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpense;
