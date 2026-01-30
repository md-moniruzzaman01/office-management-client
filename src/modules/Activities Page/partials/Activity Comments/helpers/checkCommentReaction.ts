/* eslint-disable @typescript-eslint/no-explicit-any */

export const hasReacted = (
  comments: any[],
  activityId: number,
  userId: number,
  type: string = "LOVE"
) => {
  const activity = comments?.find((a) => a.id === activityId);
  return activity?.reactions?.find(
    (reaction: any) => reaction.userId === userId && reaction.type === type
  );
};
