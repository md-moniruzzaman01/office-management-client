import React from "react";
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

const EmployeeStatus = () => {
  const statusRows = [
    { 
      label: "Active Employees", 
      count: 225, 
      icon: CheckCircle2, 
      color: "text-emerald-500", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "On Leave", 
      count: 15, 
      icon: AlertCircle, 
      color: "text-amber-500", 
      bg: "bg-amber-50" 
    },
    { 
      label: "Inactive", 
      count: 8, 
      icon: XCircle, 
      color: "text-rose-500", 
      bg: "bg-rose-50" 
    },
  ];

  return (
    <Card className="border-none shadow-xl shadow-slate-200/60 rounded-[2rem] bg-white overflow-hidden">
      <CardHeader className="p-7 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-3 font-bold text-slate-800">
            <div className="p-2 bg-slate-100 rounded-xl">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
            Workforce Status
          </CardTitle>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200" />
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
              +12
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-7">
        {/* Top Highlight Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative overflow-hidden p-5 rounded-3xl bg-emerald-50/50 border border-emerald-100 group transition-all hover:bg-emerald-50">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <UserPlus className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4.2%
              </span>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">28</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Hires</p>
          </div>

          <div className="relative overflow-hidden p-5 rounded-3xl bg-rose-50/50 border border-rose-100 group transition-all hover:bg-rose-50">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <UserMinus className="w-5 h-5 text-rose-600" />
              </div>
              <span className="flex items-center text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3 h-3 mr-0.5" /> 1.1%
              </span>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">12</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Resignations</p>
          </div>
        </div>

        {/* Detailed Status List */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Availability Breakdown</p>
          {statusRows.map((status, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-default">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${status.bg}`}>
                  <status.icon className={`w-5 h-5 ${status.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">{status.label}</p>
                  <p className="text-[11px] text-slate-400 font-medium">Updated 2h ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-800">{status.count}</p>
                <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                   <div 
                    className={`h-full ${status.color.replace('text', 'bg')}`} 
                    style={{ width: `${(status.count / 248) * 100}%` }}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeStatus;