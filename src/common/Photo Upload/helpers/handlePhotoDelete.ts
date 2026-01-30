import { getPublicIdFromUrl } from "./handleGetPublicId";
import CryptoJS from "crypto-js";

export const deletePhoto = async (
  imageUrl: string
): Promise<{ message: string; success: boolean }> => {
  try {
    const publicId: string | null = getPublicIdFromUrl(imageUrl);

    if (!publicId) {
      throw new Error("Invalid image URL");
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${
      import.meta.env.VITE_CLOUDINARY_API_SECRET
    }`;

    const signature = CryptoJS.SHA1(stringToSign).toString();

    const formData = new FormData();
    formData.append("public_id", publicId); // Use the unencoded public_id here
    formData.append("signature", signature);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY!);
    formData.append("timestamp", timestamp.toString());

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || data.result !== "ok") {
      throw new Error(
        `Failed to delete image: ${data.error?.message || "Unknown error"}`
      );
    }

    return {
      message: "Image Deleted Successfully!",
      success: true,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Unknown error",
      success: false,
    };
  }
};
