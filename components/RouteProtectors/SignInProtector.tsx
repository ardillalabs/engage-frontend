import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";

const SignInProtector = (WrappedComponent: any) => {
    
    const cookie = getCookie('access_token');

  return (props: any) => {
    if (typeof window !== "undefined") {
      let auth = useSelector((state: any) => state.auth);

      console.log(auth)
      const router = useRouter();

        if (cookie) {
          if (
            auth.is_getuser_loading === false
          ) {
            if (auth.status === "ACTIVE" || auth.status === "PENDING") {
              if (auth.subscription === null) {
                router.replace("/payment");
                return null;
              } 
          }
        }
      } else if (!cookie) {
        router.replace("/login");
                return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};
export default SignInProtector;
