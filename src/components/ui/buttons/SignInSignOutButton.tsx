'use client'
import { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { UserContext } from "@/providers/UserContext";

const SignInSignOutButton = () => {
  const { loggedUser, signOut, handleSignInDialogState } = useContext(UserContext);
  const buttonFunction = loggedUser ? signOut : handleSignInDialogState;

  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        color="white"
        onClick={buttonFunction}
      >
        {loggedUser ? (
          <span>Logout</span>
        ) : (
          <span>Login</span>
        )}
      </Button>

    </>
  );
}

SignInSignOutButton.displayName = 'SignInSignOutButton';

export default SignInSignOutButton;