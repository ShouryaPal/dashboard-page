import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import WidgetManagerSheet from "./WidgetManagerSheet";

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

type DashboardTitleProps = {
  charts: Widget[];
  onToggleWidget: (id: number) => void;
  onResetCharts: () => void;
};

export function DashboardTitle({
  charts,
  onToggleWidget,
  onResetCharts,
}: DashboardTitleProps) {
  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="font-bold text-xl">CNAPP Dashboard</h1>
      <div className="flex items-center gap-4">
        <WidgetManagerSheet charts={charts} onToggleWidget={onToggleWidget} />
        <Button variant="ghost" className="border-2" onClick={onResetCharts}>
          <RefreshCcw />
        </Button>
      </div>
    </section>
  );
}
