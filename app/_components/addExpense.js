"use client";
import { Modal, Form, FormGroup, Button, CloseButton } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAddition } from "../_utils/store/expenses";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [sum, setSum] = useState(0);
  const [expense, setExpense] = useState("");
  const [customInputSum, setCustomInputSum] = useState(0);
  const [showCustom, setShowCustom] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [inputs, setInputs] = useState({
    expenseName: "",
    category: "",
    sum: 0,
  });

  const [customInputs, setCustomInputs] = useState({
    expenseName: "",
    category: "",
    sum: 0,
  });

  const handleSelection = (selection) => {
    setSelected(selection);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeCustomInputs = (e) => {
    const { name, value } = e.target;
    setCustomInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onAddCustom = () => {
    setShowCustom(true);
    setShowExpenses(false);
  };

  const onCloseCustom = () => {
    setShowCustom(false);
    setShowExpenses(true);
  };
  const onSaveClick = () => {
    let balance = 0;
    if (showExpenses && props.user) {
      for (const item of props.user.expenses) {
        if (item.expenseName === selected) {
          balance = item.sum - sum;
        }
      }
      const obj = {
        expenseName: selected,
        newBalance: balance,
        email: props.user.email,
      };

      console.log(obj);
      // dispatch(updateOneExpense(obj));
    } else if (showCustom && props.user) {
      const obj = {
        expenseName: expense,
        sum: customInputSum,
      };
      console.log(obj);
      dispatch(expenseAddition(obj));
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className="justify-content-center">
        <Modal.Title>הוספת הוצאה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showExpenses && (
          <div>
            <FormGroup>
              <Form.Label>שם הוצאה</Form.Label>
              <Form.Control
                type="text"
                name="expenseName"
                value={inputs.expenseName}
                onChange={onChangeInputs}
              />
            </FormGroup>
            <p>קטגוריה</p>
            <DropdownMenu
              menuOptions={props.expenses}
              selected={handleSelection}
            />

            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                name="sum"
                type="text"
                value={inputs.sum}
                onChange={onChangeInputs}
              />
            </FormGroup>
            <div className="d-flex justify-content-center">
              <Button className="mt-3" onClick={onAddCustom}>
                הוספת הוצאה לא מהרשימה{" "}
              </Button>
            </div>
          </div>
        )}

        {showCustom && (
          <div>
            <div className="d-flex justify-content-end">
              <CloseButton onClick={onCloseCustom} />
            </div>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>שם הוצאה</Form.Label>
              <Form.Control
                name="expenseName"
                type="text"
                value={customInputs.expenseName}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>קטגוריה</Form.Label>
              <Form.Control
                name="category"
                type="text"
                value={customInputs.category}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                name="sum"
                type="text"
                value={customInputs.sum}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
          </div>
        )}

        <div className="mt-3 d-flex justify-content-center">
          <Button className="me-3" onClick={onSaveClick}>
            שמור
          </Button>
          <Button onClick={props.onClose}>סגור</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpense;
