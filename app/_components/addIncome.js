"use client";
import { Modal, Form, FormGroup, Button, CloseButton } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { incomeAddition } from "../_utils/store/incomes";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [showIncomes, setShowIncomes] = useState(true);
  const [inputs, setInputs] = useState({
    incomeName: "",
    category: "",
    sum: 0,
  });

  const [customInputs, setCustomInputs] = useState({
    incomeName: "",
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
    setShowIncomes(false);
  };

  const onCloseCustom = () => {
    setShowCustom(false);
    setShowIncomes(true);
  };
  const onSaveClick = () => {
    if (showIncomes) {
      const obj = {
        ...inputs,
        category: selected,
      };
      dispatch(incomeAddition(obj));
    } else if (showCustom) {
      dispatch(incomeAddition(customInputs));
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className="justify-content-center">
        <Modal.Title>הוספת הכנסה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showIncomes && (
          <div>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>שם הכנסה</Form.Label>
              <Form.Control
                className="text-end"
                type="text"
                name="incomeName"
                value={inputs.incomeName}
                onChange={onChangeInputs}
              />
            </FormGroup>
            <p className="text-center mt-2">קטגוריה</p>
            <DropdownMenu
              menuOptions={props.incomes}
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
            <div className="d-flex justify-content-center">
              <Button className="mt-3" onClick={onAddCustom}>
                הוספת הכנסה לא מהרשימה{" "}
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
              <Form.Label>שם הכנסה</Form.Label>
              <Form.Control
                className="text-end"
                name="incomeName"
                type="text"
                value={customInputs.incomeName}
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
