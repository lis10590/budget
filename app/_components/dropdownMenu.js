import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import styles from "../_styles/addexpense.module.css";

const DropdownMenu = (props) => {
  const [drop, setDrop] = useState("בחר מהרשימה");

  const onSelectDrop = (event) => {
    setDrop(event);
    if (props.selected) {
      props.selected(event);
    }
  };

  return (
    <Dropdown onSelect={onSelectDrop} className="d-flex justify-content-center">
      <Dropdown.Toggle id="dropdown-basic" className={styles.button}>
        {drop}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.menuOptions
          ? props.menuOptions.map((option, index) => {
              return (
                <Dropdown.Item key={index} eventKey={option}>
                  {option}
                </Dropdown.Item>
              );
            })
          : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
