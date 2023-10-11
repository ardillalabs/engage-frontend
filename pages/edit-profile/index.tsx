import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/LoginPages/Header';
import EditProfileForm from '@/components/LoginPages/EditProfileForm';
import { Page } from '@/tsc-types/next';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Props type
type Props = {
  Component: Page;
  auth: any;
};

function EditProfile() {
  const [shouldRender, setShouldRender] = useState(false);
  const router = useRouter();

  const cookie = getCookie('access_token');
  const auth = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {

    if (cookie && auth.subscription === '1') {
      setShouldRender(true);
    } 
    else if (cookie && auth.subscription !== '1') {
      router.push('/payment');
    } else {
       router.push('/login');
    }
  }, [router]);

  return shouldRender ? (
    <>
      <Head>
        <title>Engage Edit Profile</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-color min-h-screen">
        <Header subTopic="Welcome to Engage" />
        <EditProfileForm />
      </main>
    </>
  ) : null;
}

EditProfile.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};

export default EditProfile;
