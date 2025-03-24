import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="min-w-[60%] relative flex items-center border rounded-full bg-primary/10 focus-within:outline-1 w-full">
      <Button
        type="submit"
        size={"sm"}
        variant={"ghost"}
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent cursor-pointer"
      >
        <Search className="size-4" />
        <span className="sr-only">Search Bar</span>
      </Button>
      <Input
        type="text"
        placeholder="Search By Title"
        className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 ml-6 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
