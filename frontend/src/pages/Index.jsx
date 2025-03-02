import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEvn } from "@/helpMe/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const Index = () => {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEvn("VITE_API_BASE_URL")}/blog/blogs`, {
    method: "GET",
    credentials: "include",
  });

  if (loading) return <Loading />;
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {blogData && blogData.blog.length > 0 ? (
        blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
      ) : (
        <div>Veri bulunamdı</div>
      )}
    </div>
  );
};

export default Index;
