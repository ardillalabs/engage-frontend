import React, { useEffect, useState } from 'react'
import type { Page } from "../../tsc-types/next";
import Header from '@/components/Quizes/Header';
import Head from 'next/head';
import WeeklyQuizQuestions from '@/components/Quizes/WeeklyQuiz/WeeklyQuizQuestions';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function WeeklyQuiz() {
    const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
    const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {

    console.log('auth', auth);
    if (cookie && auth.subscription === '1') {
      setShouldRender(true);
    } 
    else if (cookie && auth.subscription !== '1') {
      router.push('/payment');
    }
    else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
      <>
        <Head>
          <title>Engage Weekly Quiz</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header/>
          <WeeklyQuizQuestions/>
        </main>
      </>
    ): null
  }

  WeeklyQuiz.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
