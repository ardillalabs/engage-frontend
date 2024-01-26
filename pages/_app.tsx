import store from "../store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import type { Page } from "../tsc-types/next";

import { Montserrat } from "next/font/google";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import isAuth from "@/components/Protectors/Auth";
import CommonFunctionalityComp from "@/components/Protectors/CommonFunctionality";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Props type
type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {

  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    setShouldRender(true);
  }, []);

  // const ProtectedComponent = isAuth(Component);
  
  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
  return shouldRender ? (
    <Provider store={store}>
      <CommonFunctionalityComp/>
      <Layout>      
      {/* <CommonFunctionalityComp/> */}
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  ): null;
}
