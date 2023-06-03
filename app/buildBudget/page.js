"use client";
import {
  Form,
  FormGroup,
  Tabs,
  Tab,
  Container,
  Col,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import Expenses from "../_components/expenses";
import Incomes from "../_components/incomes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { budgetAddition } from "../_utils/store/budgets";
import { budgetAdditionToUser } from "../_utils/store/users";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import styles from "../_styles/budget.module.css";

const BuildBudget = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const [key, setKey] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [budgetName, setBudgetName] = useState("");

  const addExpenseToList = (newExpense) => {
    if (expenses.length === 0) {
      const newArray = [];
      newArray.push(newExpense);
      setExpenses(newArray);
    } else {
      const newArray = [...expenses, newExpense];
      setExpenses(newArray);
    }
  };

  const addIncomeToList = (newIncome) => {
    if (incomes.length === 0) {
      const newArray = [];
      newArray.push(newIncome);
      setIncomes(newArray);
    } else {
      const newArray = [...incomes, newIncome];
      setIncomes(newArray);
    }
  };

  const totalAmountCalc = () => {
    let expensesAmount = 0;
    let incomesAmount = 0;
    let balace = 0;
    for (const item of expenses) {
      expensesAmount = expensesAmount + item.sum;
    }
    for (const item2 of incomes) {
      incomesAmount = incomesAmount + item2.sum;
    }

    balace = incomesAmount - expensesAmount;

    return {
      expensesAmount,
      incomesAmount,
      balace,
    };
  };

  const saveBudget = async () => {
    const { incomesAmount, expensesAmount, balace } = totalAmountCalc();

    const obj = {
      predefinedExpenses: expenses,
      predefinedIncomes: incomes,
      name: budgetName,
      incomesAmount,
      expensesAmount,
      balace,
    };
    try {
      const budgetData = await dispatch(budgetAddition(obj));

      const obj2 = {
        email: data?.user?.email,
        budgetId: budgetData._id,
      };
      dispatch(budgetAdditionToUser(obj2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container className="d-flex flex-column">
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>סכום</th>
                  <th>קטגוריה</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => {
                  return (
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </td>
                      <td>{expense.sum}</td>
                      <td>{expense.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table className="mt-5">
              <thead>
                <tr>
                  <th></th>
                  <th>סכום</th>
                  <th>קטגוריה</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((income) => {
                  return (
                    <tr>
                      <td>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </td>
                      <td>{income.sum}</td>
                      <td>{income.category}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="mt-5">
              <Button onClick={saveBudget}>שמור תקציב</Button>
            </div>
          </Col>
          <Col>
            <FormGroup className="d-flex flex-column align-items-end">
              <Form.Label>שם תקציב</Form.Label>
              <Form.Control
                type="text"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
              />
            </FormGroup>

            <Tabs
              className="mt-5 mb-5 justify-content-end"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="expenses" title="הוצאות">
                <Expenses newExpense={addExpenseToList} />
              </Tab>
              <Tab eventKey="incomes" title="הכנסות">
                <Incomes newIncome={addIncomeToList} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BuildBudget;
