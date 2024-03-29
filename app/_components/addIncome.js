"use client";
import { Modal, Form, FormGroup, Button, CloseButton } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incomeAddition } from "../_utils/store/incomes";
import DatePicker from "react-datepicker";
import styles from "../_styles/addexpense.module.css";

const AddExpense = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [showIncomes, setShowIncomes] = useState(true);
  const [inputs, setInputs] = useState({
    incomeName: "",
    category: "",
    sum: 0,
    date: "",
  });

  const [customInputs, setCustomInputs] = useState({
    incomeName: "",
    category: "",
    sum: 0,
    date: "",
  });
  const budget = useSelector((state) => state.budgets.budget);

  const predefinedIncomesCategories = () => {
    let arr = [];
    if (
      budget &&
      budget.predefinedIncomes &&
      budget.predefinedIncomes.length !== 0
    ) {
      for (const income of budget.predefinedIncomes) {
        arr.push(income.category);
      }
    }
    return arr;
  };

  const predefinedIncomes = predefinedIncomesCategories();
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
  const onSaveClick = async () => {
    if (showIncomes) {
      const obj = {
        ...inputs,
        category: selected,
      };
      const newIncome = await dispatch(incomeAddition(obj));
      props.incomeId(newIncome.payload._id);
      props.onClose();
    } else if (showCustom) {
      const newIncome = await dispatch(incomeAddition(customInputs));
      props.incomeId(newIncome.payload._id);
      props.onClose();
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={`justify-content-center ${styles.modalHeader}`}>
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
              menuOptions={predefinedIncomes}
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
              <Button className={`mt-3 ${styles.button}`} onClick={onAddCustom}>
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
          <Button className={`me-3 ${styles.button}`} onClick={onSaveClick}>
            שמור
          </Button>
          <Button className={styles.button} onClick={props.onClose}>
            סגור
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddExpense;
