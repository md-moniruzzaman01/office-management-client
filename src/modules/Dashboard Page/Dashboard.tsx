import { Briefcase, Users } from "lucide-react";
import { Header } from "./partials/Header/Header";
import TotalEmployee from "./partials/Total Employee/TotalEmployee";
import Performance from "./partials/Employee Performance/Performance";
import QuickActions from "./QuickAction";
import EmployeeStatus from "./partials/Employee Performance/EmployeeStatus";


const Dashboard = () => {
  return (
    <div className="p-6 lg:p-10 space-y-10 bg-slate-50/50 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Workspace Insights</h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <div className="hidden md:block text-right px-4 border-r border-slate-200">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">System Status</p>
            <p className="text-sm font-semibold text-emerald-500 flex items-center justify-end gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Operational
            </p>
          </div>
        </div>
      </div>

      {/* Metric Grid */}
      <Header />

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 h-full">
          <TotalEmployee />
        </div>
        <div className="xl:col-span-8 h-full">
          <Performance />
        </div>
      </div>

      {/* Bottom Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeStatus />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;