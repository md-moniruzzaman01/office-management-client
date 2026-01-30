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
import { useGetUsersQuery } from "../../../redux/features/api/Users/user";

const AdminApproveList = () => {
  const token = getFromLocalStorage(authKey);
  // const user: any = getUser();

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
  } = useGetUsersQuery({ token, query });

  // const singleData = leaveData?.data?.find((item: any) => item.id === id);

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

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="bg-componentsBackground pt-5  px-5 rounded-md relative">
        <div>
          <HeaderWithFilter name="Admin Approval List" isFilter={false} />
        </div>
        <div>
          <div>
            <CommonTable
              loading={isLoading}
              dataLayout={tableLayout}
              headerData={headerForUser}
              itemData={leaveData?.data}
              modalFunction={(id: string) => handleOpenModal(id)}
              btnLink="/leave-letter"
              btnValue="PDF"
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
