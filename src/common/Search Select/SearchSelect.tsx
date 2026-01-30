import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { cn } from "../../lib/utils";
import { SearchSelectProps } from "./config/type";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";

export function SearchSelect({
  options = [],
  setOption,
  required,
  label,
  defaultValue,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // ✅ Use defaultValue when component loads
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.toString());
    }
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={`${label && "space-y-2"}`}>
        <Label>{label}</Label>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? options.find((option) => option?.value?.toString() === value)
                  ?.label
              : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[300px] p-0">
          <Command>
            <CommandInput required={required} placeholder="Search option..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option?.value?.toString()}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setOption(option);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option?.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option?.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}
