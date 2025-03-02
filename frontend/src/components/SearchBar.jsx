import React, { useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helpMe/RouteName";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        placeholder="Ara..."
        className="h-9 rounded-full bg-gray-50"
      />
    </form>
  );
};

export default SearchBar;
