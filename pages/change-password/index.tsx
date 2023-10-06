
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import ChangePasswordForm from '@/components/LoginPages/ChangePasswordForm';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function ChangePassword() {
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
    const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {

    console.log('auth', auth);
    if (cookie && auth.membership === null) {
      setShouldRender(true);
    } 
    else if (cookie && auth.membership !== null) {
      router.push('/payment');
    }
    else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
      <>
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
    ): null
  }

  ChangePassword.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
