import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { constructQuery } from "../../../shared/Helpers/constructQuery";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import ErrorShow from "../../../common/Error Show/ErrorShow";
import HeaderWithFilter from "../../../common/HeaderWithFilter/HeaderWithFilter";
import CommonTable from "../../../common/Common Table/CommonTable";
import { dataLayout, headerData } from "./config/constants";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";
import Pagination from "../../../common/widgets/Pagination/Pagination";
import {
  useDeleteBranchMutation,
  useGetBranchesQuery,
} from "../../../redux/features/api/Branches/branches";

const BranchList = () => {
  const user = { role: "admin" };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchParams] = useSearchParams();

  const query = constructQuery({
    searchParams,

    page: currentPage,
    limit,
  });

  const {
    data: branches,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetBranchesQuery({ query });
  const [deleteBranch, { isLoading: deleteLoading }] =
    useDeleteBranchMutation();

  useEffect(() => {
    if (branches?.data) {
      setTotalItems(branches?.meta?.total);
      setLimit(branches?.meta?.limit);
      setCurrentPage(branches?.meta?.page);
    }
  }, [branches]);

  const handleDelete = async (id: string) => {
    const result = await deleteBranch({ id });
    showSwal(result);
  };
  if (isError) {
    return <ErrorShow error={error} />;
  }

  return (
    <div className="page-container">
      <HeaderWithFilter
        name="Branch List"
        link={
          ["admin", "super_admin"].includes(user?.role)
            ? "/branches/branches-create"
            : ""
        }
        btnName="Create Branch"
        isFilter={false}
      />
      <div>
        <CommonTable
          headerData={headerData}
          dataLayout={dataLayout}
          itemData={branches?.data}
          loading={isFetching || isLoading || deleteLoading}
          deleteBtn
          deleteBtnCondition="item?._count?.users > 0"
          deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
          editPageLink={
            ["admin", "super_admin"].includes(user?.role)
              ? "/branches/branches-edit"
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

export default BranchList;
