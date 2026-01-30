/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { NewActivity } from "../config/type";
import { initialFormData } from "../config/constants";
import { X } from "lucide-react";

interface ActivityFormProps {
  formData: NewActivity;
  onInputChange: any;
  onAddActivity: () => void;
  activityId: number | null;
  loading: boolean;
  setActivityId?: any;
  setFormData: any;
}

const ActivityForm: FC<ActivityFormProps> = ({
  formData,
  onInputChange,
  onAddActivity,
  activityId,
  loading,
  setActivityId,
  setFormData,
}) => {
  return (
    <div className="bg-componentsBackground p-5 rounded-lg shadow-md mb-6 w-1/3 max-h-80">
      <div className="flex justify-between items-center mb-4">
        {activityId ? (
          <div
            className={`flex items-center gap-2 ${
              activityId ? "opacity-100 cursor-pointer" : "opacity-0"
            }`}
          >
            <p className="text-lg font-semibold">
              Do you want to edit this activity ?
            </p>
            <X
              onClick={() => {
                setActivityId(null);
                setFormData(initialFormData);
              }}
            />
          </div>
        ) : (
          <h2 className="text-lg font-semibold">Create Activity</h2>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content</label>
        <Input
          type="text"
          name="name"
          value={formData?.name}
          onChange={onInputChange}
          placeholder="Write here..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          name="description"
          value={formData?.description}
          onChange={onInputChange}
          placeholder="Write here..."
        />
      </div>

      <Button
        loading={loading}
        onClick={onAddActivity}
        className="bg-sky-500 hover:bg-sky-600 text-white"
      >
        {activityId ? "Edit Activity" : "Add Activity"}
      </Button>
    </div>
  );
};

export default ActivityForm;
