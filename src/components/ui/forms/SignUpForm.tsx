'use client'
import { useContext, useState } from "react";
import { Button, Input } from "@/components/helpers/mt-exporter";

import { IUser } from "@/models/user";
import { UserContext } from "@/providers/UserContext";

const SignUpForm = (props: {
  hideRegisterForm: () => void;
}) => {
  const { registerUser } = useContext(UserContext);
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
  });
  const { hideRegisterForm } = props;
  const [registeredResult, setRegisterResult] = useState<"fail" | "success" | null>(null);
  const [counter, setCounter] = useState(3);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (form === null) return console.log('Form is null');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());


    if (validate(data)) {
      const userData: IUser = {
        name: data.name as string,
        phone: data.phone as string,
        email: data.email as string,
        password: data.password as string,
        favorites: [],
      }
      registerUser(userData)
      triggerRegisterSuccess();
    }
  };

  const triggerRegisterSuccess = () => {
    setRegisterResult('success');
    let count = 3;
    const intervalId = setInterval(() => {
      count--;
      setCounter(count);
      if (count === 0) {
        clearInterval(intervalId);
        hideRegisterForm();
      }
    }, 1000);
  }

  const validate = (data: any) => {
    setErrors({
      name: data.name === '' ? true : false,
      phone: data.phone === '' ? true : false,
      email: data.email === '' ? true : false,
      password: data.password === '' ? true : false,
    });
    return data.email === '' || data.password === '' ? false : true;
  };

  return (
    <form onSubmit={submit} method="POST">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input crossOrigin={true} label="Nome" size="lg" error={errors.name} name="name" />
          {errors.name && (
            <span className="text-red-500 text-sm">
              É necessário informar o nome
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input crossOrigin={true} label="Telefone" size="lg" error={errors.phone} name="phone" />
          {errors.phone && (
            <span className="text-red-500 text-sm">
              É necessário informar o telefone
            </span>
          )}
        </div>
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
        {registeredResult === "success" && (
          <span className="text-green-500 text-sm">
            Registrado com sucesso [{counter}s]
          </span>
        )}
        <Button variant="gradient" type="submit" fullWidth>
          Registrar
        </Button>
      </div>
    </form>
  );
}

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;