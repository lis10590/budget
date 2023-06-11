"use client";
import { Card, Button, Spinner } from "react-bootstrap";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import InputComponent from "./_components/inputComponent";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const data = await signIn("credentials", {
        redirect: false,
        email: inputs.email,
        password: inputs.password,
      });

      if (data.error !== null) {
        setIsLoading(false);
        toast.error("wrong email or password!");
        console.log(data);
      } else {
        router.push("/home");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };
  return (
    <div className={`mt-4 ${styles.mainDiv}`}>
      <ToastContainer />
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
          name="password"
          value={inputs.password}
          type="password"
          icon={faLock}
          placeholder="סיסמא"
          inputTextClass="mt-4 me-4"
          formControlClass="mt-4 ms-4 text-end"
          onChange={onChangeInput}
        />

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button className={styles.button} onClick={onLogin}>
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "התחבר"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
