import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Page } from "@/tsc-types/next";
import EmailVerification from "@/components/LoginPages/EmailVerification";

type Props = {
  Component: Page;
};

export default function VerifyEmailPage() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <>
      <Head>
        <title>Coin Bureau Club - Email Verification</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* If we go live we want remove this meta tag 👇 */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <link rel="icon" type="image/x-icon" href="../favicon.ico" />
      </Head>
      <EmailVerification />
    </>
  ) : null;
}

VerifyEmailPage.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
