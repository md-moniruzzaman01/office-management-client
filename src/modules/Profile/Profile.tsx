import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import ProfileAttendance from "./partials/Profile Attendance/ProfileAttendance";
import ProfileDetails from "./partials/Profile Details/ProfileDetails";
import ProfileLeave from "./partials/Profile Leave/ProfileLeave";
import ProfileMain from "./partials/Profile main/ProfileMain";
import ProfilePerformance from "./partials/Profile Performance/ProfilePerformance";
import ProfileSetting from "./partials/Profile Setting/ProfileSetting";
// ... imports

const Profile = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Tabs defaultValue="details" className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Navigation & Quick Info */}
        <aside className="lg:w-1/3 space-y-6">
          <ProfileMain /> 
          <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-1">
              {["details", "attendance", "leave", "performance", "settings"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="w-full justify-start px-4 py-3 capitalize data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 dark:data-[state=active]:bg-blue-900/20"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="lg:w-2/3">
          <ProfileDetails />
          <ProfileAttendance/>
          <ProfileLeave />
          <ProfilePerformance />
          <ProfileSetting />
        </main>
      </Tabs>
    </div>
  );
};

 export default Profile;