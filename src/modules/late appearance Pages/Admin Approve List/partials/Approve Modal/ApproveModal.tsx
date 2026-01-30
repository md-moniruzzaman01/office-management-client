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
    setIsCancelLoading(data === "Cancel" ? true : false);
    const status = data;
    const result = await updateStatus({ status, id, token });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setIsOpen(false);
      setIsCancelLoading(false);
    }
  };
  return (
    <Modal
      loading={singleLoading}
      header="Late Request Details"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="p-5">
        <div className="mt-4">
          <p>
            <strong>Employee Name:</strong> {singleData?.data?.name}
          </p>
          <p>
            <strong>Leave Type:</strong> {singleData?.data?.reason}
          </p>
          <p>
            <strong>Start Date:</strong> {singleData?.data?.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {singleData?.data?.endDate}
          </p>
          <p>
            <strong>Details:</strong> {singleData?.data?.reason}
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            loading={isCancelLoading}
            disabled={singleData?.status === "Cancel"}
            variant={"destructive"}
            onClick={() => handleUpdateStatus("Cancel")}
          >
            Cancel
          </Button>
          <Button
            disabled={singleData?.status === "Approved"}
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
