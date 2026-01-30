import { useState } from "react";
import attendanceData from "./config/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { DatePicker } from "../../components/ui/datePicker";

interface Employee {
  name: string;
  days: boolean[];
}

const Attendance: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [data, setData] = useState<Employee[]>(attendanceData);
  const daysInMonth: number = 26;

  const generateDates = (start: Date, numberOfDays: number): Date[] => {
    return Array.from({ length: numberOfDays }, (_, i) => {
      const newDate = new Date(start);
      newDate.setDate(start.getDate() + i);
      return newDate;
    });
  };

  const headers = generateDates(startDate, daysInMonth);

  const toggleAttendance = (employeeIdx: number, dayIdx: number): void => {
    setData((prevData) =>
      prevData.map((employee, idx) =>
        idx === employeeIdx
          ? {
            ...employee,
            days: employee.days.map((day, dIdx) =>
              dIdx === dayIdx ? !day : day
            ),
          }
          : employee
      )
    );
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="heading-1">Attendance</h1>
        <p className="sub-heading">Manage employee attendance records.</p>
      </div>

      <div className="glass-card p-6 rounded-lg shadow-md border-none">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-muted-foreground">Select Start Date:</span>
          <div className="w-auto">
            <DatePicker
              value={startDate.toISOString().split("T")[0]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStartDate(new Date(e.target.value))
              }
            />
          </div>
        </div>

        {/* Outer container for horizontal scroll */}
        <div className="overflow-x-auto border rounded-md">
          {/* Inner container for vertical scroll */}
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            <Table className="min-w-max relative w-full caption-bottom text-sm text-left">
              {/* Sticky header */}
              <TableHeader className="bg-muted/50 sticky top-0 z-20 shadow-sm backdrop-blur-sm">
                <TableRow className="border-b border-border hover:bg-transparent">
                  {/* Sticky employee column header */}
                  <TableHead className="sticky left-0 top-0 z-30 bg-muted/90 min-w-[200px] px-4 py-3 font-medium text-muted-foreground uppercase tracking-wider backdrop-blur-md border-r border-border">
                    Employee
                  </TableHead>
                  {headers.map((date, i) => (
                    <TableHead key={i} className="text-center text-xs px-2 py-3 text-muted-foreground font-medium min-w-[60px]">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, employeeIdx) => (
                  <TableRow key={employeeIdx} className="hover:bg-muted/30 border-b border-border/50">
                    {/* Sticky employee name cell */}
                    <TableCell className="sticky left-0 z-10 bg-background/95 min-w-[200px] px-4 py-3 font-medium text-foreground border-r border-border/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      <div className="truncate">{row.name}</div>
                    </TableCell>
                    {row.days.map((day, dayIdx) => (
                      <TableCell key={dayIdx} className="text-center px-1 py-2">
                        <Button
                          variant={day ? "default" : "secondary"}
                          onClick={() => toggleAttendance(employeeIdx, dayIdx)}
                          className={`h-8 w-8 p-0 rounded-full ${day ? "bg-green-500 hover:bg-green-600 text-white shadow-sm" : "bg-destructive/10 text-destructive hover:bg-destructive/20"}`}
                        >
                          {day ? "P" : "A"}
                        </Button>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
