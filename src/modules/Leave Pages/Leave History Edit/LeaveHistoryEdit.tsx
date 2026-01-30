/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";
import { initialData, leaveTypes, reasons } from "./config/constant";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey } from "../../../shared/config/constaints";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditLeaveApplicationMutation,
  useGetSingleLeaveApplicationQuery,
} from "../../../redux/features/api/Leave Application/leaveApplication";
import { getUser } from "../../../shared/Helpers/jwt";
import { useGetSingleUserQuery } from "../../../redux/features/api/Users/user";
import { Input } from "../../../components/ui/input";

interface Option {
  label: string;
  value: string;
}

const LeaveHistoryEdit: React.FC = () => {
  const token = getFromLocalStorage(authKey);
  const user: any = getUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const [reason, setReason] = useState<Option | null>(null);
  const [leaveType, setLeaveType] = useState<Option | null>(null);
  const [formData, setFormData] = useState(initialData);
  const [editLeaveApplication, { isLoading }] =
    useEditLeaveApplicationMutation();

  const [daysAbsent, setDaysAbsent] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: singleUser } = useGetSingleUserQuery({ id: user?.id });
  const { data: singleLeaveData } = useGetSingleLeaveApplicationQuery({ id });

  useEffect(() => {
    if (singleLeaveData) {
      const { startDate, endDate, reason, type, details } =
        singleLeaveData.data;
      setFormData({
        startDate: startDate
          ? new Date(startDate).toISOString().split("T")[0]
          : "",
        endDate: endDate ? new Date(endDate).toISOString().split("T")[0] : "",
        details: details,
      });
      setReason({ label: reason, value: reason });
      setLeaveType({ label: type, value: type });
    }
  }, [singleLeaveData]);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Calculate Days Absent
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const difference = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
      setDaysAbsent(difference + 1);
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async () => {
    const fullData = {
      details: formData?.details,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      reason: reason?.label || "",
      type: leaveType?.label || "",
      leaveDays: daysAbsent,
    };
    const result = await editLeaveApplication({ fullData, token, id });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      navigate("/leave-history");
    }
  };

  return (
    <div>
      <div className="p-5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Generate Leave Letter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input
                  type="date"
                  label="Start Date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="date"
                  label="End Date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <SearchSelect
                  label="Type"
                  setOption={setLeaveType}
                  options={leaveTypes}
                  defaultValue={
                    typeof leaveType === "string" ? leaveType : leaveType?.value
                  }
                />
              </div>
              <div>
                <SearchSelect
                  label="Reason"
                  setOption={setReason}
                  options={reasons}
                  defaultValue={
                    typeof reason === "string" ? reason : reason?.value
                  }
                />
              </div>

              {/* Details */}
              <div className="col-span-2">
                <Textarea
                  label="Details"
                  name="details"
                  placeholder="Write in details"
                  value={formData?.details}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button loading={isLoading} onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card
          ref={contentRef}
          className="border p-4 rounded shadow-sm h-full"
          style={{
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <CardContent className="mt-10">
            <div className="max-w-[210mm] mx-auto p-6">
              <p className="text-sm text-gray-600">
                Date: {new Date().toLocaleDateString()}
              </p>

              <p className="mt-4 font-semibold">To,</p>
              <p className="text-gray-800">The Manager</p>
              <p className="font-semibold text-gray-900">
                {singleUser?.data?.details?.branch?.name || "Office Name"}
              </p>

              <p className="mt-4 font-semibold underline">
                Subject: Application for Leave Request
              </p>

              <p className="mt-4">
                Dear{" "}
                {singleUser?.data?.details?.department?.supervisor?.name ||
                  "Supervisor Name"}
                ,
              </p>

              <p className="mt-4 text-gray-800 leading-relaxed">
                {new Date(formData.startDate) > new Date() ? (
                  <>
                    I am writing to formally request leave for{" "}
                    <span className="font-semibold">{daysAbsent} days</span>,
                    starting from{" "}
                    <span className="italic">
                      {formData.startDate || "Start Date"}
                    </span>{" "}
                    to
                    <span className="italic">
                      {" "}
                      {formData.endDate || "End Date"}
                    </span>
                    , due to
                    <span className="italic"> {reason?.label || "Reason"}</span>
                    .<br />I hope this request can be considered and approved at
                    the earliest.
                  </>
                ) : (
                  <>
                    I am writing to formally inform you that I was absent from
                    work for the past
                    <span className="font-semibold">
                      {" "}
                      {daysAbsent} days
                    </span>{" "}
                    (from
                    <span className="italic">
                      {" "}
                      {formData.startDate || "Start Date"}
                    </span>{" "}
                    to
                    <span className="italic">
                      {" "}
                      {formData.endDate || "End Date"}
                    </span>
                    ) due to
                    <span className="italic">
                      {" "}
                      {reason?.label || "Reason for Absence"}
                    </span>
                    .<br />I apologize for any inconvenience caused by my
                    absence during this period.
                  </>
                )}
              </p>

              <p className="mt-6 font-semibold">Sincerely,</p>
              <p className="text-gray-800">
                {singleUser?.data?.details?.name || "Your Name"}
              </p>
              <p className="text-gray-700">
                {singleUser?.data?.details?.designation || "Your Designation"}
              </p>
              <p className="text-gray-600">
                {singleUser?.data?.details?.department?.name ||
                  "Your Department"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaveHistoryEdit;
