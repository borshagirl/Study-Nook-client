
"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = () => {

  const handleGoogleLogin = async () => {

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000"
    });

  };

  return (
    <Button 
      variant="outline"
      onClick={handleGoogleLogin}
      className={"mt-4 w-full"}
    >
      <FaGoogle /> Google
    </Button>
  );
};

export default GoogleLoginButton;