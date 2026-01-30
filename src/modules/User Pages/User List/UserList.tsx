import { useEffect, useState } from "react";
import { authKey } from "../../../shared/config/constaints";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { useSearchParams } from "react-router-dom";
import { constructQuery } from "../../../shared/Helpers/constructQuery";
import {
  btnValues,
  headerForUser,
  keys,
  tableLayout,
} from "./config/constants";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../redux/features/api/Users/user";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import ErrorShow from "../../../common/Error Show/ErrorShow";
import HeaderWithFilter from "../../../common/HeaderWithFilter/HeaderWithFilter";
import CommonTable from "../../../common/Common Table/CommonTable";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";
import Pagination from "../../../common/widgets/Pagination/Pagination";

const UserList = () => {
  const user = { role: "admin" };
  const token = getFromLocalStorage(authKey);
  // const user: any = getUser();

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
    data: usersData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetUsersQuery({ token, query });

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  useEffect(() => {
    if (usersData?.data) {
      setTotalItems(usersData?.meta?.total);
      setLimit(usersData?.meta?.limit);
      setCurrentPage(usersData?.meta?.page);
    }
  }, [usersData]);

  const handleDelete = async (id: string) => {
    const result = await deleteUser({ token, id });
    showSwal(result);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div className="page-container">
      <HeaderWithFilter
        btnValues={btnValues}
        name="User List"
        link={
          ["admin", "super_admin"].includes(user?.role)
            ? "/users/user-create"
            : ""
        }
        btnName="Create User"
        isFilter={false}
        status="role"
      />
      <div>
        <CommonTable
          dataLayout={tableLayout}
          headerData={headerForUser}
          itemData={usersData?.data}
          loading={isLoading || isFetching || deleteLoading}
          deleteBtn
          deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
          editPageLink={
            ["admin", "super_admin"].includes(user?.role)
              ? "/users/user-edit"
              : ""
          }
          link="/user-details"
          btnValue="PDF"
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

export default UserList;
