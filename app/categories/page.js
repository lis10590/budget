"use client";
import { Card } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "../_utils/store/users";
import { getAllBudgetsByUser, getBudgetByName } from "../_utils/store/budgets";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "../_components/dropdownMenu";
import styles from "../_styles/categories.module.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const email = data?.user?.email;
  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  const budget = useSelector((state) => state.budgets.budget);

  const getUserAndBudgets = async () => {
    const loggedUser = await dispatch(getUserByEmail(email));

    const data = await dispatch(getAllBudgetsByUser(loggedUser.payload._id));
    console.log(data);
  };

  const populateBudget = () => {
    let id;
    if (budgets) {
      for (const budget of budgets) {
        if (budget.name === selected) {
          id = budget._id;
        }
      }

      dispatch(getBudgetByName(id));
    }
  };
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (email) {
      getUserAndBudgets();
    }
    if (selected) {
      populateBudget();
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

  return (
    <div className={styles.mainDiv}>
      <DropdownMenu selected={handleSelection} menuOptions={budgetNames} />
      {budget &&
      budget.predefinedExpenses &&
      budget.predefinedExpenses.length !== 0
        ? budget.predefinedExpenses.map((expense) => {
            return (
              <Card className="my-3" key={expense._id}>
                <Card.Header className="text-end">
                  {expense.category}
                </Card.Header>
                <Card.Body>
                  <p className="text-end">{expense.sum} :תכנון חודשי</p>
                  <p className="text-end">{expense.balance} :יתרה</p>
                </Card.Body>
              </Card>
            );
          })
        : null}
    </div>
  );
};

export default Categories;
