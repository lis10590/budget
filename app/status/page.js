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

const Status = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;

  useEffect(() => {
    if (email) {
      dispatch(getUserByEmail(email));
    }
  }, [dispatch, email]);

  const user = useSelector((state) => state.users.user);
  const addExpenses = useSelector((state) => state.modal.addExpensesOpen);
  const addIncomes = useSelector((state) => state.modal.addIncomesOpen);

  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <div className="d-flex">
        <Button
          className="mb-5 me-3"
          onClick={() => dispatch(modalActions.addExpensesModalOpen())}
        >
          הוספת הוצאה חדשה
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Button
          className="mb-5"
          onClick={() => dispatch(modalActions.addIncomesModalOpen())}
        >
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
        onClose={dispatch(modalActions.addExpensesModalClose())}
        expenses={user.expenses}
      />
      <AddIncome
        isOpen={addIncomes}
        onClose={dispatch(modalActions.addIncomesModalClose())}
        incomes={user.incomes}
      />
    </div>
  );
};

export default Status;
