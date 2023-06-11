"use client";
import { Table, Button } from "react-bootstrap";
import styles from "../_styles/home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../_utils/store/users";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddExpense from "../_components/addExpense";
import AddIncome from "../_components/addIncome";
import { modalActions } from "../_utils/store/modal";
import { getAllBudgetsByUser } from "../_utils/store/budgets";
import { getAllExpenses } from "../_utils/store/expenses";
import { getAllIncomes } from "../_utils/store/incomes";
import {
  expenseAdditionToBudget,
  incomeAdditionToBudget,
  getAllBudgets,
  getBudgetByName,
  getBudgetById,
} from "../_utils/store/budgets";

import { updateExpenseBalance } from "../_utils/store/predefinedExpenses";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;
  // const [selected, setSelected] = useState("");
  const user = useSelector((state) => state.users.user);

  const getUserAndBudgets = async () => {
    const loggedUser = await dispatch(getUserByEmail(email));

    const data = await dispatch(getAllBudgetsByUser(loggedUser.payload._id));

    dispatch(getBudgetById(loggedUser.payload.chosenBudget));
  };

  // const populateBudget = () => {
  //   let id;
  //   if (budgets) {
  //     for (const budget of budgets) {
  //       if (budget.name === selected) {
  //         id = budget._id;
  //       }
  //     }

  //     dispatch(getBudgetByName(id));
  //   }
  // };

  const addExpenses = useSelector((state) => state.modal.addExpensesModalOpen);
  const addIncomes = useSelector((state) => state.modal.addIncomesModalOpen);
  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  const budget = useSelector((state) => state.budgets.budget);

  useEffect(() => {
    dispatch(getAllBudgets());
    dispatch(getAllExpenses());
    dispatch(getAllIncomes());
    if (email) {
      getUserAndBudgets();
      dispatch(getUserByEmail(email));
    }
  }, [dispatch, email]);

  // useEffect(() => {
  //   if (selected && user) {
  //     populateBudget();
  //   }
  // }, [selected]);

  // const handleSelection = (selection) => {
  //   setSelected(selection);
  // };

  const arrangeBudgets = () => {
    let budgetNames = [];

    if (budgets) {
      for (const item of budgets) {
        budgetNames.push(item.name);
      }

      return budgetNames;
    }
  };

  const budgetNames = arrangeBudgets();

  const addExpenseModalHandler = () => {
    dispatch(modalActions.addExpensesModalOpen());
  };

  const addIncomeModalHandler = () => {
    dispatch(modalActions.addIncomesModalOpen());
  };

  const closeExpenseModalHandler = () => {
    dispatch(modalActions.addExpensesModalClose());
  };

  const closeIncomeModalHandler = () => {
    dispatch(modalActions.addIncomesModalClose());
  };

  const addExpenseToBudget = (expenseId) => {
    const obj = {
      budgetId: budget._id,
      expenseId,
    };

    dispatch(expenseAdditionToBudget(obj));
  };

  const addIncomeToBudget = (incomeId) => {
    const obj = {
      budgetId: budget._id,
      incomeId,
    };
    dispatch(incomeAdditionToBudget(obj));
  };

  const updateBalance = (category, sum) => {
    let newBalance;
    let expenseId;

    for (const item of budget.predefinedExpenses) {
      if (item.category === category) {
        expenseId = item._id;

        if (item.balance === item.sum) {
          newBalance = Number(item.sum) - Number(sum);
          console.log("same sum", newBalance);
        } else {
          newBalance = Number(item.balance) - Number(sum);
          console.log("not same sum", newBalance);
        }
      }
    }
    if (newBalance !== undefined) {
      const obj = {
        expenseId,
        newBalance,
      };
      dispatch(updateExpenseBalance(obj));
    }
  };

  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <div className="d-flex flex-column">
        <p className="text-center">תקציב נבחר</p>
        {budget && budget !== undefined ? budget.name : null}
      </div>
      <div className="d-flex mt-3">
        <Button
          className={`mb-5 me-3 ${styles.button}`}
          onClick={addExpenseModalHandler}
        >
          הוספת הוצאה חדשה
          <FontAwesomeIcon className="ms-2" icon={faPlus} />
        </Button>
        <Button
          className={`mb-5 me-3 ${styles.button}`}
          onClick={addIncomeModalHandler}
        >
          הוספת הכנסה חדשה
          <FontAwesomeIcon className="ms-2" icon={faPlus} />
        </Button>
      </div>

      <Table size="sm">
        <thead>
          <tr className="text-right">
            <th>סכום</th>
            <th>קטגוריה</th>
            <th>תאריך</th>
            <th>שם הוצאה</th>
          </tr>
        </thead>
        <tbody>
          {budget && budget.expenses
            ? budget.expenses.map((item) => {
                return (
                  <tr className="text-right" key={item._id}>
                    <td>{item.sum}</td>
                    <td>{item.category}</td>
                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                    <td>{item.expenseName}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <Table size="sm">
        <thead>
          <tr className="text-right">
            <th>סכום</th>
            <th>קטגוריה</th>
            <th>תאריך</th>
            <th>שם הכנסה</th>
          </tr>
        </thead>
        <tbody>
          {budget && budget.expenses
            ? budget.incomes.map((item) => {
                return (
                  <tr className="text-right" key={item._id}>
                    <td>{item.sum}</td>
                    <td>{item.category}</td>
                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                    <td>{item.incomeName}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <AddExpense
        isOpen={addExpenses}
        onClose={closeExpenseModalHandler}
        user={user}
        expenseId={addExpenseToBudget}
        updateBalance={updateBalance}
      />
      <AddIncome
        isOpen={addIncomes}
        onClose={closeIncomeModalHandler}
        incomeId={addIncomeToBudget}
      />
    </div>
  );
};

export default Home;
