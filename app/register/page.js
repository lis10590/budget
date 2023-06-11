"use client";
import { Card, Button } from "react-bootstrap";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "../_components/inputComponent";
import styles from "../_styles/register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../_utils/store/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Register = () => {
  useEffect(() => {
    if (isSuccess) {
      toast.success("!נרשמת בהצלחה");
      router.push("/");
    }
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegister = () => {
    console.log(inputs);
    dispatch(register(inputs));
  };
  return (
    <div className={`mt-4 ${styles.mainDiv}`}>
      <Card>
        <InputComponent
          name="email"
          value={inputs.email}
          type="text"
          icon={faEnvelope}
          placeholder="אימייל"
          inputTextClass="mt-4 me-4"
          formControlClass="mt-4 ms-4 text-end"
          onChange={onChangeInput}
        />
        <InputComponent
          name="firstName"
          value={inputs.firstName}
          type="text"
          icon={faUser}
          placeholder="שם פרטי"
          inputTextClass="mt-4 me-4"
          formControlClass="mt-4 ms-4 text-end"
          onChange={onChangeInput}
        />
        <InputComponent
          name="lastName"
          value={inputs.lastName}
          type="text"
          icon={faUser}
          placeholder="שם משפחה"
          inputTextClass="mt-4 me-4"
          formControlClass="mt-4 ms-4 text-end"
          onChange={onChangeInput}
        />
        <InputComponent
          name="password"
          value={inputs.password}
          type="password"
          icon={faLock}
          placeholder="סיסמא"
          inputTextClass="mt-4 me-4"
          formControlClass="mt-4 ms-4 text-end"
          onChange={onChangeInput}
        />
        <InputComponent
          name="password2"
          value={inputs.password2}
          type="password"
          icon={faLock}
          placeholder="וידוא סיסמא"
          inputTextClass="mt-4 me-4 mb-3"
          formControlClass="mt-4 ms-4 mb-3 text-end"
          onChange={onChangeInput}
        />
        <div className="d-flex justify-content-center mb-4">
          <Button onClick={onRegister}>הירשם</Button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
