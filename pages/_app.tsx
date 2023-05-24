import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/Sidebar";
import { Montserrat } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// export type NextPageWithLayout = NextPage & {
//   getLayout?: (page: ReactElement) => ReactNode;
//   // router: Router;
// }

// type AppPropsWithLayout = AppProps & {
//   Component:NextPageWithLayout;
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Sidebar>
      <main className={montserrat.className}>
        <Component {...pageProps} />
        {/* <Layout Component={Component} pageProps={pageProps} /> */}
      </main>
    </Sidebar>
  );
}

// Layout: any (should be defined)
// const Layout: any = ({ Component, pageProps }: AppPropsWithLayout) => {
//   if (Component.getLayout) {
//     return Component.getLayout(<Component {...pageProps} />);
//   } else {
//     return <Component {...pageProps} />;
//   }
// };
