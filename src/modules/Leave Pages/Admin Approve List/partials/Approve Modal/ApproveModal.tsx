/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../../../../common/Modal/Modal";

import { authKey } from "../../../../../shared/config/constaints";
import { getFromLocalStorage } from "../../../../../shared/Helpers/local_storage";
import { showSwal } from "../../../../../shared/Helpers/SwalShower";
import { Button } from "../../../../../components/ui/button";
import {
  useEditLeaveApplicationMutation,
  useGetSingleLeaveApplicationQuery,
} from "../../../../../redux/features/api/Leave Application/leaveApplication";

const ApproveModal = ({
  id,
  setIsOpen,
  isOpen,
}: {
  id?: string;
  setIsOpen?: any;
  isOpen: boolean;
}) => {
  const token = getFromLocalStorage(authKey);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const [updateStatus, { isLoading }] = useEditLeaveApplicationMutation();
  const { data: singleData, isLoading: singleLoading } =
    useGetSingleLeaveApplicationQuery({
      id,
      token,
    });
  const handleUpdateStatus = async (data: string) => {
    setIsCancelLoading(data === "Rejected" ? true : false);
    const result = await updateStatus({
      fullData: { status: data },
      id,
      token,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setIsOpen(false);
      setIsCancelLoading(false);
    }
  };
  return (
    <Modal
      loading={singleLoading}
      header="Leave Request Details"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="p-5">
        <div className="mt-4">
          <p>
            <strong>Employee Name:</strong> {singleData?.data?.user?.name}
          </p>
          <p>
            <strong>Leave Type:</strong> {singleData?.data?.type}
          </p>
          <p>
            <strong>Reason:</strong> {singleData?.data?.reason}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {singleData?.data?.startDate?.slice(0, 10)}
          </p>
          <p>
            <strong>End Date:</strong> {singleData?.data?.endDate?.slice(0, 10)}
          </p>
          <p>
            <strong>Details:</strong> {singleData?.data?.details}
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            loading={isCancelLoading}
            disabled={singleData?.data?.status === "Rejected"}
            variant={"destructive"}
            onClick={() => handleUpdateStatus("Rejected")}
          >
            Reject
          </Button>
          <Button
            disabled={singleData?.data?.status === "Approved"}
            loading={!isCancelLoading && isLoading}
            onClick={() => handleUpdateStatus("Approved")}
          >
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveModal;
