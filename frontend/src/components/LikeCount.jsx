import { getEvn } from "@/helpMe/getEnv";
import { showToast } from "@/helpMe/showToast";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "./Loading";
const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const user = useSelector((state) => state.user);

  const { data: blogLikeCount, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`, {
    method: 'get',
    credentials: 'include',
})
  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likecount);
      setHasLiked(blogLikeCount.isUserLiked);
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast("error", "Lütfen hesabınıza giriş yapın.");
      }

      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/blog-like/like`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ user: user.user._id, blogid: props.blogid }),
        }
      );

      if (!response.ok) {
        showToast("error", response.statusText);
      }
      const responseData = await response.json();
      setLikeCount(responseData.likecount);
      setHasLiked(!hasLiked);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center gap-1"
    >
      {!hasLiked ? <FaRegHeart /> : <FaHeart fill="red" />}

      {likeCount}
    </button>
  );
};

export default LikeCount;
