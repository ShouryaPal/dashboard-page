import { Checkbox } from "./ui/checkbox";

export type ChartType = "pie" | "bar" | "line" | "radial";

export type Dataset = {
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
};

export type WidgetData = {
  labels: string[];
  datasets: Dataset[];
};

export type Widget = {
  id: number;
  type: ChartType;
  title: string;
  data: WidgetData;
  total?: number;
  isVisible: boolean;
};

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
