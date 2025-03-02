import React, { useState } from "react";
import logo from "@/assets/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpMe/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "../assets/user.png";
import { getEvn } from "@/helpMe/getEnv";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { LuCirclePlus } from "react-icons/lu";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpMe/showToast";
import { IoSearchOutline } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { useSidebar } from "./ui/sidebar";
const Topbar = () => {
  const { toggleSidebar } = useSidebar();
  const [showSearch, setShowSearch] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEvn("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispath(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex justify-center items-center gap-2">
        <button onClick={toggleSidebar} className="md:hidden" type="button">
          <IoMenuSharp />
        </button>

        <Link to="">
          <img src={logo} className="md:w-auto w-44" />
        </Link>
      </div>

      <div className="w-[500px]">
        <div
          className={`md:relative md:block  absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block "
        >
          <IoSearchOutline size={25} />
        </button>

        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin />
              Giriş Yap
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-sm"> {user?.user?.email} </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Hesabım
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <LuCirclePlus />
                  Yeni Blog Oluştur
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <Button
                  variant="outline"
                  className="w-full text-start cursor-pointer hover:bg-orange-500 hover:text-white"
                >
                  <MdLogout />
                  Çıkış Yap
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
<MdLogin />;
