"use client";
import { loadStripe } from "@stripe/stripe-js";
import classNames from "classnames";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { Button, Content, PageHeader, Table } from "ui";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

import { formatAmountForDisplay } from "@/components/payments/utils";

import { basePath } from "@/constants";
import { SessionData } from "@/graphql/types";
import { getReadableDate } from "@/shared/utils";

import { getServerSession } from "../../graphql/context";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type P = InferGetServerSidePropsType<any>;
interface Props {
  session: SessionData;
}
const Payments: FC<P & Props> = ({ customer, session, charges, active }) => {
  const handleClick = async (event) => {
    const res = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    const stripe = await stripePromise;

    const result = await stripe?.redirectToCheckout({
      sessionId: res.id,
    });
  };

  const deleteSubscription = async () => {
    const id = customer?.subscriptions?.data[0]?.id;
    if (!id) return;
    const result = fetch(basePath + "/api/cancelSubscription", {
      method: "POST",
      body: JSON.stringify({ subscription_id: id }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  };

  return (
    <>
      <Head>
        <title>Membership</title>
      </Head>
      <PageHeader className="site-page-header" title="Membership">
        <span className="help-text">
          This is where you can manage your payments.
        </span>
      </PageHeader>
      <Content>
        <input type="hidden" name="priceId" value="price_G0FvDp6vZvdwRZ" />
        <div className="flex items-center justify-between">
          <p>
            Status:{" "}
            <span
              className={classNames("font-medium", {
                "text-green-600": active,
                "text-red-500": !active,
              })}
            >
              {active ? "Active" : "Inactive"}
            </span>
          </p>
          {active ? (
            <Button onClick={deleteSubscription} variant="danger">
              Cancel Subscription
            </Button>
          ) : (
            <Button type="submit" onClick={handleClick}>
              Subscribe
            </Button>
          )}
        </div>
        {active && (
          <Table
            columns={[
              {
                key: "date",
                title: "Date",
                dataIndex: "date",
              },
              {
                key: "ammount",
                title: "Ammount",
                dataIndex: "ammount",
              },
              {
                key: "receipt_url",
                title: "Receipt",
                dataIndex: "receipt_url",
                render: (url) => {
                  return (
                    <Link href={url}>
                      <a target="_blank" className="text-blue-600">
                        Receipt
                      </a>
                    </Link>
                  );
                },
              },
              {
                key: "status",
                title: "Status",
                dataIndex: "status",
              },
            ]}
            dataSource={charges?.data.map((item) => ({
              date: getReadableDate(item.created * 1000),
              status: item.status === "succeeded" ? "Paid" : "Failed",
              receipt_url: item.receipt_url,
              ammount: formatAmountForDisplay(item.amount, item.currency),
            }))}
          />
        )}
      </Content>
    </>
  );
};

export default Payments;

// export async function getServerSideProps({ req, res }) {
//   const _session = await getServerSession({ req: req });
//   const session = _session as unknown as { user: SessionData };
//   //   if (!session || !session.user.id) return res.status(401).send("Unauthorized");
//   const author = await prisma.author.findFirst({
//     where: { id: session.user.id },
//   });
//   if (!author || !author.stripe_customer_id) {
//     return {
//       props: {
//         active: false,
//       },
//     };
//   }

//   const details = async () => {
//     const customer = await stripe.customers.retrieve(
//       author?.stripe_customer_id!,
//       {
//         expand: ["subscriptions"], // 2
//       }
//     );
//     if (!customer.deleted) {
//       const charges = await stripe.charges.list({
//         customer: author?.stripe_customer_id!,
//         limit: 3,
//       });
//       return { customer, charges };
//     }
//     return { customer: null, charges: null };
//   };
//   const { customer, charges } = await details();
//   const active = customer?.subscriptions?.data[0]?.status === "active";
//   return { props: { customer, charges, active } };
// }
