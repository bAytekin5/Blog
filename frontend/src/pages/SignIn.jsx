import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignUp } from "@/helpMe/RouteName";
import { showToast } from "@/helpMe/showToast";
import { getEvn } from "@/helpMe/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/logo-white.png";
const SignIn = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email({ message: "Geçerli bir e-mail adresi girin" }),
    password: z
      .string()
      .min(6, { message: "Şifre en az 6 karakter uzunluğunda olmalıdır." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/login`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <div className="flex justify-center items-center mb-2">
             <Link to={RouteIndex}>
             <img src= {logo} />
        </Link>
        </div>
     
        <h1 className="text-2xl font-bold text-center mb-5">
          Hesaba Giriş Yap
        </h1>

        <div className=""> 
            <GoogleLogin />
            <div className="border my-5 flex justify-center items-center">
               <span className="absolute bg-white text-sm">Ya da</span>
            </div>
           </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-mail adresinizi giriniz"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifrenizi giriniz"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Giriş Yap
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Hesabınız yok mu?</p>
                <Link
                  to={RouteSignUp}
                  className="text-blue-600 hover:underline"
                >
                  Kayıt Ol
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
