import { User } from "../../../shared/config/types";

export type Activity = {
  name?: string;
  id: number;
  user: User;
  createdAt?: string;
  description?: string;
  reactions?: {
    id: number;
    userId: number;
    activityId: number;
    createdAt: string;
    type: string;
  }[];
  comments?: number;
  _count?: { comments: number; reactions: number };
};
export type NewActivity = {
  name: string;
  description: string;
};
