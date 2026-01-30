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
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";
import {
  useDeleteLateAppearanceMutation,
  useGetLateAppearancesQuery,
} from "../../../redux/features/api/Late Appearance/lateAppearance";

const LateHistory = () => {
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
    data: lateAppearanceData,
    isLoading,
    isError,
    error,
  } = useGetLateAppearancesQuery({ token, query });
  const [deleteLateAppearance, { isLoading: deleteLoading }] =
    useDeleteLateAppearanceMutation();

  useEffect(() => {
    if (lateAppearanceData?.data) {
      setTotalItems(lateAppearanceData?.meta?.total);
      setLimit(lateAppearanceData?.meta?.limit);
      setCurrentPage(lateAppearanceData?.meta?.page);
    }
  }, [lateAppearanceData]);

  const handleDelete = async (id: string) => {
    const result = await deleteLateAppearance({ token, id });
    showSwal(result);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="bg-componentsBackground pt-5  px-5 rounded-md relative">
        <div>
          <HeaderWithFilter
            name="Late Appearance"
            link={
              ["admin", "super_admin"].includes(user?.role)
                ? "/create-late-appearance"
                : ""
            }
            btnName="Create Late Appearance"
            isFilter={false}
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForUser}
              itemData={lateAppearanceData?.data}
              loading={isLoading || deleteLoading}
              deleteBtn
              deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
              editPageLink={
                ["admin", "super_admin"].includes(user?.role)
                  ? "/late-appearance-edit"
                  : ""
              }
              btnLink="/late-application"
              btnValue="PDF"
              labelDeleteCondition={["admin", "super_admin"].includes(
                user?.role
              )}
              labelEditCondition={["admin", "super_admin"].includes(user?.role)}
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
    </div>
  );
};

export default LateHistory;
