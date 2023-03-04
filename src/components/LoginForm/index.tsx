import { FormEvent } from "react";
import { TypeParameter } from "typescript";
import styles from './LoginForm.module.css'

interface LoginParams {
  api_endpoint: string,
  onLogin(data: any): void
}

export function LoginForm({ api_endpoint, onLogin }: LoginParams) {

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

    if (!response.ok) {
      //ERROR
      return;
    }

    const data = await response.json();
    onLogin(data);
  }

  return <>
    <form className={styles.login_form} method="GET" target={api_endpoint} onSubmit={submitForm}>
      <input type="text" name="email" placeholder="E-Mail" />
      <input type="password" name="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </>
}