/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Modal from "../../../common/Modal/Modal";
import { initialData, inputs } from "./config/constants";
import {
  useEditEventMutation,
  useGetSingleEventQuery,
} from "../../../redux/features/api/Event/event";
import { useGetDepartmentsQuery } from "../../../redux/features/api/Departments/department";
import { useGetBranchesQuery } from "../../../redux/features/api/Branches/branches";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";
import { Button } from "../../../components/ui/button";

const EventEdit = ({
  isOpen,
  setIsOpen,
  id,
}: {
  isOpen: boolean;
  setIsOpen: any;
  id: number;
}) => {
  const [formData, setFormData] = useState(initialData);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{ value: string } | null>(null);

  const query = `branchId=${branch?.value}`;

  const [editEvent, { isLoading }] = useEditEventMutation();
  const { data: departments } = useGetDepartmentsQuery(
    { query },
    { skip: !branch?.value }
  );
  const { data: branches } = useGetBranchesQuery({});
  const { data: singleData } = useGetSingleEventQuery({ id });

  useEffect(() => {
    if (singleData?.data) {
      setFormData({
        name: singleData?.data?.name,
        description: singleData?.data?.description || "",
        startDate: singleData?.data?.startDate
          ? new Date(singleData?.data?.startDate).toISOString().split("T")[0]
          : "",
        endDate: singleData?.data?.endDate
          ? new Date(singleData?.data?.endDate).toISOString().split("T")[0]
          : "",
      });
      setBranch({ value: singleData?.data?.branchId });
      setDepartment({ value: singleData?.data?.departmentId });
    }
  }, [singleData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fullData = {
    name: formData.name,
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    branchId: branch?.value || undefined,
    departmentId: department?.value || undefined,
    description: formData.description,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editEvent({
      fullData,
      id,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Card>
        <Modal
          description="Here you can add a new user."
          bgColor="componentsBackground"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <form onSubmit={handleSubmit} className="px-5">
            <CardHeader>
              <CardTitle>Edit Event</CardTitle>
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
                  defaultValue={
                    typeof branch === "string" ? branch : branch?.value
                  }
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
                    typeof department === "string"
                      ? department
                      : department?.value
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
        </Modal>
      </Card>
    </div>
  );
};

export default EventEdit;
