import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { initialData, inputs } from "./config/constants";
import {
  useEditBranchMutation,
  useGetSingleBranchQuery,
} from "../../../redux/features/api/Branches/branches";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Input } from "../../../components/ui/input";

import { Button } from "../../../components/ui/button";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";

const BranchEdit = () => {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const { id } = useParams();
  const [editBranch, { isLoading }] = useEditBranchMutation();
  const { data: singleData, isLoading: singleLoading } =
    useGetSingleBranchQuery({ id });

  useEffect(() => {
    if (singleData) {
      setFormData({
        name: singleData?.data?.name,
        address: singleData?.data?.address,
      });
    }
  }, [singleData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editBranch({
      fullData: formData,
      id,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      navigate("/branches");
    }
  };

  if (singleLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="px-5">
        <CardHeader>
          <CardTitle>Create Branch</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-5">
          {inputs?.map((input, index) => (
            <div className="space-y-2" key={index}>
              <Input
                label={input.label}
                name={input?.name}
                placeholder={input?.placeholder}
                value={formData[input?.name as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <Button type="submit" loading={isLoading} className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BranchEdit;
