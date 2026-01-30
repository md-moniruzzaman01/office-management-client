import { useEffect, useState } from "react";
import {
  useEditUserMutation,
  useGetSingleUserQuery,
} from "../../../redux/features/api/Users/user";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";
import {
  bloodGroupOptions,
  initialData,
  inputs,
  roleOptions,
} from "./config/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { MultiSelect } from "../../../common/Multiple Select/MultipleSelect";
import { useGetDepartmentsQuery } from "../../../redux/features/api/Departments/department";
import { useGetBranchesQuery } from "../../../redux/features/api/Branches/branches";
import { useGetPowersQuery } from "../../../redux/features/api/Power/power";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../../common/LoadingPage/LoadingPage";

const UserEdit: React.FC = () => {
  const [formData, setFormData] = useState(initialData);
  const [role, setRole] = useState<{ value: string } | null>(null);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{
    value: string;
  } | null>(null);
  const [bloodGroup, setBloodGroup] = useState<{
    value: string;
  } | null>(null);
  const [powerIds, setPowerIds] = useState<string[] | undefined>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [editUser, { isLoading }] = useEditUserMutation();
  const { data: departments } = useGetDepartmentsQuery({});
  const { data: branches } = useGetBranchesQuery({});
  const { data: powersData } = useGetPowersQuery({});
  const { data: singleUser, isLoading: singleLoading } = useGetSingleUserQuery({
    id,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (singleUser) {
      setFormData((prev) => ({
        ...prev,
        name: singleUser?.data?.details?.name,
        email: singleUser?.data?.email,
        contactNo: singleUser?.data?.details?.contactNo,
        designation: singleUser?.data?.details?.designation,
        profileImage: singleUser?.data?.details?.profileImage,
      }));
      setRole({ value: singleUser?.data?.role });
      setBranch({
        value: singleUser?.data?.details?.branch?.id,
      });
      setDepartment({
        value: singleUser?.data?.details?.department?.id,
      });
      setBloodGroup({
        value: singleUser?.data?.details?.bloodGroup,
      });
      setPowerIds(
        singleUser?.data?.details?.powers?.map((power: { id: number }) =>
          power?.id.toString()
        )
      );
    }
  }, [singleUser]);

  const fullData = {
    ...formData,
    role: role?.value,
    branchId: branch?.value,
    departmentId: department?.value,
    bloodGroup: bloodGroup?.value,
    powers: powerIds?.map((power) => +power),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editUser({
      fullData,
      id,
    });
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      setRole(null);
      setBranch(null);
      setDepartment(null);
      setBloodGroup(null);
      setPowerIds([]);
      navigate("/users");
    }
  };
  if (singleLoading) {
    return <LoadingPage fullPage />;
  }

  return (
    <div className="page-container max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="heading-1">Edit User</h1>
        <p className="sub-heading">Update user information.</p>
      </div>
      <Card className="glass-card border-none shadow-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl font-semibold text-primary">User Information</CardTitle>
          </CardHeader>

          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inputs?.map((input, index) => (
              <div key={index}>
                <Input
                  label={input?.label}
                  name={input?.name}
                  placeholder={input?.placeholder}
                  defaultValue={formData[input?.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
            ))}
            <div className="space-y-2">
              <SearchSelect
                label="Role"
                options={roleOptions}
                setOption={setRole}
                defaultValue={typeof role === "string" ? role : role?.value}
              />
            </div>
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
            <div className="space-y-2">
              <SearchSelect
                label="Blood Groups"
                options={bloodGroupOptions}
                setOption={setBloodGroup}
                defaultValue={
                  typeof bloodGroup === "string" ? bloodGroup : bloodGroup?.value
                }
              />
            </div>
            <div className="space-y-2">
              <MultiSelect
                label="Powers"
                options={powersData?.data?.map(
                  (department: { name: string; id: number }) => ({
                    label: department.name,
                    value: String(department.id),
                  })
                )}
                onValueChange={(e) => setPowerIds(e)}
                defaultValue={powerIds}
              />
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-8">
            <Button type="submit" loading={isLoading} className="w-full md:w-auto md:ml-auto px-8" size="lg">
              Update User
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserEdit;
