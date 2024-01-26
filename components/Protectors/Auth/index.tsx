import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CommonFunctionality from '../CommonFunctionality';

export default function isAuth(Component: any) {

  return function IsAuth(props: any) {
    const cookie = getCookie("access_token");
    const router = useRouter();
    const auth = typeof cookie === "string" ? cookie : null; // Ensure auth is a string
    console.log(auth);
    let user;

    useEffect(() => {
        if (!auth) {
          return router.push("/login");
        }
    }, [auth, router]);

    if(auth) {{
      
      console.log('auth common', auth)
    }
      <CommonFunctionality/>;
    }

    return <Component {...props} />;
  };
}

