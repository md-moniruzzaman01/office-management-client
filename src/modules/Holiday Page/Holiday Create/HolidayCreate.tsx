import { useState } from "react";
import { initialData, inputs } from "./config/constants";
import { useNavigate } from "react-router-dom";
import { useCreateHolidayMutation } from "../../../redux/features/api/Holidays/holidays";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";
import { useGetDepartmentsQuery } from "../../../redux/features/api/Departments/department";
import { useGetBranchesQuery } from "../../../redux/features/api/Branches/branches";

const HolidayCreate = () => {
  const [formData, setFormData] = useState(initialData);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{ value: string } | null>(null);

  const query = `branchId=${branch?.value}`;

  const navigate = useNavigate();

  const [createHoliday, { isLoading }] = useCreateHolidayMutation();
  const { data: departments } = useGetDepartmentsQuery(
    { query },
    { skip: !branch?.value }
  );
  const { data: branches } = useGetBranchesQuery({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fullData = {
    name: formData.name,
    date: new Date(formData.date),
    branchId: branch?.value,
    departmentId: department?.value,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createHoliday({
      fullData,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      navigate("/holidays");
    }
  };
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
                type={input?.type}
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
            />
          </div>
          <div className="space-y-2">
            <SearchSelect
              label="Departments"
              options={departments?.data?.map(
                (department: { name: string; id: number }) => ({
                  label: department.name,
                  value: department.id,
                })
              )}
              setOption={setDepartment}
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

export default HolidayCreate;
