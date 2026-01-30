/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Comment {
  user: {
    name: string;
    profileImage?: string;
    designation?: string;
    department?: { name: string };
    branch?: { name: string };
  };
  id: number;
  _count: { reactions?: number };
  createdAt?: string;
  content: string;
  reactions: any;
}
