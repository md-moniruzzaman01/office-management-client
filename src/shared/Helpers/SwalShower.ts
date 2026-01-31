/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeFromLocalStorage } from "./local_storage";
import { authKey } from "../config/constaints";
import swal from "sweetalert";

export const showSwal = (result: any) => {
  // 1. Handle Success
  if (result?.data?.success) {
    swal("Success", result.data.message, "success");
    return true;
  } 

  // 2. Handle Errors
  const errorData = result?.error?.data;
  const errorStatus = result?.error?.status;

  // Extract detailed error messages if they exist (for Zod/Validation)
  let detailedMessage = result?.error?.data?.message || "Something went wrong";

  if (errorData?.errorMessages && Array.isArray(errorData.errorMessages)) {
    // This maps through the array and creates a string like: "contactNo: Invalid Bangladeshi contact number"
    detailedMessage = errorData.errorMessages
      .map((err: any) => `${err.path}: ${err.message}`)
      .join("\n");
  }

  // 3. Handle Auth Errors (401/403)
  if (errorStatus === 403 || errorStatus === 401) {
    removeFromLocalStorage(authKey);
    swal({
      title: "Session Expired",
      text: "Please login again to continue.",
      icon: "error",
    }).then(() => {
      window.location.href = "/login";
    });
    return false;
  } 

  // 4. Handle Specific Validation or General Errors
  swal("Error", detailedMessage, "error");
  return false;
};