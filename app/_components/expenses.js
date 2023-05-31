"use client";
import { FormGroup, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DropdownMenu from "./dropdownMenu";

const Expenses = () => {
  const [showComp, setShowComp] = useState(false);
  const [selected, setSelected] = useState("");
  const [showSum, setShowSum] = useState(false);
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
              <FormGroup className="d-flex flex-column align-items-end">
                <Form.Label>סכום</Form.Label>
                <Form.Control type="text" />
              </FormGroup>
            )}
          </div>
          {selected === "אחר" && (
            <div className="mt-3">
              <FormGroup className="d-flex flex-column align-items-end">
                <Form.Label>שם הוצאה</Form.Label>
                <Form.Control type="text" />
              </FormGroup>
              <FormGroup className="d-flex flex-column align-items-end">
                <Form.Label>סכום</Form.Label>
                <Form.Control type="text" />
              </FormGroup>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Expenses;
