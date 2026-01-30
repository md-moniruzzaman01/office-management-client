import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  CalendarX,
} from "lucide-react";
import { TabsContent } from "../../../../components/ui/tabs";

const ProfileAttendance = () => {
  return (
    <TabsContent value="attendance">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Overview Card */}
        <div className="bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Monthly Overview
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  18
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  Present Days
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  2
                </div>
                <div className="text-sm text-red-600 dark:text-red-400">
                  Absent Days
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  3
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-400">
                  Late Arrivals
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Attendance Rate
                  </span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    90%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Great performance! You've maintained a consistent attendance
                  record.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-purple-500" />
                Quick Stats
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarClock className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Avg. Work Hours
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  7.8 hrs/day
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Avg. Arrival Time
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  8:55 AM
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="w-5 h-5 text-teal-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Work Streak
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  12 days
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarX className="w-5 h-5 text-rose-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Last Absence
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  May 1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="lg:col-span-2 bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Recent Activity
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  date: "15-02-25",
                  status: "Present",
                  time: "8:55 AM - 5:30 PM",
                  type: "success",
                },
                {
                  date: "14-02-25",
                  status: "Late",
                  time: "9:15 AM - 5:45 PM",
                  type: "warning",
                },
                {
                  date: "13-02-25",
                  status: "Present",
                  time: "8:50 AM - 5:25 PM",
                  type: "success",
                },
                {
                  date: "12-02-25",
                  status: "Present",
                  time: "8:45 AM - 5:30 PM",
                  type: "success",
                },
                {
                  date: "11-02-25",
                  status: "Absent",
                  time: "Sick Leave",
                  type: "error",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.type === "success"
                          ? "bg-green-500"
                          : item.type === "warning"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.date}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.time}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === "success"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : item.type === "warning"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProfileAttendance;
