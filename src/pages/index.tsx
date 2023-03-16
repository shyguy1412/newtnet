import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Navbar } from '@/components/Navbar'

export default function Home() {

  return (
    <>
      <Head>
        <title>NewtNet | Send Newts to everyone all around the globe!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

        <Navbar></Navbar>
        <main className={styles.main}>

        </main>
    </>
  )
}
