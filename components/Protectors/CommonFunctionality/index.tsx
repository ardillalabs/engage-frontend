import React, { useEffect } from "react";

// redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RootState } from "../../../store";

//cookies
import { useCookies } from "react-cookie";
import { getCookie } from "cookies-next";
import { getCurrentUserDetails, getProfileDetails } from "@/actions/Auth";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useRouter as useRouterNavigation } from 'next/navigation';
import { useRouter as useRouterRouter } from 'next/router';

interface Props {
    getCurrentUserDetails: (...args: any[]) => any;
    getProfileDetails: (...args: any[]) => any;
    auth: any;
}

const CommonFunctionalityComp = ({ auth }: Props) => {
  //Get cookies
  const router = useRouterNavigation();
  const cookie = getCookie("access_token");
  const routerAuth = useRouterRouter();

  console.log('user common11', auth)

  useEffect(() => {
    console.log('user common', auth)
    // if (auth.is_getuser_loading) {
    //   if(auth.id === null) {
    //     return router.push("/login");
    //   }
    // }
    if (!auth.isLoadingLogin && !auth.is_getuser_loading) {
      if(auth.id === null) {
        return router.push("/login");
      }
        console.log('auth.is_getuser_loading', auth);
        if(auth.subscriptionId === null){  
            console.log('auth.subscriptionId',auth.subscriptionId)         
            return router.push("/payment");
        } 
        if(routerAuth.pathname === '/forgot-password' || routerAuth.pathname === '/login' || routerAuth.pathname === '/sign-up' || routerAuth.pathname === '/support-group' || routerAuth.pathname === '/payment'){
          return router.push("/dashboard");
        }
    }
  }, [auth]);

  return <></>;
};

CommonFunctionalityComp.propTypes = {
    getCurrentUserDetails: PropTypes.func.isRequired,
    getProfileDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
    getCurrentUserDetails, getProfileDetails,
})(CommonFunctionalityComp);
