import { getEvn } from "@/helpMe/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpMe/RouteName";

const RelatedBlog = ({ props }) => {
  const { data, loading, err } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${
      props.currentBlog
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (loading) return <Loading />;
  return (
    <div>
      <h2 className="text-2xl font-bold  mb-4">Benzer Yazılar</h2>
      <div>
        {data && data.relatedBlog.length > 0 ? (
          data.relatedBlog.map((blog) => {
            return (
              <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    className="w-[100px] h-[75px] object-cover rounded-md "
                    src={blog.featuredImage}
                  />
                  <h4 className="line-clamp-2 text-lg font-semibold">
                    {blog.title}
                  </h4>
                </div>
              </Link>
            );
          })
        ) : (
          <div>Benzer Yazı Bulunamadı!</div>
        )}
      </div>
    </div>
  );
};

export default RelatedBlog;
