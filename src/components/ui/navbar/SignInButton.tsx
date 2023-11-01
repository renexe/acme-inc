'use client'
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import SignUpForm from "../forms/SignUpForm";
import SignInForm from "../forms/SignInForm";
import { logout, isLoggedIn } from "@/utils/user";

const SignInButton = () => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleOpenDialog = () => {
    if (isLogged) {
      logout();
      setIsLogged(false);
    } else {
      setOpenFormDialog(!openFormDialog);
    }
  }

  useEffect(() => {
    if (isLoggedIn()) {
      setIsLogged(true);
    }
  }, [openFormDialog]);

  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        color="white"
        onClick={handleOpenDialog}
      >
        {isLogged ? (
          <span>Logout</span>
        ) : (
          <span>Login</span>
        )}
      </Button>
      <Dialog
        size="xs"
        open={openFormDialog}
        handler={handleOpenDialog}
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
                    className="ml-1 font-bold"
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

                <SignInForm handleOpenDialog={handleOpenDialog} />

              </CardBody>
              <CardFooter className="pt-0">
                <Typography variant="small" className="mt-4 flex justify-center">
                  Não possui uma conta?
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
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
    </>
  );
}

SignInButton.displayName = 'SignInButton';

export default SignInButton;