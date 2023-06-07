"use client";
import { Modal, Form, FormGroup, Button, CloseButton } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { expenseAddition } from "../_utils/store/expenses";

import DatePicker from "react-datepicker";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [inputs, setInputs] = useState({
    expenseName: "",
    category: "",
    sum: 0,
    date: "",
  });

  const [customInputs, setCustomInputs] = useState({
    expenseName: "",
    category: "",
    sum: 0,
    date: "",
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
  const onSaveClick = async () => {
    if (showExpenses) {
      const obj = {
        ...inputs,
        category: selected,
      };
      const newExpense = await dispatch(expenseAddition(obj));
      props.expenseId(newExpense.payload._id);
      props.updateBalance(selected, inputs.sum);
      props.onClose();
    } else if (showCustom) {
      const newExpense = await dispatch(expenseAddition(customInputs));
      props.expenseId(newExpense.payload._id);
      props.onClose();
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
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>שם הוצאה</Form.Label>
              <Form.Control
                className="text-end"
                type="text"
                name="expenseName"
                value={inputs.expenseName}
                onChange={onChangeInputs}
              />
            </FormGroup>
            <p className="text-center mt-2">קטגוריה</p>
            <DropdownMenu
              menuOptions={props.expenses}
              selected={handleSelection}
            />

            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                className="text-end"
                name="sum"
                type="text"
                value={inputs.sum}
                onChange={onChangeInputs}
              />
            </FormGroup>
            <div className="position-relative" style={{ left: "9rem" }}>
              <DatePicker
                className="text-center  mt-3"
                placeholderText="תאריך"
                selected={inputs.date}
                onChange={(date) => setInputs({ ...inputs, date })}
              />
            </div>

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
                className="text-end"
                name="expenseName"
                type="text"
                value={customInputs.expenseName}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>קטגוריה</Form.Label>
              <Form.Control
                className="text-end"
                name="category"
                type="text"
                value={customInputs.category}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>סכום</Form.Label>
              <Form.Control
                className="text-end"
                name="sum"
                type="text"
                value={customInputs.sum}
                onChange={onChangeCustomInputs}
              />
            </FormGroup>
            <div className="position-relative" style={{ left: "9rem" }}>
              <DatePicker
                className="text-center mt-3"
                placeholderText="תאריך"
                selected={customInputs.date}
                onChange={(date) => setCustomInputs({ ...customInputs, date })}
              />
            </div>
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
