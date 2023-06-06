"use client";
import { Table, Button } from "react-bootstrap";
import styles from "../_styles/status.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../_utils/store/users";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddExpense from "../_components/addExpense";
import AddIncome from "../_components/addIncome";
import { modalActions } from "../_utils/store/modal";
import DropdownMenu from "../_components/dropdownMenu";
import { getAllBudgetsByUser } from "../_utils/store/budgets";
import {
  getAllExpenses,
  selectAllExpenses,
  getAllExpensesByBudget,
} from "../_utils/store/expenses";
import {
  getAllIncomes,
  selectAllIncomes,
  getAllIncomesByBudget,
} from "../_utils/store/incomes";
import {
  expenseAdditionToBudget,
  incomeAdditionToBudget,
  getAllBudgets,
  getBudgetByName,
} from "../_utils/store/budgets";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;
  const [selected, setSelected] = useState("");
  const user = useSelector((state) => state.users.user);

  const getUserAndBudgets = async () => {
    const loggedUser = await dispatch(getUserByEmail(email));

    const data = await dispatch(getAllBudgetsByUser(loggedUser.payload._id));
    console.log(data);
  };

  const addExpenses = useSelector((state) => state.modal.addExpensesModalOpen);
  const addIncomes = useSelector((state) => state.modal.addIncomesModalOpen);
  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  const budget = useSelector((state) => state.budgets.budget);

  useEffect(() => {
    dispatch(getAllBudgets());
    // dispatch(getAllExpenses());
    // dispatch(getAllIncomes());
    if (email) {
      getUserAndBudgets();
    }
    if (selected && user) {
      const obj = {
        userId: user._id,
        budgetName: selected,
      };
      dispatch(getBudgetByName(obj));
    }
  }, [dispatch, email, selected]);

  const handleSelection = (selection) => {
    setSelected(selection);
  };

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

  const arrangeExpenses = () => {
    let arr = [];
    if (budget && budget.predefinedExpenses) {
      for (const item of budget.predefinedExpenses) {
        arr.push(item.category);
      }
      return arr;
    } else return null;
  };

  const arrangeIncomes = () => {
    let arr = [];
    if (budget && budget.predefinedIncomes) {
      for (const item of budget.predefinedIncomes) {
        arr.push(item.category);
      }
      return arr;
    } else return null;
  };

  const predefinedExpenses = arrangeExpenses();
  const predefinedIncomes = arrangeIncomes();

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

  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <div className="d-flex flex-column">
        <p className="text-center">תקציב נבחר</p>
        <DropdownMenu menuOptions={budgetNames} selected={handleSelection} />
      </div>
      <div className="d-flex mt-3">
        <Button className="mb-5 me-3" onClick={addExpenseModalHandler}>
          הוספת הוצאה חדשה
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button className="mb-5" onClick={addIncomeModalHandler}>
          הוספת הכנסה חדשה
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <Table size="sm">
        <thead>
          <tr className="text-right">
            <th>יתרה</th>
            <th>תקציב</th>
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
                    <td>{item.balance}</td>
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
            <th>תקציב</th>
            <th>קטגוריה</th>
            <th>תאריך</th>
            <th>שם הכנסה</th>
          </tr>
        </thead>
        <tbody>
          {budget && budget.incomes
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
        expenses={predefinedExpenses}
        user={user}
        expenseId={addExpenseToBudget}
      />
      <AddIncome
        isOpen={addIncomes}
        onClose={closeIncomeModalHandler}
        incomes={predefinedIncomes}
        incomeId={addIncomeToBudget}
      />
    </div>
  );
};

export default Home;
