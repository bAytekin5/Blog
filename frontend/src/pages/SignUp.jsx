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
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpMe/RouteName";
import { getEvn } from "@/helpMe/getEnv";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpMe/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const SignUp = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(3, "Adınız en az 3 karakter uzunluğunda olmalıdır."),
    email: z.string().email({ message: "Geçerli bir e-mail adresi girin" }),
    password: z
      .string()
      .min(8, "Şifre en az 6 karakter uzunluğunda olmalıdır."),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "Şifre en az 6 karakter uzunluğunda olmalıdır."
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    const apiBaseUrl = getEvn("VITE_API_BASE_URL");
    console.log("API Base URL:", apiBaseUrl);
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Kayıt olun ve başlayın
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad</FormLabel>
                    <FormControl>
                      <Input placeholder="Adınızı giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifrenizi Doğrulayın</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Şifrenizi Doğrulayın (Tekrar)"
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
                Kayıt Ol
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Zaten bir hesabınız var mı?</p>
                <Link
                  to={RouteSignIn}
                  className="text-blue-600 hover:underline"
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
