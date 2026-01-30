import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Clock, Calendar, CalendarDays, CalendarRange } from "lucide-react";
import { Button } from "../../../../components/ui/button";

// Sample data for different time periods
const weeklyData = [
  { name: "Mon", hours: 7.5, meetings: 3 },
  { name: "Tue", hours: 8.25, meetings: 4 },
  { name: "Wed", hours: 7.75, meetings: 2 },
  { name: "Thu", hours: 8, meetings: 5 },
  { name: "Fri", hours: 7, meetings: 3 },
  { name: "Sat", hours: 4, meetings: 1 },
  { name: "Sun", hours: 2, meetings: 0 },
];

const monthlyData = [
  { name: "Week 1", hours: 38, meetings: 15 },
  { name: "Week 2", hours: 42, meetings: 18 },
  { name: "Week 3", hours: 35, meetings: 12 },
  { name: "Week 4", hours: 40, meetings: 16 },
];

const yearlyData = [
  { name: "Jan", hours: 160, meetings: 45 },
  { name: "Feb", hours: 155, meetings: 42 },
  { name: "Mar", hours: 170, meetings: 50 },
  { name: "Apr", hours: 165, meetings: 48 },
  { name: "May", hours: 158, meetings: 44 },
  { name: "Jun", hours: 162, meetings: 46 },
  { name: "Jul", hours: 145, meetings: 38 },
  { name: "Aug", hours: 150, meetings: 40 },
  { name: "Sep", hours: 168, meetings: 49 },
  { name: "Oct", hours: 172, meetings: 51 },
  { name: "Nov", hours: 165, meetings: 47 },
  { name: "Dec", hours: 140, meetings: 35 },
];

type TimePeriod = "weekly" | "monthly" | "yearly";

const ProfileWorkHoursChart = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("weekly");

  const getData = () => {
    switch (timePeriod) {
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
    }
  };

  const getTitle = () => {
    switch (timePeriod) {
      case "weekly":
        return "Weekly Work Hours";
      case "monthly":
        return "Monthly Work Hours";
      case "yearly":
        return "Yearly Work Hours";
    }
  };

  return (
    <div className="w-full p-6 bg-componentsBackground rounded-xl shadow-lg ">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6" />
            {getTitle()}
          </h2>
          <div className="flex gap-2">
            <Button
              variant={timePeriod === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("weekly")}
              className="flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Weekly
            </Button>
            <Button
              variant={timePeriod === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("monthly")}
              className="flex items-center gap-1"
            >
              <CalendarDays className="w-4 h-4" />
              Monthly
            </Button>
            <Button
              variant={timePeriod === "yearly" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("yearly")}
              className="flex items-center gap-1"
            >
              <CalendarRange className="w-4 h-4" />
              Yearly
            </Button>
          </div>
        </div>

        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="hours"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                name="Work Hours"
              />
              <Bar
                yAxisId="right"
                dataKey="meetings"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
                name="Meetings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Total Hours
            </h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {getData().reduce((acc, curr) => acc + curr.hours, 0)}h
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              Total Meetings
            </h3>
            <p className="text-2xl font-bold text-green-900 dark:text-green-100">
              {getData().reduce((acc, curr) => acc + curr.meetings, 0)}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Avg Hours/Day
            </h3>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {(
                getData().reduce((acc, curr) => acc + curr.hours, 0) /
                getData().length
              ).toFixed(1)}
              h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWorkHoursChart;
