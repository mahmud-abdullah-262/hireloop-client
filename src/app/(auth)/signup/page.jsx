"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from '@heroui/react';
import {Check, Eye, EyeClosed} from "@gravity-ui/icons";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useRouter } from "next/navigation";


import React from 'react';
import { authClient } from '@/lib/auth-client';
// import { Router } from 'next/router';

const SignUpPage = () => {
  const router = useRouter(); 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
 
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);


   const onSubmit = async (data) => {
  setAuthError("");
  setLoading(true);
    console.log(data);

  try {
    const { error } = await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.photo || undefined,
      },
      {
        onSuccess: () => {
          toast.success("You have successfully signed up!", {
            description: "You can continue learning with MediQueue.",
            actionProps: {
              children: "Home",
              className: "bg-success text-success-foreground",
            },
          });

          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          const message = ctx?.error?.message || "Signup failed";

          setAuthError(message);
          toast.warning("Signup Failed!", {
            description: message,
            actionProps: {
              children: "Retry",
              className: "bg-warning text-warning-foreground",
            },
          });
        },
      }
    );

    if (error) {
      const message = error.message || "Signup failed";
      setAuthError(message);
      toast.warning("Signup Failed!", {
        description: message,
      });
      return;
    }
  } finally {
    setLoading(false);
  }
};



  return (
   <div className="flex justify-center items-center mt-4">
    <Form
      className="flex w-96 flex-col gap-4 p-16 rounded-2xl shadow-xl border"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={handleSubmit(onSubmit)}
    >


     <TextField
        isRequired
        name="name"
        type="text"
        {...register('name')}
       
      >
        <Label>Name</Label>
        <Input placeholder="enter your name here" />
        <FieldError />
      </TextField>

  <TextField
        isRequired
        name="photo"
        type="text"
        {...register('photo')}
       
      >
        <Label>Photo URL</Label>
        <Input placeholder="enter your photo URL here" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="email"
        type="email"
        {...register('email')}
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
       <div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className="pr-18" 
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
  >
    {showPassword ? <EyeClosed/> : <Eye/>}
  </button>
</div>
        
       
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      
    </Form>
   </div>
  );
};

export default SignUpPage;



