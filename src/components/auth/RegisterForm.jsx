"use client";

import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

import { signUpUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {

  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const image = formData.get("imageUrl");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signUpUser({
        name,
        email,
        password,
        image
    });
    // console.log("REGISTER RESULT:", result);

    if (result?.error) {
      setServerError(
        result.error.message
      );
      return;
    }
    toast.success("Register Successfully")

    router.push("/login");
  };

  return (

    <div className="mx-auto border p-6 rounded-xl">

      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl font-bold">Register</h1>

        <TextField
          isRequired
          name="name"
          type="text"
        >
          <Label>Name</Label>
          <Input placeholder="Enter Your Name" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="imageUrl"
          type="url"
        >
          <Label>Image URL</Label>
          <Input placeholder="Enter image URL" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="Enter Your Email" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Need at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Need at least one lowercase letter";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Minimum 6 characters, 1 uppercase & 1 lowercase
          </Description>
          <FieldError />
        </TextField>
        {
          serverError && (
            <p className="text-red-500 text-sm">
              {serverError}
            </p>
          )
        }
        <div className="flex gap-2">
          <Button
            type="submit"
            color="primary"
          >
            <Check />
            Register
          </Button>
          <Button
            type="reset"
            variant="bordered"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;