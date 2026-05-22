"use client";

import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { signInUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import GoogleLoginButton from "./GoogleLoginButton";
import Link from "next/link";


const LoginForm = () => {

    const router = useRouter();

    const [serverError,setServerError] = useState("");

    const onSubmit = async (e)=>{
        e.preventDefault();
        setServerError("");

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        const result = await signInUser({
            email,  
            password
        });
        // console.log("LOGIN RESULT:", result);

        if(result?.error){
          setServerError(
            result.error.message
          );
          return;
        }
        toast.success("Logged In Success")

        router.push("/");
    };

  return (
        <div className="mx-auto border p-6 rounded-xl">
        <Form
            className="flex w-96 flex-col gap-4"
            onSubmit={onSubmit}
        >
        <h1 className="text-3xl font-bold">Login</h1>

        <TextField
            isRequired
            name="email"
            type="email"
        >
        <Label>Email</Label>
        <Input placeholder="Enter email" />
        <FieldError/>
        </TextField>

        <TextField
            isRequired
            name="password"
            type="password"
        >
        <Label>Password</Label>
        <Input placeholder="Enter password" />
        <FieldError/>
        </TextField>
        {
        serverError &&
        <p className="text-red-500">
        {serverError}
        </p>
        }

        <Button className={"w-full"} type="submit" variant="primary" >
            <Check/>
            Login
        </Button>
        </Form>

        <p className="text-gray-600 text-center mt-3">Or Continue With</p>

        <GoogleLoginButton></GoogleLoginButton>

        <p className="mt-3 text-center">Do not have an account? <Link className="text-red-500 font-semibold" href={"/register"}>Register</Link></p>

    </div>

   );

};

export default LoginForm;