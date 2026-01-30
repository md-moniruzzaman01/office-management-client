import React, { useState } from "react";
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
import { DatePicker } from "../../../components/ui/datePicker";

import { showSwal } from "../../../shared/Helpers/SwalShower";
import { useNavigate } from "react-router-dom";
import { useCreateLateAppearanceMutation } from "../../../redux/features/api/Late Appearance/lateAppearance";

const CreateLateAppearance: React.FC = () => {
  const token = getFromLocalStorage(authKey);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);
  const [generateLetter, { isLoading }] = useCreateLateAppearanceMutation();

  // Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const [hour, minute] = formData?.time?.split(":")?.map(Number) || [0, 0];
    const [officeHour, officeMinute] = (formData?.officeTime || "10:00")
      ?.split(":")
      ?.map(Number) || [0, 0];

    const fullData = {
      date: new Date(formData?.date),
      reason: formData?.reason,
      hoursLate: hour > 12 ? hour - 12 : hour,
      minutesLate: minute,
      officeHour: officeHour > 12 ? officeHour - 12 : officeHour,
      officeMinute,
    };

    // Call the function to generate the letter and pass the fullData
    const result = await generateLetter({ fullData, token });

    // Handle the response and navigate if needed
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      navigate("/late-appearance");
    }
  };

  return (
    <div>
      <div>
        {/* Input Form */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Create Late Application
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
                  value={formData[input?.name as keyof typeof formData]}
                />
              ))}

              <div>
                <DatePicker
                  label="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
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

export default CreateLateAppearance;
