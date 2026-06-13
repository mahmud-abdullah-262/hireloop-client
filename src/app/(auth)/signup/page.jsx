"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from '@heroui/react';
import { Radio, RadioGroup} from "@heroui/react";
import {Check, Eye, EyeClosed} from "@gravity-ui/icons";
import Link from 'next/link';
import { useState } from 'react';

import { useRouter, useSearchParams } from "next/navigation";


import React from 'react';
import { authClient, signUp } from '@/lib/auth-client';


const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()
  const redirectTO = searchParams.get('redirect') || '/'
  // console.log(redirectTO, 'redirect data')
  const plan = role == 'seeker' ? 'seeker_free' : 'recruiter_free'
  const onSubmit = async (e) => {
    // console.log(name, email, password, photo, role, 'from user input data')
    e.preventDefault();
    setAuthError("");
    setLoading(true);
   

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        role,
        plan
      });

      if (authError) {
        setAuthError(authError.message);
        toast.warning("Signup Failed!", {
          description: authError.message, // ✅ 'message' → 'authError.message'
          actionProps: {
            children: "Retry",
            className: "bg-warning text-warning-foreground",
          },
        });
        return;
      } else {
        toast.success("You have successfully signed up!", {
          description: "You can continue learning with MediQueue.",
          actionProps: {
            children: "Home",
            className: "bg-success text-success-foreground",
          },
        });
        router.push(redirectTO);
        return;
      }
    } catch (err) {             
      console.error(err);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);        
    }
  };



  return (
   <div className="flex justify-center items-center mt-4">
    <Form
      className="flex w-96 flex-col gap-4 p-16 rounded-2xl shadow-xl border"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >


     <TextField
        isRequired
        name="name"
        type="text"
        onChange={setName}
       
      >
        <Label>Name</Label>
        <Input placeholder="enter your name here" />
        <FieldError />
      </TextField>

  <TextField
        isRequired
        name="photo"
        type="text"
        onChange={setPhoto}
       
      >
        <Label>Photo URL</Label>
        <Input placeholder="enter your photo URL here" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="email"
        type="email"
        onChange={setEmail}
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


<div className="flex flex-col gap-4">
      <Label>Role</Label>
        
      

      <RadioGroup 
      defaultValue="seeker" 
      name="role" 
      onChange={value => setRole(value)} 
      orientation="horizontal">

        <Radio value="seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Job Seeker</Label>
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>
          </Radio.Content>
        </Radio>
       
      </RadioGroup>
    </div>


      <TextField
        isRequired
        minLength={8}
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={setPassword}
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
      <p className='text-xs text-center'>Already have Account? <Link className='text-blue-400' href={`/signin?redirect=${redirectTO}`}>Login</Link></p>
    </Form>
   </div>
  );
};


export default SignUpPage;



