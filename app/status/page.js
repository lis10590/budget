"use client";
import { Table } from "react-bootstrap";
import styles from "../_styles/status.module.css";

const Status = () => {
  return (
    <div
      className={`${styles.mainDiv} mt-5 d-flex flex-column align-items-center`}
    >
      <Table>
        <thead>
          <tr className="text-right">
            <th>יתרה</th>
            <th>תקציב</th>
            <th>קטגוריה</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default Status;
