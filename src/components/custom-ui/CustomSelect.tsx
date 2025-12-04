import { useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";

export const CustomSelect = ({
  /* Core Props */
  id,
  label,
  items = [],
  placeholder = "Select",
  required = false,
  errors,

  /* RHF Control */
  control = null,
  setValue = null,
  defaultValue = "",
  value = null,

  /* Feature Props */
  searchable = false,
  multi = false,
  prefix = null,
  postfix = null,

  /* Multi-select Values */
  multiValues = [],
}) => {
  const [open, setOpen] = useState(false);

  /* ------------------------- MULTI SELECT LOGIC ------------------------ */
  const toggleMulti = (val) => {
    let updated = multiValues.includes(val)
      ? multiValues.filter((v) => v !== val)
      : [...multiValues, val];

    setValue(id, updated);
  };

  /* ----------------------- NORMAL SELECT RENDER ------------------------ */
  const renderNormalSelect = (fieldValue, onChange) => (
    <Select value={fieldValue} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  /* ----------------------- SEARCHABLE SELECT UI ------------------------ */
  const renderSearchableSelect = (fieldValue, onChange) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <div
          className={cn(
            "flex items-center justify-between border rounded px-3 py-2 w-full",
            !fieldValue && "text-muted-foreground"
          )}
        >
          {fieldValue
            ? items.find((i) => i.value === fieldValue)?.label
            : placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[200px]">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.value === fieldValue
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  /* ------------------------ MULTI SELECT RENDER ------------------------ */
  const renderMultiSelect = () => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <div
          className={cn(
            "flex h-9 items-center justify-between border rounded px-3 py-2 w-full bg-background",
            multiValues.length === 0 && "text-muted-foreground"
          )}
        >
          {multiValues.length > 0
            ? `${multiValues.length} selected`
            : placeholder}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0 ">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => toggleMulti(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      multiValues.includes(item.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  /* ---------------------- SELECT BODY WITH ICONS ---------------------- */
  const renderContent = (fieldValue, onChange) => (
    <div className="flex items-center gap-2">
      {prefix && <div>{prefix}</div>}

      <div className="flex-1">
        {multi
          ? renderMultiSelect()
          : searchable
          ? renderSearchableSelect(fieldValue, onChange)
          : renderNormalSelect(fieldValue, onChange)}
      </div>

      {postfix && <div>{postfix}</div>}
    </div>
  );

  /* --------------------- CONTROLLER (Controlled Mode) ------------------- */
  if (control) {
    return (
      <div className="space-y-1">
        <Label>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>

        <Controller
          control={control}
          name={id}
          render={({ field }) =>
            renderContent(field.value, field.onChange)
          }
        />

        {errors?.[id] && (
          <p className="text-xs text-destructive">{errors[id]?.message}</p>
        )}
      </div>
    );
  }

  /* ------------------ UNCONTROLLED MODE (setValue + value) --------------- */
  return (
    <div className="space-y-1">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {renderContent(value || defaultValue, (val) => {
        setValue(id, val);
        })}

      {errors?.[id] && (
        <p className="text-xs text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
};
