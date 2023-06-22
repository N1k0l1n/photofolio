import { Raleway } from 'next/font/google'
import Head from 'next/head'

const raleway = Raleway({ subsets: ['latin'] })

export default function Home() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${raleway.className}`}
    >
      <Head>
        <title>PhotoFolio Next App</title>
      </Head>
    </div>
  )
}
