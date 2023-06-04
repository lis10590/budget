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
import { useState, useEffect } from "react";
import Expenses from "../_components/expenses";
import Incomes from "../_components/incomes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { budgetAddition } from "../_utils/store/budgets";
import { budgetAdditionToUser } from "../_utils/store/users";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { modalActions } from "../_utils/store/modal";
import styles from "../_styles/budget.module.css";
import UpdateComp from "../_components/updateComp";

const BuildBudget = () => {
  const dispatch = useDispatch();

  const { data } = useSession();
  const [key, setKey] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [input, setInput] = useState({
    id: "",
    category: "",
    sum: 0,
    type: "",
  });

  const updateModal = useSelector(
    (state) => state.modal.updateComponentModalOpen
  );

  const openModalHandler = (input, type) => {
    setInput({
      id: input.id,
      category: input.category,
      sum: input.sum,
      type,
    });

    dispatch(modalActions.updateComponentModalOpen());
  };

  const closeModalHandler = () => {
    dispatch(modalActions.updateComponentModalClose());
  };

  const updateValueHandler = (updatedInput) => {
    console.log(updatedInput);
    if (updatedInput.type === "expense") {
      const updatedData = expenses.map((expense) => {
        if (expense.id === updatedInput.id) {
          return { ...expense, ...updatedInput };
        }
        return expense;
      });

      setExpenses(updatedData);
    } else if (updatedInput.type === "income") {
      const updatedData = incomes.map((income) => {
        if (income.id === updatedInput.id) {
          return { ...income, ...updatedInput };
        }
        return income;
      });

      setIncomes(updatedData);
    }
    dispatch(modalActions.updateComponentModalClose());
  };

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
      expensesAmount = Number(expensesAmount) + Number(item.sum);
    }
    for (const item2 of incomes) {
      incomesAmount = Number(incomesAmount) + Number(item2.sum);
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
        budgetId: budgetData.payload._id,
      };
      console.log(obj2);
      await dispatch(budgetAdditionToUser(obj2));
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
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => openModalHandler(expense, "expense")}
                        />
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
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => openModalHandler(income, "income")}
                        />
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
      <UpdateComp
        isOpen={updateModal}
        onClose={closeModalHandler}
        input={input}
        update={updateValueHandler}
      />
    </div>
  );
};

export default BuildBudget;
