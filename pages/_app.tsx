import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "@/components/Sidebar";
import type { Page } from "../tsc-types/next";

import { Montserrat } from "next/font/google";
import Layout from "@/components/Layout";

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
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <Layout>
      <main className={montserrat.className}>
        <Component {...pageProps} />
        {/* <Layout Component={Component} pageProps={pageProps} /> */}
      </main>
    </Layout>
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
