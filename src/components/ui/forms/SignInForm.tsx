'use client'
import { useState } from "react";
import { Button, Input, Typography } from "@/components/helpers/mt-exporter";
import { login } from "@/utils/user";

const SignInForm = (props: {
  handleOpenDialog: () => void;
}) => {
  const { handleOpenDialog } = props;
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [loginResult, setLoginResult] = useState<"fail" | "success" | null>(null);
  const [counter, setCounter] = useState(3);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form === null) return console.log('Form is null');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());


    if (validate(data)) {
      const loginData = {
        email: data.email as string,
        password: data.password as string,
      }
      if (login(loginData.email, loginData.password)) {
        triggerLoginSuccess();
      } else {
        setLoginResult('fail');
      }
    }
  };

  const triggerLoginSuccess = () => {
    setLoginResult('success');
    let count = 3;
    const intervalId = setInterval(() => {
      count--;
      setCounter(count);
      if (count === 0) {
        clearInterval(intervalId);
        handleOpenDialog();
      }
    }, 1000);
  }

  const validate = (data: any) => {
    setErrors({
      email: data.email === '' ? true : false,
      password: data.password === '' ? true : false,
    });
    return data.email === '' || data.password === '' ? false : true;
  };

  return (
    <form onSubmit={submit} method="POST">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input crossOrigin={true} label="Email" size="lg" error={errors.email} name="email" />
          {errors.email && (
            <span className="text-red-500 text-sm">
              É necessário informar o email
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input crossOrigin={true} label="Senha" size="lg" error={errors.password} name="password" />
          {errors.email && (
            <span className="text-red-500 text-sm">
              É necessário informar a senha
            </span>
          )}
        </div>
        {loginResult === "fail" && (
          <span className="text-red-500 text-sm">
            Email ou senha incorretos
          </span>
        )}
        {loginResult === "success" && (
          <span className="text-green-500 text-sm">
            Logado com sucesso [{counter}s]
          </span>
        )}
        <Button variant="gradient" type="submit" fullWidth>
          Login
        </Button>
      </div>
    </form>
  );
}

SignInForm.displayName = 'SignInForm';

export default SignInForm;