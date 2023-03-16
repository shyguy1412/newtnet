import { asyncInlineCatch } from "@/lib/InlineCatch";
import { FormEvent } from "react";

interface Props {
  target: string,
  method: 'POST' | 'GET' | 'PUT' | 'DELETE',
  onError?: <T>(err: T) => void,
  onSuccess?: <T>(data: T) => void,
  children: JSX.Element[]
}

export function ReactForm({ target, method, onSuccess, onError, children }: Props) {

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

    const response = await fetch(target, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await asyncInlineCatch(() => response.json());

    if (!response.ok) {
      if (onError)
        onError(data ?? { status: response.status });
      return;
    }

    if (onSuccess)
      onSuccess(data ?? {status: response.status});
  }

  return <>
    <form method={method} target={target} onSubmit={submitForm}>
      {...children}
    </form>
  </>
}