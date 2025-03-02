import { getEvn } from '@/helpMe/getEnv';
import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaRegComment } from "react-icons/fa";
const CommentCount = ({ props }) => {
     const { data, loading, err } = useFetch(
        `${getEvn("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
        {
          method: "get",
          credentials: "include",
        }, 
      );

      if(loading) return <div>Yükleniyor...</div>
  return (
    <button type='button' className='flex justify-between items-center gap-1'>
        <FaRegComment  />
        {data && data.commentCount}
    </button>
  )
}

export default CommentCount