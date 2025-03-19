import { Label } from "@/components/ui/label";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";

interface MultiSelectProps {
  label: string;
  placeholder: string;
  defaultOptions: Option[];
}

export default function MultiSelect({
  label,
  placeholder,
  defaultOptions,
}: MultiSelectProps) {
  return (
    <div className="*:not-first:mt-2">
      <Label>{label}</Label>
      <MultipleSelector
        commandProps={{
          label: placeholder,
        }}
        defaultOptions={defaultOptions}
        placeholder={placeholder}
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
      />
    </div>
  );
}
