"use client";
import { FormGroup, Form, Button, CloseButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DropdownMenu from "./dropdownMenu";
import { expenseAddition } from "../_utils/store/expenses";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const [showComp, setShowComp] = useState(false);
  const [selected, setSelected] = useState("");
  const [customExpense, setCustomExpense] = useState("");
  const [sum, setSum] = useState(0);
  const [customInputSum, setCustomInputSum] = useState(0);
  const menuOptions = [
    "משכנתא/שכד",
    "סופרמרקט",
    "חשמל",
    "מים",
    "גז",
    "ביטוח בריאות",
    "חינוך",
    "אינטרנט",
    "טלוויזיה",
    "טלפון סלולרי",
    "הלוואות",
    "אחר",
  ];

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

  const handleExpense = () => {
    if (selected === "אחר") {
      const newExpense = {
        category: customExpense,
        sum: customInputSum,
        id: uuidv4(),
      };
      props.newExpense(newExpense);
    } else {
      const newExpense = {
        category: selected,
        sum: sum,
        id: uuidv4(),
      };

      props.newExpense(newExpense);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button className="mb-3" onClick={onAddClick}>
          הוסף הוצאה
          <FontAwesomeIcon icon={faPlus} />
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
            <Form.Label>שם הוצאה</Form.Label>
            <Form.Control
              className="text-end"
              type="text"
              value={customExpense}
              onChange={(e) => setCustomExpense(e.target.value)}
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
        <Button onClick={handleExpense}> הוסף לרשימה</Button>
      </div>
    </div>
  );
};

export default Expenses;
