import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const CustomTextarea = ({
  id,
  label,
  register,
  errors,
  required = false,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Textarea
        id={id}
        placeholder={placeholder}
        className={className}
        {...register(id)}
      />

      {errors?.[id] && (
        <p className="text-xs text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
};
