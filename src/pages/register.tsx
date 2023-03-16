import Head from 'next/head'
import styles from '@/styles/Register.module.css'
import path from 'path'
import { api_prefix } from '@/config'
import { ReactForm } from '@/components/ReactForm';
import { useRouter } from 'next/router';

type Props = ReturnType<typeof getStaticProps>['props'];

export function getStaticProps() {
  return {
    props: {
      api_endpoint: path.join(api_prefix, 'register')
    }
  }
}

export default function Register({ api_endpoint }: Props) {

  const router = useRouter();

  return (
    <>
      <Head>
        <title>NewtNet | Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <ReactForm
          method='POST'
          target={api_endpoint}
          onSuccess={() => router.push('/login')}
        >
          <input type="text" name="email" placeholder="E-Mail" />
          <input type="text" name="handle" placeholder="Handle" />
          <input type="text" name="screenname" placeholder="Screenname" />
          <input type="password" name="password" placeholder="Password" />
          <button>Register</button>
        </ReactForm>
      </main>
    </>
  )
}
