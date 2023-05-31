"use client";
import { FormGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./dropdownMenu";
import { useState } from "react";

const Incomes = () => {
  const [showComp, setShowComp] = useState(false);
  const [selected, setSelected] = useState("");
  const [showSum, setShowSum] = useState(false);
  const [income, setIncome] = useState("");
  const [sum, setSum] = useState(0);
  const [customInputSum, setCustomInputSum] = useState(0);

  const menuOptions = ["משכורת", "מלגה", "הכנסות פסיביות", "אחר"];

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
  return (
    <div>
      <Button className="mb-3" onClick={onAddClick}>
        הוסף/הוסיפי הכנסה
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
                <Form.Label>שם הכנסה</Form.Label>
                <Form.Control
                  type="text"
                  value={expense}
                  onChange={(e) => setIncome(e.target.value)}
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

export default Incomes;
