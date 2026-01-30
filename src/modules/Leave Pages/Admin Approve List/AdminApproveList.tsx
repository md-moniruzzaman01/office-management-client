/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonTable from "../../../common/Common Table/CommonTable";
import HeaderWithFilter from "../../../common/HeaderWithFilter/HeaderWithFilter";

import { authKey } from "../../../shared/config/constaints";

import { headerForUser, keys, tableLayout } from "./config/constants";

import Pagination from "../../../common/widgets/Pagination/Pagination";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { useEffect, useState } from "react";
import { constructQuery } from "../../../shared/Helpers/constructQuery";
import ErrorShow from "../../../common/Error Show/ErrorShow";
import { useSearchParams } from "react-router-dom";

import ApproveModal from "./partials/Approve Modal/ApproveModal";
import {
  useDeleteLeaveApplicationMutation,
  useGetLeaveApplicationsQuery,
} from "../../../redux/features/api/Leave Application/leaveApplication";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { getUser } from "../../../shared/Helpers/jwt";

const AdminApproveList = () => {
  const token = getFromLocalStorage(authKey);
  const user: any = getUser();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const [searchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const query = constructQuery({
    searchParams,
    keys,
    page: currentPage,
    limit,
  });
  const {
    data: leaveData,
    isLoading,
    isError,
    error,
  } = useGetLeaveApplicationsQuery({ token, query });

  const [deleteLateAppearance, { isLoading: deleteLoading }] =
    useDeleteLeaveApplicationMutation();

  useEffect(() => {
    if (leaveData?.data) {
      setTotalItems(leaveData?.meta?.total);
      setLimit(leaveData?.meta?.limit);
      setCurrentPage(leaveData?.meta?.page);
    }
  }, [leaveData]);

  const handleOpenModal = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteLateAppearance({ token, id });
    showSwal(result);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="bg-componentsBackground shadow-md pt-5  px-5 rounded-md relative">
        <div>
          <HeaderWithFilter name="Admin Approval List" isFilter={false} />
        </div>
        <div>
          <div>
            <CommonTable
              loading={isLoading || deleteLoading}
              dataLayout={tableLayout}
              headerData={headerForUser}
              itemData={leaveData?.data}
              modalFunction={(id: string) => handleOpenModal(id)}
              btnLink="/leave-letter"
              btnValue="PDF"
              deleteBtn
              deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
              editPageLink={
                ["admin", "super_admin"].includes(user?.role)
                  ? "/leave-history-edit"
                  : ""
              }
            />
            <div className="absolute bottom-5  left-5 right-5">
              <Pagination
                currentPage={currentPage}
                limit={limit}
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>
      </div>
      <ApproveModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
    </div>
  );
};

export default AdminApproveList;
