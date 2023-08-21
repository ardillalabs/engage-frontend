import React, { useState, useEffect } from 'react';

// redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { RootState } from '@/store';
// import CommonLoadingComp from "components/Layout/Common/CommonLoadingComp";

const PaymentMessagePage = ({ auth }: any) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender ? (
    <div>
      <Head>
        <title>Engage - Payment Message</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* If we go live we want remove this meta tag 👇 */}
        <meta name='robots' content='noindex, nofollow' />
        <link rel='shortcut icon' href='./favicon.ico' />
        <link rel='icon' type='image/x-icon' href='../favicon.ico' />
      </Head>
      {/* <CommonLoadingComp /> */}
      <h1>Payment Processing...</h1>
    </div>
  ) : null;
};

PaymentMessagePage.propTypes = {};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(PaymentMessagePage);
