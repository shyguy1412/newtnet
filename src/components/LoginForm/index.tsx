import { FormEvent } from "react";
import styles from './LoginForm.module.css'

interface LoginParams {
  api_endpoint: string,
  callback<T>(data: T): void
}

export function LoginForm<T>({ api_endpoint, callback }: LoginParams) {

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

    const data = await response.json() as T;
    callback(data);
  }

  return <>
    <form className={styles.login_form} method="GET" target={api_endpoint} onSubmit={submitForm}>
      <input type="text" name="email" placeholder="E-Mail" />
      <input type="password" name="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </>
}