import { useState, FC, useEffect } from "react";
import { initialFormData } from "./config/constants";
import ActivityForm from "./partials/ActivityForm";
import ActivityList from "./partials/Activity List/ActivityList";
import {
  useCreateActivityMutation,
  useEditActivityMutation,
  useGetActivitiesQuery,
  useGetSingleActivityQuery,
} from "../../redux/features/api/Activity/activity";
import { showSwal } from "../../shared/Helpers/SwalShower";

const Activities: FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [activityId, setActivityId] = useState(null);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const query = `limit=${limit}`;

  const { data: activitiesData, isLoading: activitiesLoading } =
    useGetActivitiesQuery({ query });
  const [createActivity, { isLoading: createLoading }] =
    useCreateActivityMutation();
  const { data: singleActivityData } = useGetSingleActivityQuery(
    {
      id: activityId,
    },
    { skip: !activityId }
  );
  const [updateActivity, { isLoading: updateLoading }] =
    useEditActivityMutation();

  useEffect(() => {
    if (activitiesData?.data) {
      setTotal(activitiesData?.meta?.total);
    }
  }, [activitiesData]);

  useEffect(() => {
    if (singleActivityData?.data) {
      if (activityId) {
        setFormData({
          name: singleActivityData?.data?.name,
          description: singleActivityData?.data?.description,
        });
      } else {
        setFormData(initialFormData);
      }
    } else {
      setFormData(initialFormData);
    }
  }, [singleActivityData?.data, activityId]);

  const handleAddActivity = async () => {
    if (activityId) {
      const result = await updateActivity({
        fullData: formData,
        id: activityId,
      });
      const isSwalTrue = showSwal(result);
      if (isSwalTrue) {
        setFormData(initialFormData);
        setActivityId(null);
      }
    } else {
      const result = await createActivity({ fullData: formData });
      const isSwalTrue = showSwal(result);
      if (isSwalTrue) {
        setFormData(initialFormData);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1 className="px-5 py-2 shadow-lg rounded-md text-2xl bg-componentsBackground font-bold mb-2">
        Timeline Activity
      </h1>

      <div className="flex flex-row-reverse justify-center gap-5">
        <ActivityForm
          formData={formData}
          activityId={activityId}
          onInputChange={handleChange}
          onAddActivity={handleAddActivity}
          loading={createLoading || updateLoading}
          setFormData={setFormData}
          setActivityId={setActivityId}
        />
        <ActivityList
          loading={activitiesLoading}
          setActivityId={setActivityId}
          activities={activitiesData?.data}
          setLimit={setLimit}
          total={total}
        />
      </div>
    </div>
  );
};

export default Activities;
