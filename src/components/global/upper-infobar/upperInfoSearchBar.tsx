import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-primary/10 relative flex w-full min-w-[60%] items-center rounded-full border focus-within:outline-1">
      <Button
        type="submit"
        size={"sm"}
        variant={"ghost"}
        className="absolute left-0 h-full cursor-pointer rounded-l-none bg-transparent hover:bg-transparent"
      >
        <Search className="size-4" />
        <span className="sr-only">Search Bar</span>
      </Button>
      <Input
        type="text"
        placeholder="Search By Title"
        className="ml-6 flex-grow border-none bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchBar;
