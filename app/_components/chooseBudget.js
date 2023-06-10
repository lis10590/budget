"use client";
import { Modal, CloseButton, Button } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chooseOneBudget } from "../_utils/store/budgets";
import { chosenBudgetAddition } from "../_utils/store/users";

const ChooseBudget = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const handleSelection = (selection) => {
    setSelected(selection);
  };

  const onSaveBudget = async () => {
    if (selected !== "") {
      const chosenBud = await dispatch(chooseOneBudget(selected));

      const obj = {
        userId: props.user._id,
        budgetId: chosenBud.payload[0]._id,
      };

      props.budget(chosenBud.payload[0].name);

      dispatch(chosenBudgetAddition(obj));
      props.onClose();
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className="justify-content-center">בחר תקציב</Modal.Header>
      <Modal.Body>
        <DropdownMenu
          menuOptions={props.budgetNames}
          selected={handleSelection}
        />
        <div className="d-flex justify-content-center mt-3">
          <Button className="me-3" onClick={onSaveBudget}>
            שמור
          </Button>
          <Button onClick={props.onClose}>סגור</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChooseBudget;
