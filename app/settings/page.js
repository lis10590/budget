"use client";
import { Card, Button, Spinner } from "react-bootstrap";
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
  const [chosenBudget, setChosenBudget] = useState("");
  const budgets = useSelector((state) => state.budgets.budgetsByUser);
  const budget = useSelector((state) => state.budgets.budget);
  const chosBud = useSelector((state) => state.budgets.chosenBudget);
  const chooseBudgetModal = useSelector(
    (state) => state.modal.chooseBudgetModalOpen
  );
  const user = useSelector((state) => state.users.user);

  const getUserAndBudgets = async () => {
    const loggedUser = await dispatch(getUserByEmail(email));

    const data = await dispatch(getAllBudgetsByUser(loggedUser.payload._id));
    console.log(data);
    dispatch(getBudgetById(loggedUser.payload.chosenBudget));

    setChosenBudget(budget.name);
  };

  useEffect(() => {
    if (email) {
      getUserAndBudgets();
    }
  }, [dispatch, email, chosenBudget]);

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

  const chooseBudgetHandler = (name) => {
    setChosenBudget(name);
  };
  return (
    <div className={`${styles.mainDiv} mt-5`}>
      <Card>
        <Card.Header className={`text-center ${styles.cardHeader}`}>
          הגדרות
        </Card.Header>
        <Card.Body>
          <p className="text-end">{email} :שם משתמש</p>
          <div className="d-flex flex-column align-items-end">
            <Button className={`mt-3 mb-3 ${styles.button}`}>שנה סיסמא</Button>
            <Button onClick={chooseBudgetModalOpen} className={styles.button}>
              בחר תקציב
            </Button>
          </div>
          <p className="text-end mt-3">
            תקציב נבחר :{" "}
            {chosBud ? (
              chosBud.name
            ) : (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </p>
        </Card.Body>
      </Card>
      <ChooseBudget
        isOpen={chooseBudgetModal}
        onClose={chooseBudgetModalClose}
        budgetNames={budgetNames}
        budget={chooseBudgetHandler}
        user={user}
        userBudgets={budgets}
      />
    </div>
  );
};

export default Settings;
