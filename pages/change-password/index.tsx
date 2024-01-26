
import React from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import ChangePasswordForm from '@/components/LoginPages/ChangePasswordForm';
import CommonFunctionality from '@/components/Protectors/CommonFunctionality';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function ChangePassword() {
    return (
      <>
        <CommonFunctionality/>
        <Head>
          <title>Engage Change Password</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header subTopic="Welcome to Engage" />
          <ChangePasswordForm/>
        </main>
      </>
    );
  }

  ChangePassword.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
