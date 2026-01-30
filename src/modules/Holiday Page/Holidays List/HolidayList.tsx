import { useEffect, useState } from "react";
import CommonTable from "../../../common/Common Table/CommonTable";
import ErrorShow from "../../../common/Error Show/ErrorShow";
import HeaderWithFilter from "../../../common/HeaderWithFilter/HeaderWithFilter";
import {
  useDeleteHolidayMutation,
  useGetHolidaysQuery,
} from "../../../redux/features/api/Holidays/holidays";
import { dataLayout, headerData } from "./config/constants";
import { useSearchParams } from "react-router-dom";
import { constructQuery } from "../../../shared/Helpers/constructQuery";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { WarningSwal } from "../../../shared/Helpers/warningSwal";
import Pagination from "../../../common/widgets/Pagination/Pagination";

const HolidayList = () => {
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
    data: holidays,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetHolidaysQuery({ query });

  const [deleteHoliday, { isLoading: deleteLoading }] =
    useDeleteHolidayMutation();

  useEffect(() => {
    if (holidays?.data) {
      setTotalItems(holidays?.meta?.total);
      setLimit(holidays?.meta?.limit);
      setCurrentPage(holidays?.meta?.page);
    }
  }, [holidays]);

  const handleDelete = async (id: string) => {
    const result = await deleteHoliday({ id });
    showSwal(result);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }

  return (
    <div className="bg-componentsBackground pt-5  overflow-y-auto px-5 rounded-md relative">
      <div>
        <HeaderWithFilter
          name="Holidays 🎉"
          isFilter={false}
          btnName="Create Holiday"
          link="/holidays/holiday-create"
        />
      </div>
      <div>
        <div>
          <CommonTable
            loading={isLoading || isFetching || deleteLoading}
            headerData={headerData}
            dataLayout={dataLayout}
            itemData={holidays?.data}
            deleteBtn
            deleteBtnCondition="item?._count?.users > 0"
            deleteFn={(id: string) => WarningSwal({ handleDelete, id })}
            editPageLink={
              ["admin", "super_admin"].includes(user?.role)
                ? "/holidays/holiday-edit"
                : ""
            }
            labelDeleteCondition={["admin", "super_admin"].includes(user?.role)}
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
  );
};
export default HolidayList;
