import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaCommentDots } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getEvn } from "@/helpMe/getEnv";
import { showToast } from "@/helpMe/showToast";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteSignIn } from "@/helpMe/RouteName";
import CommentList from "./CommentList";

const Comment = ({ props }) => {


  const [newComment, setNewComment] = useState();
  const user = useSelector((state) => state.user);

  const formSchema = z.object({
    comment: z
      .string()
      .min(3, "Yorumunuz en az 3 karakter uzunluğunda olmalıdır."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const newValues = {
        ...values,
        blogid: props.blogid,
        user: user.user._id,
      };
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/comment/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      setNewComment(data.comment);
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        <FaCommentDots className="text-orange-500" /> Yorum
      </h4>

      {user && user.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Düşüncelerinizi paylaşın..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Kaydet</Button>
          </form>
        </Form>
      ) : (
        <Button asChild>
          <Link to={RouteSignIn}>Giriş Yap </Link>
        </Button>
      )}

      <div className="border-t mt-5 pt-5">
        <CommentList props={{ blogid: props.blogid, newComment }} />
      </div>
    </div>
  );
};

export default Comment;
