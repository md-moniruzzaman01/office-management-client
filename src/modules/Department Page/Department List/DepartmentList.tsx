import { useEffect, useState } from "react";
import CommonTable from "../../../common/Common Table/CommonTable";
import ErrorShow from "../../../common/Error Show/ErrorShow";
import HeaderWithFilter from "../../../common/HeaderWithFilter/HeaderWithFilter";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "../../../redux/features/api/Departments/department";
import { dataLayout, headerData, keys } from "./config/constants";
import { useSearchParams } from "react-router-dom";
import { constructQuery } from "../../../shared/Helpers/constructQuery";
import Pagination from "../../../common/widgets/Pagination/Pagination";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";

const DepartmentList = () => {
  const user = { role: "admin" };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchParams] = useSearchParams();

  const query = constructQuery({
    searchParams,
    keys,
    page: currentPage,
    limit,
  });

  const {
    data: departments,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetDepartmentsQuery({ query });

  const [deleteDepartment, { isLoading: deleteLoading }] =
    useDeleteDepartmentMutation();

  useEffect(() => {
    if (departments?.data) {
      setTotalItems(departments?.meta?.total);
      setLimit(departments?.meta?.limit);
      setCurrentPage(departments?.meta?.page);
    }
  }, [departments]);

  const handleDelete = async (id: string) => {
    const result = await deleteDepartment({ id });
    showSwal(result);
  };
  if (isError) {
    return <ErrorShow error={error} />;
  }

  return (
    <div className="page-container">
      <HeaderWithFilter
        name="Department List"
        link={
          ["admin", "super_admin"].includes(user?.role)
            ? "/departments/department-create"
            : ""
        }
        btnName="Create Department"
        isFilter={false}
      />
      <div>
        <CommonTable
          headerData={headerData}
          dataLayout={dataLayout}
          itemData={departments?.data}
          loading={isLoading || isFetching || deleteLoading}
          deleteBtn
          deleteBtnCondition="item?._count?.users > 0"
          deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
          editPageLink={
            ["admin", "super_admin"].includes(user?.role)
              ? "/departments/department-edit"
              : ""
          }
          labelDeleteCondition={["admin", "super_admin"].includes(
            user?.role
          )}
          labelEditCondition={["admin", "super_admin"].includes(user?.role)}
        />
        <div className="pt-5">
          <Pagination
            currentPage={currentPage}
            limit={limit}
            setCurrentPage={setCurrentPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
};
export default DepartmentList;
