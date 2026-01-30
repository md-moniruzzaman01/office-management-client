import React from "react";
import { 
  Briefcase, 
  UserPlus, 
  Calendar, 
  Clock, 
  DollarSign, 
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const QuickActions = () => {
  const pendingTasks = [
    { 
      label: "8 leave requests", 
      meta: "Awaiting approval", 
      status: "urgent",
      color: "bg-rose-500" 
    },
    { 
      label: "5 timesheets", 
      meta: "Pending your review", 
      status: "standard",
      color: "bg-amber-500" 
    },
    { 
      label: "3 onboarding docs", 
      meta: "Incomplete profiles", 
      status: "standard",
      color: "bg-blue-500" 
    },
  ];

  return (
    <Card className="border-none shadow-xl shadow-slate-200/60 rounded-[2rem] overflow-hidden bg-white">
      {/* Dark Header for Visual Impact */}
      <CardHeader className="bg-slate-900 text-white p-7">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-3 font-bold">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Briefcase className="w-5 h-5 text-indigo-400" />
            </div>
            Quick Actions
          </CardTitle>
          <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full uppercase tracking-widest font-bold">
            Admin Suite
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-7">
        {/* Action Button Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="group h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            Add Employee
          </Button>
          
          <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-2xl font-semibold text-slate-700 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            Manage Leave
          </Button>

          <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-2xl font-semibold text-slate-700 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            Attendance
          </Button>

          <Button variant="outline" className="h-14 border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-2xl font-semibold text-slate-700 flex items-center justify-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            Payroll
          </Button>
        </div>
        
        {/* Pending Actions Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" />
              Required Attention
            </h3>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {pendingTasks.length} Tasks
            </span>
          </div>

          <div className="space-y-3">
            {pendingTasks.map((task, i) => (
              <div 
                key={i} 
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className={`w-2 h-2 rounded-full ${task.color} ring-4 ring-white shadow-sm`} />
                
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {task.label}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {task.meta}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Insight/Quote */}
        <div className="mt-8 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
           <p className="text-[11px] text-indigo-700/70 italic text-center leading-relaxed">
             "Effortless management leads to a thriving culture."
           </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;