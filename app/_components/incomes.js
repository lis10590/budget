"use client";
import { FormGroup, Form, Button, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "../_styles/budget.module.css";

const Incomes = (props) => {
  const [showComp, setShowComp] = useState(false);
  const [selected, setSelected] = useState("");
  const [customIncome, setCustomIncome] = useState("");
  const [sum, setSum] = useState(0);
  const [customInputSum, setCustomInputSum] = useState(0);

  const menuOptions = ["משכורת", "מלגה", "הכנסות פסיביות", "אחר"];

  const handleSelection = (selection) => {
    setSelected(selection);
    if (selection === "אחר") {
      setShowComp(false);
    } else {
      setShowComp(true);
    }
  };

  const onAddClick = () => {
    setShowComp(true);
  };

  const onCloseCustom = () => {
    setShowComp(false);
    setSelected("");
  };

  const handleIncome = () => {
    if (selected === "אחר") {
      const newIncome = {
        category: customIncome,
        sum: customInputSum,
        id: uuidv4(),
      };
      props.newIncome(newIncome);
    } else {
      const newIncome = {
        category: selected,
        sum: sum,
        id: uuidv4(),
      };

      props.newIncome(newIncome);
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button className={`mb-3 ${styles.button}`} onClick={onAddClick}>
          הוסף הכנסה
          <FontAwesomeIcon className="ms-2" icon={faPlus} />
        </Button>
      </div>

      {showComp && (
        <div>
          <DropdownMenu menuOptions={menuOptions} selected={handleSelection} />

          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>סכום</Form.Label>
            <Form.Control
              className="text-end"
              type="text"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </FormGroup>
        </div>
      )}

      {selected === "אחר" && (
        <div className="mt-3 d-flex flex-column align-items-end">
          <CloseButton onClick={onCloseCustom} />
          <FormGroup className="text-end">
            <Form.Label>שם הכנסה</Form.Label>
            <Form.Control
              className="text-end"
              type="text"
              value={customExpense}
              onChange={(e) => setCustomIncome(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="text-end">
            <Form.Label>סכום</Form.Label>
            <Form.Control
              className="text-end"
              type="text"
              value={customInputSum}
              onChange={(e) => setCustomInputSum(e.target.value)}
            />
          </FormGroup>
        </div>
      )}
      <div className="mt-3 d-flex justify-content-start">
        <Button className={styles.button} onClick={handleIncome}>
          {" "}
          הוסף לרשימה
        </Button>
      </div>
    </div>
  );
};

export default Incomes;
