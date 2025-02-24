import { gql } from "graphql-request";
import { Metadata } from "next";
import React from "react";

import { TwoColumnLayout } from "@/components/layouts/twoColumn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
};

const Layout = ({ children }) => {
  return <TwoColumnLayout>{children}</TwoColumnLayout>;
};

export default Layout;
