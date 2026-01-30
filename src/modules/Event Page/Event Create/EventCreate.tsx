/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "../../../common/Modal/Modal";
import { initialData, inputs } from "./config/constants";
import { useCreateEventMutation } from "../../../redux/features/api/Event/event";
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

const EventCreate = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [formData, setFormData] = useState(initialData);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{ value: string } | null>(null);

  const query = `branchId=${branch?.value}`;

  const [createEvent, { isLoading }] = useCreateEventMutation();
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
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    branchId: branch?.value,
    departmentId: department?.value,
    description: formData?.description,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createEvent({
      fullData,
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
              <CardTitle>Create Event</CardTitle>
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
        </Modal>
      </Card>
    </div>
  );
};

export default EventCreate;
