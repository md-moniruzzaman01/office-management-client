import { employeePerformanceData } from "./config/constants";
import { getPerformanceStyle } from "./PerformanceStyle";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Trophy } from "lucide-react";

const Performance = () => {
  return (
    <Card className="glass-card border-none shadow-md h-full">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Top Performers
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6 font-medium">Employee</th>
                <th className="py-4 px-6 font-medium">Designation</th>
                <th className="py-4 px-6 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {employeePerformanceData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-background shadow-sm"
                      />
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">{item.designation}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getPerformanceStyle(
                        item.performance
                      )}`}
                    >
                      {item.performance}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Performance;
