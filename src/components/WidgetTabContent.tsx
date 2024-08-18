import { TabsContent } from "./ui/tabs";
import { WidgetCheckbox } from "./WidgetCheckbox";

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

type WidgetTabContentProps = {
  type: string;
  charts: Widget[];
  onToggleWidget: (id: number) => void;
};

export function WidgetTabContent({
  type,
  charts,
  onToggleWidget,
}: WidgetTabContentProps) {
  const tabToChartTypeMap: Record<string, ChartType> = {
    CSPM: "pie",
    CWPP: "bar",
    Line: "line",
    Radial: "radial",
  };

  return (
    <TabsContent value={type}>
      {charts
        .filter((chart) => chart.type === tabToChartTypeMap[type])
        .map((chart) => (
          <WidgetCheckbox
            key={chart.id}
            chart={chart}
            onToggle={onToggleWidget}
          />
        ))}
    </TabsContent>
  );
}
