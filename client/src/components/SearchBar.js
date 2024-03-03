import React, { useState } from "react";
import { InputGroup, Input, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup size="md" height="2rem" width="20rem">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <InputRightElement width="3rem">
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          size="sm"
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
