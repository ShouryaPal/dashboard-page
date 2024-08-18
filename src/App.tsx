import { useState } from "react";
import { ScrollArea } from "./components/ui/scroll-area";
import { Header } from "./components/Header";
import { DashboardTitle } from "./components/DashboardTitle";
import { ChartSection } from "./components/ChartSection";

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

const initialCharts: Widget[] = [
  {
    id: 1,
    type: "pie",
    title: "Cloud Accounts",
    data: {
      labels: ["Connected", "Not Connected"],
      datasets: [
        {
          data: [2, 2],
          backgroundColor: ["#4285F4", "#E8EAED"],
        },
      ],
    },
    total: 4,
    isVisible: true,
  },
  {
    id: 2,
    type: "bar",
    title: "Monthly Revenue",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      datasets: [
        {
          data: [1000, 1500, 1200, 1800, 2000],
          backgroundColor: ["#4285F4"],
        },
      ],
    },
    isVisible: true,
  },
  {
    id: 3,
    type: "line",
    title: "User Growth",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          data: [100, 250, 300, 450],
          borderColor: "#34A853",
        },
      ],
    },
    isVisible: true,
  },
  {
    id: 4,
    type: "radial",
    title: "Project Completion",
    data: {
      labels: ["Project A", "Project B", "Project C"],
      datasets: [
        {
          data: [75, 60, 90],
          backgroundColor: ["#EA4335", "#FBBC05", "#34A853"],
        },
      ],
    },
    isVisible: true,
  },
];

function App() {
  const [charts, setCharts] = useState(initialCharts);

  const handleToggleWidget = (id: number) => {
    setCharts(
      charts.map((chart) =>
        chart.id === id ? { ...chart, isVisible: !chart.isVisible } : chart
      )
    );
  };

  const handleAddWidget = (newWidget: Widget) => {
    setCharts([...charts, newWidget]);
  };

  const handleResetCharts = () => {
    setCharts(initialCharts);
  };

  return (
    <div className="w-full min-h-screen bg-cyan-50 font-poppins">
      <ScrollArea className="h-screen">
        <Header />
        <div className="p-6 w-full">
          <div className="flex flex-col gap-8">
            <DashboardTitle
              charts={charts}
              onToggleWidget={handleToggleWidget}
              onResetCharts={handleResetCharts}
            />
            <ChartSection
              title="CSPM Executive Dashboard"
              type="pie"
              charts={charts}
              onAddWidget={handleAddWidget}
            />
            <ChartSection
              title="CWPP Dashboard"
              type="bar"
              charts={charts}
              onAddWidget={handleAddWidget}
            />
            <ChartSection
              title="Line Dashboard"
              type="line"
              charts={charts}
              onAddWidget={handleAddWidget}
            />
            <ChartSection
              title="Radial Dashboard"
              type="radial"
              charts={charts}
              onAddWidget={handleAddWidget}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default App;
