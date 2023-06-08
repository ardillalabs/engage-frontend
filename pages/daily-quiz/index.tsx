
import React from 'react'
import type { Page } from "../../tsc-types/next";
import Header from '@/components/Quizes/Header';
import Head from 'next/head';
import DailyQuizStartForm from '@/components/Quizes/DailyQuiz/DailyQuizStartForm';
import SubHeader from '@/components/Quizes/SubHeader';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function DailyQuiz() {
    return (
      <>
        <Head>
          <title>Engage Daily Quiz</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header/>
          <SubHeader text="Let's establish your baseline mood for today."/>
          <DailyQuizStartForm/>
        </main>
      </>
    );
  }

  DailyQuiz.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
