import Head from "next/head";
import type { Page } from "../tsc-stypes/next";
import NavBar from "@/components/LandingPage/NavBar";
import Payment from "@/components/LandingPage/Payment";
import Steps from "@/components/LandingPage/Steps";
import WhoWeAre from "@/components/LandingPage/WhoWeAre";
import WhatWeCanDo from "@/components/LandingPage/WhatWeCanDo";
import Community from "@/components/LandingPage/Community";
import OurPhylosophy from "@/components/LandingPage/OurPhylosophy";
import ClientSays from "@/components/LandingPage/ClientsSays";
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
        <Steps />
        <WhoWeAre />
        <WhatWeCanDo />
        <Community />
        <OurPhylosophy />
        <ClientSays />
        <Footer />
      </main>
    </>
  );
}

Home.getLayout = function pageLayout(page: Props) {
  return <>{page}</>;
};
