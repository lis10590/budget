"use client";
import { Card, Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../_styles/settings.module.css";
import { getUserByEmail } from "../_utils/store/users";
import { getAllBudgetsByUser, getBudgetById } from "../_utils/store/budgets";
import ChooseBudget from "../_components/chooseBudget";
import { modalActions } from "../_utils/store/modal";

const Settings = () => {
  const { data } = useSession();
  const dispatch = useDispatch();
  const email = data?.user?.email;

  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  const budget = useSelector((state) => state.budgets.budget);
  const chooseBudgetModal = useSelector(
    (state) => state.modal.chooseBudgetModalOpen
  );
  const user = useSelector((state) => state.users.user);

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

  const chooseBudgetModalOpen = () => {
    dispatch(modalActions.chooseBudgetModalOpen());
  };

  const chooseBudgetModalClose = () => {
    dispatch(modalActions.chooseBudgetModalClose());
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
    <div className={`${styles.mainDiv} mt-5`}>
      <Card>
        <Card.Header className="text-center">הגדרות</Card.Header>
        <Card.Body>
          <p className="text-end">{email} :שם משתמש</p>
          <div className="d-flex flex-column align-items-end">
            <Button className="mt-3 mb-3">שנה סיסמא</Button>
            <Button onClick={chooseBudgetModalOpen}>בחר תקציב</Button>
          </div>
          <p className="text-end mt-3">
            תקציב נבחר : {budget ? budget.name : null}
          </p>
        </Card.Body>
      </Card>
      <ChooseBudget
        isOpen={chooseBudgetModal}
        onClose={chooseBudgetModalClose}
        budgetNames={budgetNames}
        user={user}
      />
    </div>
  );
};

export default Settings;