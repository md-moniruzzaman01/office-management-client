/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";
import { useState } from "react";
import { Label } from "./label";

export function DatePicker({
  onChange,
  name,
  id,
  value,
  label,
}: {
  onChange?: any;
  name?: string;
  id?: string;
  value?: any;
  label?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = useState(false); // Control popover state

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format to only include date
      setDate(selectedDate);
      setIsOpen(false); // Close the popover
      if (onChange) {
        onChange({ target: { name: name || "", value: formattedDate } }); // Pass formatted date
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className={`${label && "space-y-2"}`}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <PopoverTrigger name={name} id={id} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}{" "}
            {/* Show formatted date */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </div>
    </Popover>
  );
}
