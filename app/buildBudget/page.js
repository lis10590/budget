"use client";
import { Form, FormGroup, Tabs, Tab, Container } from "react-bootstrap";
import { useState } from "react";
import Expenses from "../_components/expenses";
import Incomes from "../_components/incomes";
import styles from "../_styles/budget.module.css";

const BuildBudget = () => {
  const [key, setKey] = useState("expenses");
  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <Container className="d-flex flex-column align-items-end">
        <Form>
          <FormGroup className="d-flex flex-column align-items-end">
            <Form.Label>שם תקציב</Form.Label>
            <Form.Control type="text" />
          </FormGroup>
        </Form>
        <Tabs className="mt-5 mb-5" activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="expenses" title="הוצאות">
            <Expenses />
          </Tab>
          <Tab eventKey="incomes" title="הכנסות">
            <Incomes />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default BuildBudget;
