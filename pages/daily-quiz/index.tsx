
import React from 'react'
import type { Page } from "../../tsc-types/next";
import Header from '@/components/Quizes/Header';
import Head from 'next/head';
import DailyQuizQuestions from '@/components/Quizes/DailyQuiz/DailyQuizQuestions';
import CommonFunctionality from '@/components/Protectors/CommonFunctionality';
  // Props type
  type Props = {
    Component: Page;
  };

  export default function DailyQuiz() {
    return (
      <>
        <CommonFunctionality/>
        <Head>
          <title>Engage Daily Quiz</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-color min-h-screen">
          <Header/>
          <DailyQuizQuestions/>
        </main>
      </>
    );
  }

  DailyQuiz.getLayout = function pageLayout(page: Props) {
    return <>{page}</>;
  };
