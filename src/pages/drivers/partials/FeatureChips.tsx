import { useEffect, useRef, useState } from "react";
import { Wind } from "lucide-react";

const MAX_VISIBLE = 4;

export const FeatureChips = ({ selectedCar }) => {
  const features = selectedCar?.features ?? [];

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const visibleFeatures = features.slice(0, MAX_VISIBLE);
  const hiddenCount = features.length - MAX_VISIBLE

  /* ---------- Auto position calculation ---------- */
  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setPosition("top");
    // setPosition(spaceBelow < 100 && spaceAbove > spaceBelow ? "top" : "bottom");
  };

  /* ---------- Outside click handler ---------- */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!features.length) return null;

  return (
    <div className="relative mt-3">
      {/* ===== CHIPS ===== */}
      <div className="flex flex-wrap gap-2">
        {visibleFeatures.map((res, idx) => (
          <span
            key={idx}
            className="text-xs bg-background px-2 py-1 rounded-full flex items-center gap-1 border"
          >
            <Wind className="w-3 h-3" />
            {res?.name}
          </span>
        ))}

        {hiddenCount > 0 && (
          <span
            ref={triggerRef}
            onMouseEnter={() => {
              calculatePosition();
              setOpen(true);
            }}
            onClick={() => {
              calculatePosition();
              setOpen(true);
            }}
            className="text-xs bg-muted px-2 py-1 rounded-full border cursor-pointer select-none"
          >
            +{hiddenCount} more
          </span>
        )}
      </div>

      {/* ===== FLOATING PANEL ===== */}
      {open && (
        <div
          ref={panelRef}
          className={`absolute z-50 w-full max-w-md bg-background border rounded-lg shadow-lg p-3
            ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
        >
          <div className="flex flex-wrap gap-2 max-h-[200px] overflow-auto">
            {features.map((res, idx) => (
              <span
                key={idx}
                className="text-xs bg-muted px-2 py-1 rounded-full flex items-center gap-1 border"
              >
                <Wind className="w-3 h-3" />
                {res?.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
