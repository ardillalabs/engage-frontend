import React from 'react';
import Head from 'next/head';
import type { Page } from '../../tsc-types/next';
import Header from '@/components/LoginPages/Header';
import PaymentForm from '@/components/LoginPages/Payment';

// Props type
type Props = {
  Component: Page;
};

export default function Payment() {
  return (
    <>
      <Head>
        <title>Engage Payment Method</title>
        <meta name='description' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='bg-color min-h-screen'>
        <Header subTopic='You can add your package payment' />
        <PaymentForm />
      </main>
    </>
  );
}

Payment.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
