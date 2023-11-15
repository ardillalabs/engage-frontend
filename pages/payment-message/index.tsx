import React, { useState, useEffect } from 'react';
import type { Page } from '../../tsc-types/next';
import Head from 'next/head';
import PaymentMessage from '@/components/LoginPages/Payment/PaymentMessage';

type Props = {
  Component: Page;
};

export default function PaymentMessagePage() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <div>
      <Head>
        <title>Engage - Payment Message</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* If we go live we want remove this meta tag 👇 */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <link rel="icon" type="image/x-icon" href="../favicon.ico" />
      </Head>
      <main className='bg-color min-h-screen'>
        <PaymentMessage />
      </main>
    </div>
  ) : null;
}

PaymentMessagePage.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
