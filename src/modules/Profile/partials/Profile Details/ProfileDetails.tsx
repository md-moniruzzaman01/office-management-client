import { Activity, CalendarClock, Hourglass, Timer } from "lucide-react";
import { TabsContent } from "../../../../components/ui/tabs";
import ProfileWorkHoursChart from "../Profile Work Hours Chart/ProfileWorkHoursChart";

const ProfileDetails = () => {
  return (
    <TabsContent value="details" className="mt-0 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        
        {/* Large Widget: Work Summary */}
        <div className="md:col-span-4 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
             <Timer className="text-indigo-500" /> Work Metrics
           </h3>
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetricBox label="This Month" value="160h" icon={<CalendarClock className="text-blue-500"/>} color="bg-blue-50" />
              <MetricBox label="Efficiency" value="94%" icon={<Activity className="text-green-500"/>} color="bg-green-50" />
              <MetricBox label="Overtime" value="12h" icon={<Hourglass className="text-orange-500"/>} color="bg-orange-50" />
           </div>
        </div>

        {/* Small Widget: Status */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg">
           <p className="text-blue-100 text-sm">Availability</p>
           <h4 className="text-2xl font-bold mt-1">Open to Projects</h4>
           <div className="mt-8 flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-gray-200" />)}
              <div className="w-8 h-8 rounded-full border-2 border-indigo-500 bg-indigo-400 flex items-center justify-center text-xs">+5</div>
           </div>
        </div>

        {/* Chart Widget */}
        <div className="md:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700">
           <ProfileWorkHoursChart />
        </div>
      </div>
    </TabsContent>
  );
};

// Helper component for clean code
const MetricBox = ({ label, value, icon, color }:any) => (
  <div className={`${color} dark:bg-gray-700/30 p-4 rounded-2xl`}>
    <div className="mb-2">{icon}</div>
    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
    <div className="text-xl font-bold dark:text-white">{value}</div>
  </div>
);

export default ProfileDetails;
