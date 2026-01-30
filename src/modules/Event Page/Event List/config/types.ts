export interface Event {
  id: number;
  name: string;
  title?: string;
  startDate: string;
  endDate: string;
  description?: string;
  department?: {
    name: string;
  };
  branch: {
    name: string;
  };
  start?: Date;
  end?: Date;
}
