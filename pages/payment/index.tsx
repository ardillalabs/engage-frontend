import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import type { Page } from '../../tsc-types/next';
import Header from '@/components/LoginPages/Header';
import PaymentForm from '@/components/LoginPages/Payment';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Props type
type Props = {
  Component: Page;
};

export default function Payment() {
  const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
    const auth = useSelector((state: RootState) => state.auth);
    
  useEffect(() => {

    if (cookie && auth.subscription === null) {
      setShouldRender(true);
    } 
    else if (cookie && auth.subscription === '1') {
      router.push('/dashboard');
    }
    else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
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
  ): null
}

Payment.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
