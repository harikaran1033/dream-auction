import { useState } from "react";

const RetentionToggle = ({ value = false, onChange, className = "" }) => {
  const [enabled, setEnabled] = useState(value);

  const toggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 w-full ${className}`}
    >
      <span className="text-sm font-medium text-gray-300">
        Retention
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300
            ${enabled ? "bg-green-500" : "bg-gray-600"}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all duration-300
              ${enabled ? "translate-x-8" : "translate-x-1"}`}
          />
        </button>

        <span
          className={`text-sm font-semibold ${
            enabled ? "text-green-400" : "text-gray-400"
          }`}
        >
          {enabled ? "ON" : "OFF"}
        </span>
      </div>
    </div>
  );
};

export default RetentionToggle;
