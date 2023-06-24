import Head from "next/head";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Engage Dashboard</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-color min-h-screen">
        <Header />
        <div className="button">
              <Link href="/daily-quiz">
                <button>Daily Quiz</button>
              </Link>
            </div>
      </main>
    </>
  );
}