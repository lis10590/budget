"use client";
import { Card, Spinner } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "../_utils/store/users";
import { getAllBudgetsByUser, getBudgetById } from "../_utils/store/budgets";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../_styles/categories.module.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;

  const budget = useSelector((state) => state.budgets.budget);

  const getUserAndBudgets = async () => {
    const loggedUser = await dispatch(getUserByEmail(email));

    const data = await dispatch(getAllBudgetsByUser(loggedUser.payload._id));
    console.log(data);
    dispatch(getBudgetById(loggedUser.payload.chosenBudget));
  };

  useEffect(() => {
    if (email) {
      getUserAndBudgets();
      dispatch(getUserByEmail(email));
    }
  }, [dispatch, email]);

  return (
    <div className={styles.mainDiv}>
      {budget && budget.predefinedExpenses ? (
        budget.predefinedExpenses.map((expense) => {
          return (
            <Card className="my-3" key={expense._id}>
              <Card.Header className={`text-end ${styles.cardHeader}`}>
                {expense.category}
              </Card.Header>
              <Card.Body>
                <p className="text-end">{expense.sum} :תכנון חודשי</p>
                <p className="text-end">{expense.balance} :יתרה</p>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Categories;
