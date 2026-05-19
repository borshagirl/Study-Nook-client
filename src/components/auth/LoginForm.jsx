"use client";

import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { signInUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";


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

        <Button type="submit" color="primary" >
            <Check/>
            Login
        </Button>
        </Form>
    </div>

   );

};

export default LoginForm;