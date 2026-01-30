import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Search, X } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";

const NavSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  useEffect(() => {
    // Focus the input when search becomes visible
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`?searchTerm=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    navigate(location.pathname);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      {!isSearchVisible && (
        <button
          type="button"
          onClick={toggleSearchVisibility}
          className=" transition ease-in-out duration-300"
        >
          <Search size={20} />
        </button>
      )}

      {isSearchVisible && (
        <form
          onSubmit={handleSearch}
          className="w-full flex items-center gap-2 transition-all ease-in-out duration-300"
        >
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 " />
            <Input
              ref={inputRef} // Attach the ref to the input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="!pl-9 !pr-9 rounded-md p-2 transition-all ease-in-out duration-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2   transition ease-in-out duration-300"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <Button
            type="submit"
            variant="outline"
            className="transition ease-in-out duration-300"
          >
            Search
          </Button>
          <button
            type="button"
            onClick={toggleSearchVisibility}
            className="text-gray-400 hover:text-gray-600 transition ease-in-out duration-300"
          >
            <X size={20} />
          </button>
        </form>
      )}
    </div>
  );
};

export default NavSearch;
