"use client";
import { InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputComponent = (props) => {
  return (
    <InputGroup size="sm">
      <Form.Control
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={props.formControlClass}
        value={props.value}
        onChange={props.onChange}
      />
      <InputGroup.Text className={props.inputTextClass}>
        <FontAwesomeIcon icon={props.icon} />
      </InputGroup.Text>
    </InputGroup>
  );
};

export default InputComponent;
