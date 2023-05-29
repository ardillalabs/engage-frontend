import Head from "next/head";
import type { Page } from "../tsc-types/next";
import NavBar from "@/components/LandingPage/NavBar";
import Payment from "@/components/LandingPage/Payment";
import EngageSolutions from "@/components/LandingPage/EngageSolutions";
import OurWhy from "@/components/LandingPage/OurWhy";
import OurApproach from "@/components/LandingPage/OurApproach";
import OurPhylosophy from "@/components/LandingPage/OurPhylosophy";
import EngageForFree from "@/components/LandingPage/EngageForFree";
import Footer from "@/components/LandingPage/Footer";
// Props type
type Props = {
  Component: Page;
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Engage Home page</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-color min-h-screen">
        <NavBar />
        <Payment />
        <EngageSolutions />
        <OurPhylosophy />
        <OurApproach />
        <OurWhy />
        <EngageForFree />
        <Footer />
      </main>
    </>
  );
}

Home.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
