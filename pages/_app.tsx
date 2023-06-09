import "@/styles/globals.css";
import type { AppProps } from "next/app";
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
      </main>
    </Layout>
  );
}
