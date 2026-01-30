export const getFormatDate = (date: string, options = {}) => {
  if (!date) return "Invalid date";

  const defaultOptions = {
    weekday: "short" as "short" | "long" | "narrow" | undefined,
    year: "numeric" as "numeric" | "2-digit" | undefined,
    month: "short" as
      | "short"
      | "long"
      | "narrow"
      | "numeric"
      | "2-digit"
      | undefined,
    day: "numeric" as "numeric" | "2-digit" | undefined,
    hour: "2-digit" as "numeric" | "2-digit" | undefined,
    minute: "2-digit" as "numeric" | "2-digit" | undefined,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    const inputDate = new Date(date);
    const today = new Date();

    // Normalize dates to compare only year, month, and day
    const isToday = inputDate.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = inputDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      const diffMinutes = Math.floor(
        (today.getTime() - inputDate.getTime()) / 60000
      );
      if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
      }
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    if (isYesterday)
      return `Yesterday, ${inputDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;

    return inputDate.toLocaleDateString("en-US", mergedOptions);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
};
