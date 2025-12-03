import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: { title: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {index > 0 && (
                    <div
                      className={cn(
                        "flex-1 h-1 rounded-full transition-all duration-500 ease-out",
                        isCompleted 
                          ? "bg-gradient-to-r from-primary to-primary" 
                          : "bg-muted"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shrink-0 relative",
                      isCompleted
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30"
                        : isCurrent
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ring-4 ring-primary/20 shadow-xl shadow-primary/40 scale-110"
                        : "bg-muted text-muted-foreground border-2 border-muted-foreground/20"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 animate-in zoom-in-50 duration-300" />
                    ) : (
                      <span className={cn(
                        "transition-all duration-300",
                        isCurrent && "scale-110"
                      )}>
                        {index + 1}
                      </span>
                    )}
                    {isCurrent && (
                      <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-1 rounded-full transition-all duration-500 ease-out",
                        isCompleted 
                          ? "bg-gradient-to-r from-primary to-primary" 
                          : "bg-muted"
                      )}
                    />
                  )}
                </div>
                <div className="mt-4 text-center px-2">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-all duration-300",
                      isCurrent
                        ? "text-primary"
                        : isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={cn(
                      "text-xs mt-1 hidden sm:block transition-colors duration-300",
                      isCurrent ? "text-primary/70" : "text-muted-foreground"
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
