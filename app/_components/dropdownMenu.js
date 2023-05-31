import { Dropdown } from "react-bootstrap";
import { useState } from "react";

const DropdownMenu = (props) => {
  const [drop, setDrop] = useState("בחר מהרשימה");

  const onSelectDrop = (event) => {
    setDrop(event);
    props.selected(event);
  };

  return (
    <Dropdown onSelect={onSelectDrop} className="d-flex justify-content-center">
      <Dropdown.Toggle id="dropdown-basic">{drop}</Dropdown.Toggle>
      <Dropdown.Menu>
        {props.menuOptions.map((option, index) => {
          return (
            <Dropdown.Item key={index} eventKey={option}>
              {option}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
