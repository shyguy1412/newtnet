import Head from 'next/head'
import styles from '@/styles/Login.module.css'
import { ReactForm } from '@/components/ReactForm'
import path from 'path'
import { api_prefix } from '@/config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoginGet200Response } from '@/lib/api_client'
import { readCookie } from '@/lib/cookie'

type Props = ReturnType<typeof getStaticProps>['props'];

export function getStaticProps() {
  return {
    props: {
      api_endpoint: path.join(api_prefix, 'login')
    }
  }
}

export default function Login({ api_endpoint }: Props) {

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    // const token = readCookie('newt_user')

    // console.log(token);


    // if (token) {
    //   router.push('/');
    //   return;
    // };

  }, [router]);

  function onLogin(token: LoginGet200Response) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>NewtNet | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <ReactForm
          method='POST'
          target={api_endpoint}
          onSuccess={onLogin}
        >
          <input type="text" name="email" placeholder="E-Mail" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
        </ReactForm>
      </main>
    </>
  )
}
