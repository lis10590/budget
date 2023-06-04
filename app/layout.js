"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "./_utils/store";
import NavbarComp from "./_components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SessionProvider>
            <NavbarComp />
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
