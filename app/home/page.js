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
import { getAllExpenses, selectAllExpenses } from "../_utils/store/expenses";
import { getAllIncomes, selectAllIncomes } from "../_utils/store/incomes";
import {
  expenseAdditionToBudget,
  getAllBudgets,
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
  useEffect(() => {
    dispatch(getAllBudgets());
    dispatch(getAllExpenses());
    dispatch(getAllIncomes());
    if (email) {
      getUserAndBudgets();
    }
  }, [dispatch, email]);

  const addExpenses = useSelector((state) => state.modal.addExpensesModalOpen);
  const addIncomes = useSelector((state) => state.modal.addIncomesModalOpen);
  const expenses = useSelector(selectAllExpenses);
  const incomes = useSelector(selectAllIncomes);
  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  console.log(budgets);

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

  const chosenBudget = () => {
    if (budgets) {
      for (const budget of budgets) {
        if (budget.name === selected) {
          return budget;
        }
      }
    }
  };
  const selectedBudget = chosenBudget();

  const arrangeExpenses = () => {
    let arr = [];
    if (selectedBudget) {
      for (const item of selectedBudget.predefinedExpenses) {
        arr.push(item.category);
      }
      return arr;
    } else return null;
  };

  const arrangeIncomes = () => {
    let arr = [];
    if (selectedBudget) {
      for (const item of selectedBudget.predefinedIncomes) {
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
      budgetId: selectedBudget._id,
      expenseId,
    };

    dispatch(expenseAdditionToBudget(obj));
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
          {expenses
            ? expenses.map((item) => {
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
      />
    </div>
  );
};

export default Home;
