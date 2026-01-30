// export const getPublicIdFromUrl = (url: string): string | null => {
//   const regex = /\/upload\/(?:v\d+\/)?([^/]+)\/([^/.]+)\.[a-z]+$/;
//   const match = url.match(regex);
//   return match ? match[2] : null;
// };

export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const urlWithoutQuery = url.split("?")[0];

    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
    const match = urlWithoutQuery.match(regex);

    if (!match || !match[1]) {
      return null;
    }

    const publicId = decodeURIComponent(match[1]);

    return publicId;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};
