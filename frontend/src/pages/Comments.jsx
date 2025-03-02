import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpMe/RouteName";
import React, { useState } from "react";
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
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpMe/getEnv";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteData } from "@/helpMe/handleDelete";
import { showToast } from "@/helpMe/showToast";

const Comments = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading, error } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEvn("VITE_API_BASE_URL")}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Kategori başarıyla silindi");
    } else {
      showToast("error", "İşlem iptal edildi");
    }
  };
  if (loading) return <Loading />;

  return (
    <div className="">
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Yorumlayan</TableHead>
                <TableHead>Yorum</TableHead>
                <TableHead>Sil</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        onClick={() => handleDelete(comment._id)}
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

export default Comments;
