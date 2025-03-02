import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import slugify from "slugify";
import { getEvn } from "@/helpMe/getEnv";
import { showToast } from "@/helpMe/showToast";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";

const EditCategory = () => {
  const { category_id } = useParams();

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/category/show/${category_id}`,
    {
      method: "get",
      credentials: "include",
    },
    [category_id]
  );

  const formSchema = z.object({
    name: z.string().min(3, "Adınız en az 3 karakter uzunluğunda olmalıdır."),
    slug: z
      .string()
      .min(3, "Bağlantı adı en az 3 karakter uzunluğunda olmalıdır."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");

  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, { lower: true });
      form.setValue("slug", slug);
    }
  }, [categoryName]);



  useEffect(() => {
    if (categoryData) {
      form.setValue("name", categoryData.category.name);
      form.setValue("slug", categoryData.category.slug);
    }
  }, [categoryData]);

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/category/update/${category_id}`,
        {
          method: "put",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <Card className="tp-5 max-w-screen-md mx-auto">
        <CardContent>
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bağlantı Adı</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bağlantı adresinizi giriniz"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Kaydet
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
