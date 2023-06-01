"use client";
import { Table, Button } from "react-bootstrap";
import styles from "../_styles/status.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByEmail } from "../_utils/store/users";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddExpense from "../_components/addExpense";
import AddIncome from "../_components/addIncome";
import { modalActions } from "../_utils/store/modal";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;

  useEffect(() => {
    if (email) {
      dispatch(getUserByEmail(email));
    }
  }, [dispatch, email]);

  const user = useSelector((state) => state.users.user);
  console.log(user);
  const addExpenses = useSelector((state) => state.modal.addExpensesModalOpen);
  const addIncomes = useSelector((state) => state.modal.addIncomesModalOpen);

  const arrangeExpenses = () => {
    let arr = [];
    if (user.expenses && user.expenses.length !== 0) {
      for (const item of user.expenses) {
        arr.push(item.expenseName);
      }
      return arr;
    } else return null;
  };

  const arrangeIncomes = () => {
    let arr = [];
    if (user.incomes && user.incomes.length !== 0) {
      for (const item of user.incomes) {
        arr.push(item.incomeName);
      }
      return arr;
    } else return null;
  };

  const expenses = arrangeExpenses();
  const incomes = arrangeIncomes();

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

  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <div className="d-flex">
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
          </tr>
        </thead>
        <tbody>
          {user?.expenses?.map((item) => {
            return (
              <tr className="text-right" key={item._id}>
                <td>{item.balance}</td>
                <td>{item.sum}</td>
                <td>{item.expenseName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddExpense
        isOpen={addExpenses}
        onClose={closeExpenseModalHandler}
        expenses={expenses}
      />
      <AddIncome
        isOpen={addIncomes}
        onClose={closeIncomeModalHandler}
        incomes={incomes}
      />
    </div>
  );
};

export default Home;
