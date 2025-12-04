import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const CustomCheckBoxGroup = ({
  name = "features",
  watch,
  setValue,
  errors,
  featureList
}) => {
  const features = watch(name) || {};

  const toggle = (key) => {
    setValue(`${name}.${key}`, !features[key], {
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-6">
        {featureList.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <Checkbox
              id={item.key}
              checked={features?.[item.key] ?? false}
              onCheckedChange={() => toggle(item.key)}
            />
            <Label htmlFor={item.key} className="cursor-pointer">
              {item.label}
            </Label>
          </div>
        ))}
      </div>

      {errors?.[name] && (
        <p className="text-xs text-destructive">{errors[name]?.message}</p>
      )}
    </div>
  );
};
