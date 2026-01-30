import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { initialData, inputs } from "./config/constant";
import { getFromLocalStorage } from "../../../shared/Helpers/local_storage";
import { authKey } from "../../../shared/config/constaints";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditLateAppearanceMutation,
  useGetSingleLateAppearanceQuery,
} from "../../../redux/features/api/Late Appearance/lateAppearance";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";

const LateAppearanceEdit: React.FC = () => {
  const { id } = useParams();
  const token = getFromLocalStorage(authKey);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const [editLateAppearance, { isLoading }] = useEditLateAppearanceMutation();
  const { data: singleData, isLoading: singleLoading } =
    useGetSingleLateAppearanceQuery({
      token,
      id,
    });

  useEffect(() => {
    if (singleData) {
      setFormData({
        date: singleData?.data?.date
          ? new Date(singleData?.data?.date).toISOString().split("T")[0]
          : "",
        reason: singleData?.data?.reason || "",
        time: `${String(singleData?.data?.hoursLate)?.padStart(
          2,
          "0"
        )}:${String(singleData?.data?.minutesLate)?.padStart(2, "0")}`,
        officeTime: `${String(singleData?.data?.officeHour)?.padStart(
          2,
          "0"
        )}:${String(singleData?.data?.officeMinute)?.padStart(2, "0")}`,
      });
    }
  }, [singleData]);

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const [hour, minute] = formData?.time?.split(":")?.map(Number) || [0, 0];
    const [officeHour, officeMinute] = formData?.officeTime
      ?.split(":")
      ?.map(Number) || [0, 0];

    const fullData = {
      date: new Date(formData?.date),
      reason: formData?.reason,
      hoursLate: hour > 12 ? hour - 12 : hour,
      minutesLate: minute,
      officeHour: officeHour > 12 ? officeHour - 12 : officeHour,
      officeMinute: officeMinute,
    };

    const result = await editLateAppearance({ fullData, token, id });

    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      navigate("/late-appearance");
    }
  };

  if (singleLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div>
      <div>
        {/* Input Form */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Late Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {inputs?.map((input, index) => (
                <Input
                  key={index}
                  label={input?.label}
                  name={input?.name}
                  placeholder={input?.placeholder}
                  type={input?.type}
                  onChange={handleChange}
                  defaultValue={formData[input?.name as keyof typeof formData]}
                />
              ))}
            </div>
            <Button loading={isLoading} onClick={handleSubmit}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LateAppearanceEdit;
