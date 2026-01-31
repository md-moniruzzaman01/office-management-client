/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateUserMutation } from "../../../redux/features/api/Users/user";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { SearchSelect } from "../../../common/Search Select/SearchSelect";
import {
  bloodGroupOptions,
  genderOptions,
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
import { useNavigate } from "react-router-dom";
import PhotoUpload from "../../../common/Photo Upload/PhotoUpload";


const CreateUserForm: React.FC = () => {
  const [formData, setFormData] = useState(initialData);
  const [role, setRole] = useState<{ value: string } | null>(null);
  const [branch, setBranch] = useState<{ value: string } | null>(null);
  const [department, setDepartment] = useState<{ value: string } | null>(null);
  const [bloodGroup, setBloodGroup] = useState<{ value: string } | null>(null);
  const [powerIds, setPowerIds] = useState<number[] | null>([]);
  const [file, setFile] = useState<any>(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  const query = `branchId=${branch?.value}`;

  const navigate = useNavigate();

  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: departments } = useGetDepartmentsQuery(
    { query },
    { skip: !branch?.value },
  );
  const { data: branches } = useGetBranchesQuery({});
  const { data: powers } = useGetPowersQuery({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // let profileImage: any;
    // setPhotoUploading(true);
    // if (file) {
    //   profileImage = await uploadPhoto(file.target.files[0], "users");
    // }
    // if (!profileImage?.success) {
    //   setPhotoUploading(false);

    //   return swal("Error", "Uploading profile image failed", profileImage);
    // }

    const fullData = {
      ...formData,
      fingerId: null,
      role: role?.value,
      branchId: branch?.value,
      departmentId: department?.value,
      bloodGroup: bloodGroup?.value,
      powerId: powerIds,
      roasters: formData.roasters || [],
      // profileImage: profileImage?.url,
    };

    const result = await createUser({
      fullData,
    });
    setPhotoUploading(false);
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

  return (
    <div className="page-container max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="heading-1">Create New User</h1>
        <p className="sub-heading">Add a new employee to the system.</p>
      </div>
      <Card className="glass-card border-none shadow-lg">
        <form onSubmit={handleSubmit} className="p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl font-semibold text-primary">
              User Details
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inputs?.map((input, index) => (
              <div key={index}>
                <Input
                  label={input?.label}
                  name={input?.name}
                  // placeholder={input?.placeholder}
                  value={formData[input?.name as keyof typeof formData]}
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
              />
            </div>
            <div className="space-y-2">
              <SearchSelect
                label="Branches"
                options={branches?.data?.map(
                  (department: { name: string; id: number }) => ({
                    label: department.name,
                    value: department.id,
                  }),
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
                  }),
                )}
                setOption={setDepartment}
              />
            </div>
            <div className="space-y-2">
              <SearchSelect
                label="Blood Groups"
                options={bloodGroupOptions}
                setOption={setBloodGroup}
              />
            </div>
            <div className="space-y-2">
              <SearchSelect
                label="Gender"
                options={genderOptions}
                setOption={(v: any) =>
                  setFormData((p) => ({ ...p, gender: v.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <MultiSelect
                label="Powers"
                options={powers?.data?.map(
                  (department: { name: string; id: number }) => ({
                    label: department.name,
                    value: department.id,
                  }),
                )}
                onValueChange={(e: any) => setPowerIds(e)}
              />
            </div>{" "}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <PhotoUpload file={file} label="User's Photo" setFile={setFile} />
            </div>
            <div>
              <Input
                label={"Password"}
                name={"password"}
                placeholder={"password"}
                value={formData["password" as keyof typeof formData]}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-8">
            <Button
              type="submit"
              loading={isLoading || photoUploading}
              className="w-full md:w-auto md:ml-auto px-8"
              size="lg"
            >
              Create User
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserForm;
