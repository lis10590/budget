"use client";
import { FormGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DropdownMenu from "./dropdownMenu";
import { expenseAddition } from "../_utils/store/expenses";
import { useSession } from "next-auth/react";

const Expenses = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const [showComp, setShowComp] = useState(false);
  const [selected, setSelected] = useState("");
  const [showSum, setShowSum] = useState(false);
  const [expense, setExpense] = useState("");
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
      setShowSum(false);
    } else {
      setShowSum(true);
    }
  };

  const onAddClick = () => {
    setShowComp(true);
    setShowSum(true);
  };

  const onSaveInput = () => {
    const obj = {
      expenseName: selected,
      sum: sum,
      email: data.user.email,
    };

    console.log(obj);
    dispatch(expenseAddition(obj));
  };

  const onSaveCustomInput = () => {
    const obj = {
      expenseName: expense,
      sum: customInputSum,
      email: data.user.email,
    };
    dispatch(expenseAddition(obj));
  };
  return (
    <div>
      <Button className="mb-3" onClick={onAddClick}>
        הוסף/הוסיפי הוצאה
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      {showComp && (
        <>
          <div className="mt-3 mb-3">
            <DropdownMenu
              menuOptions={menuOptions}
              selected={handleSelection}
            />
            {showSum && (
              <div className="d-flex flex-row-reverse align-items-end">
                <FormGroup className="d-flex flex-column align-items-end">
                  <Form.Label>סכום</Form.Label>
                  <Form.Control
                    type="text"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                  />
                </FormGroup>
                <div className="me-3">
                  <Button onClick={onSaveInput}>שמור</Button>
                </div>
              </div>
            )}
          </div>
          {selected === "אחר" && (
            <div className="mt-3">
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
              <div className="mt-3 d-flex justify-content-end">
                <Button onClick={onSaveCustomInput}>שמור</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Expenses;
