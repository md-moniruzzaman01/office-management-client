import { NavLink, useNavigate } from "react-router-dom";
import Filter from "../Filter/Filter";
import { HeaderWithFilterProps } from "./config/types";
import StatusGroup from "../StatusGroup/StatusGroup";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, X, Plus } from "lucide-react";

const HeaderWithFilter: React.FC<HeaderWithFilterProps> = ({
  name,
  link,
  btnName,
  btnValues,
  isFilter = true,
  isSearch = true,
  status,
}) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (paramValue === "") {
      queryParams.delete(paramName);
      queryParams.delete("searchTerm");
    } else {
      queryParams.set(paramName, paramValue);
    }
    navigate(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    setQuery("searchTerm", route);
    setActiveRoute(route);
  };

  return (
    <div className="space-y-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {name}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your {name.toLowerCase()} here.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {isSearch && (
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={activeRoute}
                onChange={(e) => setActiveRoute(e.target.value)}
                className="pl-9 pr-8"
                onKeyDown={(e) => e.key === 'Enter' && handleFilter(activeRoute)}
              />
              {activeRoute && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-8 hover:bg-transparent"
                  onClick={() => {
                    setActiveRoute("");
                    handleFilter("");
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
              )}
            </div>
          )}

          <div className="flex gap-2 w-full sm:w-auto">
            {link && (
              <NavLink to={`${link}`}>
                <Button className="w-full sm:w-auto gap-2">
                  <Plus className="w-4 h-4" />
                  {btnName}
                </Button>
              </NavLink>
            )}
            {isFilter && <Filter />}
          </div>
        </div>
      </div>

      {btnValues && (
        <div className="pt-2">
          <StatusGroup status={status} btnValues={btnValues} />
        </div>
      )}
    </div>
  );
};

export default HeaderWithFilter;
