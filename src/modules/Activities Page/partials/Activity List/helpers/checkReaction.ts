/* eslint-disable @typescript-eslint/no-explicit-any */

export const hasReacted = (
  activities: any[],
  activityId: number,
  userId: number,
  type: string = "LOVE"
) => {
  const activity = activities.find((a) => a.id === activityId);
  return activity?.reactions?.find(
    (reaction: any) => reaction.userId === userId && reaction.type === type
  );
};
