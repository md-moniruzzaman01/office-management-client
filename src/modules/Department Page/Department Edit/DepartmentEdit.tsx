import { useEffect, useState } from "react";
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
import {
  useEditDepartmentMutation,
  useGetSingleDepartmentQuery,
} from "../../../redux/features/api/Departments/department";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";
import { User } from "../../../shared/config/types";

const DepartmentEdit: React.FC = () => {
  const [formData, setFormData] = useState(initialData);

  const [supervisor, setSupervisor] = useState<{ value: string } | null>(null);
  const [branch, setBranch] = useState<{ value: string } | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const query = `departmentId=${id}`;

  const [editDepartment, { isLoading }] = useEditDepartmentMutation();
  const { data: branches } = useGetBranchesQuery({});
  const { data: users } = useGetUsersQuery({ query });
  const { data: singleDepartment, isLoading: singleLoading } =
    useGetSingleDepartmentQuery({
      id,
    });

  useEffect(() => {
    if (singleDepartment) {
      setFormData({ name: singleDepartment?.data?.name });
      setBranch({
        value: singleDepartment?.data?.branchId,
      });
      setSupervisor({
        value: singleDepartment?.data?.supervisorId,
      });
    }
  }, [singleDepartment]);

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
    const result = await editDepartment({
      fullData,
      id,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      setSupervisor(null);
      setBranch(null);
      navigate("/departments");
    }
  };

  if (singleLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="px-5">
        <CardHeader>
          <CardTitle>Edit Department</CardTitle>
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
              defaultValue={typeof branch === "string" ? branch : branch?.value}
            />
          </div>
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
              defaultValue={
                typeof supervisor === "string" ? supervisor : supervisor?.value
              }
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

export default DepartmentEdit;
