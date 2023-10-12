
import React from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import ForgotPasswordFrom from '@/components/LoginPages/ForgotPasswordForm';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function ForgotPassword() {
    return (
      <>
        <Head>
          <title>Engage Forgot Password</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header subTopic="Welcome to Engage" />
          <ForgotPasswordFrom />
        </main>
      </>
    );
  }

  ForgotPassword.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
