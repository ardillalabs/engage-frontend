
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import ForgotPasswordFrom from '@/components/LoginPages/ForgotPasswordForm';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function ForgotPassword() {
    
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
  
  useEffect(() => {

    if (!cookie) {
      setShouldRender(true);
    } 
    else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
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
    ) : null
  }

  ForgotPassword.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
