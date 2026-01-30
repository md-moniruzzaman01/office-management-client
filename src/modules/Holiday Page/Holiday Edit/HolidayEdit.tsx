import { useEffect, useState } from "react";
import { initialData, inputs } from "./config/constants";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditHolidayMutation,
  useGetSingleHolidayQuery,
} from "../../../redux/features/api/Holidays/holidays";
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

const HolidayEdit = () => {
  const [formData, setFormData] = useState(initialData);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{ value: string } | null>(null);

  const { id } = useParams();

  const query = `branchId=${branch?.value}`;

  const navigate = useNavigate();

  const [editHoliday, { isLoading }] = useEditHolidayMutation();
  const { data: departments } = useGetDepartmentsQuery(
    { query },
    { skip: !branch?.value }
  );
  const { data: branches } = useGetBranchesQuery({});
  const { data: singleHoliday } = useGetSingleHolidayQuery({ id });

  useEffect(() => {
    if (singleHoliday?.data) {
      setFormData({
        name: singleHoliday?.data?.name,
        date: singleHoliday?.data?.date
          ? new Date(singleHoliday?.data?.date).toISOString().split("T")[0]
          : "",
      });
      setBranch({ value: singleHoliday?.data?.branchId });
      setDepartment({ value: singleHoliday?.data?.departmentId });
    }
  }, [singleHoliday]);

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
    const result = await editHoliday({
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
          <CardTitle>Edit Branch</CardTitle>
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
              defaultValue={typeof branch === "string" ? branch : branch?.value}
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
              defaultValue={
                typeof department === "string" ? department : department?.value
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

export default HolidayEdit;
