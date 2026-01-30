import {
  Calendar,
  Clock,
  CalendarDays,
  CalendarX,
  CalendarCheck,
  CalendarClock,
  PlusCircle,
  History,
  AlertCircle,
  FileText,
  CalendarOff,
  CalendarPlus,
} from "lucide-react";
import { TabsContent } from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";

const ProfileLeave = () => {
  return (
    <TabsContent value="leave">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leave Balance Card */}
        <div className="bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Leave Balance
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarCheck className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  15
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  Annual Leave
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarPlus className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  7
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400">
                  Sick Leave
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CalendarClock className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  3
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  Personal Leave
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <History className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Leave History Overview
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <CalendarX className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Used: 12 days
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Remaining: 13 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Quick Actions
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <Button className="w-full gap-2 bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="w-4 h-4" />
                Request New Leave
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                View Leave Policy
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <CalendarOff className="w-4 h-4" />
                Cancel Request
              </Button>
            </div>

            <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span className="font-medium text-amber-800 dark:text-amber-300">
                  Important Notice
                </span>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Please submit leave requests at least 2 weeks in advance for
                proper planning.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Requests Card */}
        <div className="lg:col-span-2 bg-componentsBackground  rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-teal-500" />
                Recent Leave Requests
              </h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  type: "Annual Leave",
                  dates: "Jun 15 - Jun 17, 2023",
                  days: "3 days",
                  status: "pending",
                  reason: "Family vacation",
                },
                {
                  type: "Sick Leave",
                  dates: "May 20, 2023",
                  days: "1 day",
                  status: "approved",
                  reason: "Medical appointment",
                },
                {
                  type: "Personal Leave",
                  dates: "May 10, 2023",
                  days: "1 day",
                  status: "approved",
                  reason: "Personal matters",
                },
                {
                  type: "Annual Leave",
                  dates: "Apr 5 - Apr 7, 2023",
                  days: "3 days",
                  status: "completed",
                  reason: "Family event",
                },
              ].map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        request.status === "approved"
                          ? "bg-green-500"
                          : request.status === "pending"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {request.type} ({request.days})
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {request.dates} • {request.reason}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : request.status === "pending"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
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

export default ProfileLeave;
