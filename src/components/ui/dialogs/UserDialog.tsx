'use client'
import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SignUpForm from "../forms/SignUpForm";
import { useContext, useState } from "react";
import { UserContext } from "@/providers/UserContext";
import SignInForm from "../forms/SignInForm";

const UserDialog = () => {
  const { signInDialogState, handleSignInDialogState } = useContext(UserContext);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  return (
    <Dialog
      size="xs"
      open={signInDialogState}
      handler={handleSignInDialogState}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        {showRegisterForm ? (
          <>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Registrar nova conta
              </Typography>

              <SignUpForm hideRegisterForm={() => setShowRegisterForm(false)} />

            </CardBody>
            <CardFooter className="pt-0">
              <Typography variant="small" className="mt-4 flex justify-center">
                Já possui uma conta?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold cursor-pointer"
                  onClick={() => setShowRegisterForm(false)}
                >
                  Login
                </Typography>
              </Typography>
            </CardFooter>
          </>
        ) : (
          <>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Acessar conta de usuário
              </Typography>

              <SignInForm />

            </CardBody>
            <CardFooter className="pt-0">
              <Typography variant="small" className="mt-4 flex justify-center">
                Não possui uma conta?
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold cursor-pointer"
                  onClick={() => setShowRegisterForm(true)}
                >
                  Registrar
                </Typography>
              </Typography>
            </CardFooter>
          </>
        )}
      </Card>
    </Dialog>
  )
}

UserDialog.displayName = 'UserDialog'

export default UserDialog