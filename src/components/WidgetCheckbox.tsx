import { Checkbox } from "./ui/checkbox";
import { Widget } from "../App";

type WidgetCheckboxProps = {
  chart: Widget;
  onToggle: (id: number) => void;
};

export function WidgetCheckbox({ chart, onToggle }: WidgetCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`widget-${chart.id}`}
        checked={chart.isVisible}
        onCheckedChange={() => onToggle(chart.id)}
      />
      <label htmlFor={`widget-${chart.id}`}>{chart.title}</label>
    </div>
  );
}