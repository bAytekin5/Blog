import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteBlogAdd, RouteBlogEdit } from "@/helpMe/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpMe/getEnv";
import { showToast } from "@/helpMe/showToast";
import { deleteData } from "@/helpMe/handleDelete";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import moment from "moment";

const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEvn("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Blog başarıyla silindi");
    } else {
      showToast("error", "İşlem iptal edildi");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="">
            <Button asChild>
              <Link to={RouteBlogAdd}>Blog Ekle</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Yazar</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Başlık</TableHead>
                <TableHead>Bağlantı Adı</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Düzenle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell> {blog?.author?.name} </TableCell>
                    <TableCell> {blog?.category?.name} </TableCell>
                    <TableCell> {blog?.title} </TableCell>
                    <TableCell> {blog?.slug} </TableCell>
                    <TableCell> {moment(blog?.createdAt).format('DD-MM-YYYY')} </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className=" hover:bg-orange-500 hover:text-white"
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(blog._id)}
                        variant="outline"
                        className=" hover:bg-orange-500 hover:text-white"
                      >
                        <FaRegTrashCan />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Veri bulunamadı</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
