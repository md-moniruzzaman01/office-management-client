import { Users, UserPlus, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Progress } from "../../../../components/ui/progress";

const TotalEmployee = () => {
  return (
    <Card className="glass-card border-none shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Workforce Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> New Employees
            </span>
            <span className="font-bold">22</span>
          </div>
          <Progress value={22} max={50} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" /> Total Employees
            </span>
            <span className="font-bold">2000</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4" /> Avg. Engagement
            </span>
            <span className="font-bold">85%</span>
          </div>
          <Progress value={85} className="h-2 text-green-500" />
        </div>

        <div className="pt-4 border-t border-border/50 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">2,022</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Workforce</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-500">98%</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Attendance Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalEmployee;
