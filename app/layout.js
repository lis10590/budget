"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "./_utils/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <SessionProvider>
          <body>{children}</body>
        </SessionProvider>
      </Provider>
    </html>
  );
}
