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

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEvn("VITE_API_BASE_URL")}/category/delete/${id}`
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
    <div>
      <Card>
        <CardHeader>
          <div className="">
            <Button asChild>
              <Link to={RouteAddCategory}>Kategori Ekle</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Bağlantı Adı</TableHead>
                <TableHead>Düzenle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.category.length > 0 ? (
                categoryData.category.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell> {category.name} </TableCell>
                    <TableCell> {category.slug} </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className=" hover:bg-orange-500 hover:text-white"
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FiEdit />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleDelete(category._id)}
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

export default CategoryDetails;
