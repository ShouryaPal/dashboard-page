import { TabsContent } from "./ui/tabs";
import { WidgetCheckbox } from "./WidgetCheckbox";
import { Widget, ChartType } from "../App";

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
