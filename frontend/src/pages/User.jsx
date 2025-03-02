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
import usericon from "@/assets/user.png"
import moment from "moment";
const User = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading, error } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/user/get-all-user`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEvn("VITE_API_BASE_URL")}/user/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Kategori başarıyla silindi");
    } else {
      showToast("error", "İşlem iptal edildi");
    }
  };

  console.log(data);
  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Yetki</TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Profil Resmi</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Sil</TableHead>


              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <img src={user.avatar || usericon} className="w-20" />
                    </TableCell>
                    <TableCell>{moment(user.createdAt).format("DD-MM-YYYY")}</TableCell>

                    <TableCell className="flex gap-2">
                      <Button
                        onClick={() => handleDelete(user._id)}
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

export default User;
