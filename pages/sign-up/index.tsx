
import React from 'react'
import type { Page } from "../../tsc-stypes/next";
import Header from '@/components/LoginPages/Header';
import Head from 'next/head';
import SignupForm from '@/components/LoginPages/SignupForm';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function SignUp() {
    return (
      <>
        <Head>
          <title>Engage Login</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header />
          <SignupForm />
        </main>
      </>
    );
  }

  SignUp.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
