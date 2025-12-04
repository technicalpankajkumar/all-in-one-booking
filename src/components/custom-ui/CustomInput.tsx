import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CustomInput = ({
  id,
  label = "",
  register,
  errors = {},
  required = false,
  type = "text",
  placeholder = "",
  className = "",
  prefix = null,
  postfix = null,
  ...rest
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {/* Input container for prefix & postfix */}
      <div className="flex items-center gap-2 border rounded px-2 bg-background">
        
        {/* Prefix Icon */}
        {prefix && <span className="text-muted-foreground">{prefix}</span>}

        {/* Actual Input */}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`border-0 shadow-none ${prefix ? 'ps-4' :'px-0'} focus-visible:ring-0 ${className}`}
          {...register(id)}
          {...rest}
        />

        {/* Postfix Icon */}
        {postfix && <span className="text-muted-foreground">{postfix}</span>}
      </div>

      {/* Error */}
      {errors?.[id] && (
        <p className="text-xs text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
};
