import { useRouter } from "next/router";
import { FormEvent } from "react";
import styles from './RegisterForm.module.css'

interface RegisterParams {
  api_endpoint: string,
  redirect_url: string
}

export function RegisterForm<T>({ api_endpoint, redirect_url }: RegisterParams) {

  const router = useRouter();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    e.preventDefault();

    const formData = [...(new FormData(form).entries())]
      .map(entry => ({ [entry[0]]: entry[1] }))
      .reduce((prev, cur) => {
        return {
          ...prev,
          ...cur
        }
      });

    const response = await fetch(api_endpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    if(!response.ok){
      //ERROR
      return;
    }

    router.push(redirect_url);
  }

  return <>
    <form className={styles.Register_form} method="GET" target={api_endpoint} onSubmit={submitForm}>
      <input type="text" name="email" placeholder="E-Mail" />
      <input type="text" name="handle" placeholder="Handle" />
      <input type="text" name="screenname" placeholder="Screenname" />
      <input type="password" name="password" placeholder="Password" />
      <button>Register</button>
    </form>
  </>
}