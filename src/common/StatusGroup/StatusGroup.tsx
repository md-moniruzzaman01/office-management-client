import { useEffect, useState } from "react";
import { TableStatusProps } from "./config/types";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../Button";

const TableStatus: React.FC<TableStatusProps> = ({
  btnValues,
  status = "status",
}) => {
  const [activeRoute, setActiveRoute] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const repairStatus = searchParams.get(status);
    setActiveRoute(repairStatus || "");
  }, [searchParams, status]);

  const setQuery = (paramName: string, paramValue: string) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    if (paramValue === "") {
      queryParams.delete("sort");
      queryParams.delete(status);
      queryParams.delete("status");
      queryParams.delete("branch");
      queryParams.delete("searchTerm");
      queryParams.delete("start_Date");
      queryParams.delete("end_Date");
    } else {
      queryParams.set(paramName, paramValue);
    }

    navigate(`?${queryParams.toString()}`);
  };

  const handleFilter = (route: string) => {
    if (status) {
      setQuery(status, route);
    }
    setActiveRoute(route);
  };

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {btnValues?.length > 0 && (
          <Button
            status
            className={`${activeRoute === "" ? "!bg-tableHeader" : ""} !py-1`}
            onClick={() => handleFilter("")}
          >
            All
          </Button>
        )}
        {btnValues?.map((btnValue, index) => (
          <Button
            key={index}
            status
            className={`uppercase ${
              activeRoute === `${btnValue?.value}` ? "!bg-tableHeader" : ""
            } !py-1`}
            onClick={() => handleFilter(btnValue?.value ?? "")}
          >
            {btnValue?.label !== undefined && btnValue?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TableStatus;
