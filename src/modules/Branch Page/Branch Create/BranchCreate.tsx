/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { initialData, inputs } from "./config/constants";
import { useCreateBranchMutation } from "../../../redux/features/api/Branches/branches";
import { showSwal } from "../../../shared/Helpers/SwalShower";
import { Input } from "../../../components/ui/input";

import { Button } from "../../../components/ui/button";
import PhotoUpload from "../../../common/Photo Upload/PhotoUpload";
import { uploadPhoto } from "../../../common/Photo Upload/helpers/handlePhotoUpload";
import swal from "sweetalert";

const BranchCreate = () => {
  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState<any>(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  const navigate = useNavigate();

  const [createBranch, { isLoading }] = useCreateBranchMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhotoUploading(true);
    let branchImage: any;
    if (file) {
      branchImage = await uploadPhoto(file.target.files[0], "branch image");
    }
    if (!branchImage?.success) {
      setPhotoUploading(false);
      return swal("Error", "Uploading branch image failed", "error");
    }

    const result = await createBranch({
      fullData: { ...formData, image: branchImage?.url },
    });
    setPhotoUploading(false);
    const isSwalTrue = showSwal(result);
    if (isSwalTrue) {
      setFormData(initialData);
      navigate("/branches");
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
                placeholder={input?.placeholder}
                value={formData[input?.name as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div>
            <PhotoUpload file={file} label="User's Photo" setFile={setFile} />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            loading={isLoading || photoUploading}
            className="w-full"
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BranchCreate;
