
import React from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import SupportGroupForm from '@/components/LoginPages/SupportGroupForm';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function SupportGroup() {
    return (
      <>
        <Head>
          <title>Engage Support Group</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header subTopic="Add members to your wellness team" />
          <SupportGroupForm />
        </main>
      </>
    );
  }

  SupportGroup.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
