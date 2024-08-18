import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { ChartWidget } from "./ChartWidget";
import AddWidgetSheet from "./AddWidgetSheet";

type Dataset = {
  data: number[];
  backgroundColor?: string[];
  borderColor?: string;
};

type WidgetData = {
  labels: string[];
  datasets: Dataset[];
};

type Widget = {
  id: number;
  type: "pie" | "bar" | "line" | "radial";
  title: string;
  data: WidgetData;
  total?: number;
  isVisible: boolean;
};

type ChartSectionProps = {
  title: string;
  type: Widget["type"];
  charts: Widget[];
  onAddWidget: (newWidget: Widget) => void;
};

export function ChartSection({
  title,
  type,
  charts,
  onAddWidget,
}: ChartSectionProps) {
  const filteredCharts = charts.filter(
    (chart) => chart.type === type && chart.isVisible
  );

  return (
    <div className="mb-8">
      <p className="font-semibold mb-4">{title}</p>
      <ScrollArea className="w-full" type="always">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4"
          style={{ minWidth: "max-content" }}
        >
          {filteredCharts.map((chart) => (
            <ChartWidget key={chart.id} chart={chart} />
          ))}
          <AddWidgetSheet onAddWidget={onAddWidget} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
