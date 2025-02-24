"use client";

import { SessionProvider } from "next-auth/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ResponsiveProvider } from "ui";
import { Provider as UrqlProvider } from "urql";

import { basePath } from "../../constants";
import { client } from "../../lib/urqlClient";
export const Providers = ({ children }) => {
  return (
    <SessionProvider basePath={basePath + "/api/auth"}>
      <ResponsiveProvider>
        <div id="message" />
        <UrqlProvider value={client}>{children}</UrqlProvider>
        <ProgressBar
          height="3px"
          color="#2fb2fa"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <div id="modal-root" />
      </ResponsiveProvider>
    </SessionProvider>
  );
};
