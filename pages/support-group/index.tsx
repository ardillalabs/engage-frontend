
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import type { Page } from "../../tsc-types/next";
import Header from '@/components/LoginPages/Header';
import SupportGroupForm from '@/components/LoginPages/SupportGroupForm';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function SupportGroup() {
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
    const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {

    console.log('auth', auth);
    if (cookie) {
      setShouldRender(true);
    } 
    else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
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
    ) : null
  }

  SupportGroup.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
