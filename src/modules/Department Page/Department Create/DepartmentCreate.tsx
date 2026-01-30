import { useState } from "react";
import { useGetUsersQuery } from "../../../redux/features/api/Users/user";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { initialData, inputs } from "./config/constants";
import { useGetBranchesQuery } from "../../../redux/features/api/Branches/branches";
import { useCreateDepartmentMutation } from "../../../redux/features/api/Departments/department";
import { useNavigate } from "react-router-dom";
import { User } from "../../../shared/config/types";

const DepartmentCreate: React.FC = () => {
  const [formData, setFormData] = useState(initialData);

  const [supervisor, setSupervisor] = useState<{ value: string } | null>(null);
  const [branch, setBranch] = useState<{ value: string } | null>(null);

  const navigate = useNavigate();

  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
  const { data: branches } = useGetBranchesQuery({});
  const { data: users } = useGetUsersQuery({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fullData = {
    ...formData,
    branchId: branch?.value,
    supervisorId: supervisor?.value,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createDepartment({
      fullData,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      setSupervisor(null);
      setBranch(null);
      navigate("/departments");
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit} className="px-5">
        <CardHeader>
          <CardTitle>Create Department</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <SearchSelect
              label="Branches"
              options={branches?.data?.map(
                (department: { name: string; id: number }) => ({
                  label: department.name,
                  value: department.id,
                })
              )}
              setOption={setBranch}
            />
          </div>
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

          <div className="space-y-2">
            <SearchSelect
              label="Supervisors"
              options={users?.data?.map((user: User) => ({
                label: `${user?.department?.supervisorId ? "🧑‍💼" : ""} ${
                  user.name
                } - ${user?.department?.name || "No Department"}`,
                value: user.id,
              }))}
              setOption={setSupervisor}
            />
          </div>
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

export default DepartmentCreate;
