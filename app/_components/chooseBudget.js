"use client";
import { Modal, Button } from "react-bootstrap";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chooseOneBudget } from "../_utils/store/budgets";
import { chosenBudgetAddition } from "../_utils/store/users";
import styles from "../_styles/settings.module.css";
import { toast } from "react-toastify";

const ChooseBudget = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const handleSelection = (selection) => {
    setSelected(selection);
  };

  const onSaveBudget = async () => {
    if (selected !== "") {
      let id = "";
      for (const item of props.userBudgets) {
        if (item.name === selected) {
          id = item._id;
        }
      }
      const chosenBud = await dispatch(chooseOneBudget(id));

      const obj = {
        userId: props.user._id,
        budgetId: chosenBud.payload._id,
      };

      props.budget(chosenBud.payload.name);

      dispatch(chosenBudgetAddition(obj));
      props.onClose();
      toast.success("!תקציב נבחר בהצלחה");
    }
  };

  return (
    <Modal show={props.isOpen} onHide={props.onClose}>
      <Modal.Header className={`justify-content-center ${styles.modalHeader}`}>
        בחר תקציב
      </Modal.Header>
      <Modal.Body>
        <DropdownMenu
          menuOptions={props.budgetNames}
          selected={handleSelection}
        />
        <div className="d-flex justify-content-center mt-3">
          <Button className={`me-3 ${styles.button}`} onClick={onSaveBudget}>
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

export default ChooseBudget;
