import Hero from "@/components/Hero";
import { Raleway } from "next/font/google";
import Head from "next/head";

const raleway = Raleway({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="raleway">
      <Head>
        <title>PhotoFolio Next App</title>
      </Head>
      <Hero heading="Picfolio" message="Where Beauty Comes Alive" />
    </div>
  );
}
