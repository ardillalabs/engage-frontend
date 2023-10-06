import React, { useEffect, useState } from "react";
import Head from "next/head";
import type { Page } from "../../tsc-types/next";
import Header from "@/components/LoginPages/Header";
import SignupForm from "@/components/LoginPages/SignupForm";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
// Props type
type Props = {
  Component: Page;
};

export default function SignUp() {
  const [shouldRender, setShouldRender] = useState(false);
    const router = useRouter();

    const cookie = getCookie('access_token');
    const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {

    console.log('auth', auth);
    if (!cookie) {
      setShouldRender(true);
    } 
    else if (cookie) {
      router.push('/dashboard');
    }
  }, [router]);

  return shouldRender ? (
    <>
      <Head>
        <title>Engage SignUp</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-color min-h-screen">
        <Header subTopic="Welcome to Engage" />
        <SignupForm />
      </main>
    </>
  ) : null
}

SignUp.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
