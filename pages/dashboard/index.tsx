import DashboardBody from '@/components/Dashboard/Body';
import Header from '@/components/Dashboard/Header';
import SignInProtector from '@/components/RouteProtectors/SignInProtector';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <>
      <Header />
      <DashboardBody />
    </>
  ): null
}


export default SignInProtector(Dashboard);
