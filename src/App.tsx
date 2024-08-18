import { BellRingIcon, ChevronRight, RefreshCcw, Search } from "lucide-react";
import { Input } from "./components/ui/input";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Button } from "./components/ui/button";
import { Pie, Bar, Line, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import AddWidgetSheet from "./components/AddWidgetSheet";
import { useState } from "react";
import WidgetManagerSheet from "./components/WidgetManagerSheet";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

type Widget = {
  id: number;
  type: "pie" | "bar" | "line" | "radial";
  title: string;
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor?: string[];
      borderColor?: string;
    }[];
  };
  total?: number;
  isVisible: boolean; // Add this line
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
  const [charts, setCharts] = useState(
    initialCharts.map((chart) => ({ ...chart, isVisible: true }))
  );

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

  const renderChart = (chart: Widget) => {
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    switch (chart.type) {
      case "pie":
        return (
          <div className="w-1/2 relative" style={{ height: "150px" }}>
            <Pie
              data={chart.data}
              options={{
                ...commonOptions,
                cutout: "70%",
              }}
            />
            {chart.total && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-bold text-sm">{chart.total}</p>
                <p className="text-xs">Total</p>
              </div>
            )}
          </div>
        );
      case "bar":
        return (
          <div className="w-full" style={{ height: "200px" }}>
            <Bar data={chart.data} options={commonOptions} />
          </div>
        );
      case "line":
        return (
          <div className="w-full" style={{ height: "200px" }}>
            <Line data={chart.data} options={commonOptions} />
          </div>
        );
      case "radial":
        return (
          <div className="w-full" style={{ height: "200px" }}>
            <PolarArea
              data={chart.data}
              options={{
                ...commonOptions,
                scales: {
                  r: {
                    pointLabels: {
                      display: true,
                      centerPointLabels: true,
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderChartSection = (title: string, type: Widget["type"]) => {
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
              <div
                key={chart.id}
                className="bg-white rounded-lg shadow p-4"
                style={{ width: "300px", height: "100%" }}
              >
                <h3 className="text-sm font-semibold mb-2">{chart.title}</h3>
                <div className="flex items-center">
                  {renderChart(chart)}
                  {chart.type === "pie" && (
                    <div className="w-1/2 pl-4">
                      <ul className="text-xs">
                        {chart.data.labels.map((label, index) => (
                          <li key={label} className="flex items-center mb-1">
                            <span
                              className="w-3 h-3 mr-2"
                              style={{
                                backgroundColor:
                                  chart.data.datasets[0].backgroundColor?.[
                                    index
                                  ],
                              }}
                            ></span>
                            {label} ({chart.data.datasets[0].data[index]})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <AddWidgetSheet onAddWidget={handleAddWidget} />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-cyan-50 font-poppins">
      <ScrollArea className="h-screen">
        <section className="px-4 py-2 flex items-center justify-between w-full bg-white sticky top-0 z-10">
          <span className="flex items-center font-poppins">
            Home
            <ChevronRight size={20} />
            <strong>Dashboard V2</strong>
          </span>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input className="text-lg pl-10" placeholder="Search Anything..." />
          </div>
          <BellRingIcon className="text-muted-foreground" />
        </section>
        <div className="p-6 w-full">
          <div className="flex flex-col gap-8">
            <section className="flex items-center justify-between w-full">
              <h1 className="font-bold text-xl">CNAPP Dashboard</h1>
              <div className="flex items-center gap-4">
                <WidgetManagerSheet
                  charts={charts}
                  onToggleWidget={handleToggleWidget}
                />
                <Button variant="ghost" className="border-2">
                  <RefreshCcw />
                </Button>
              </div>
            </section>
            {renderChartSection("CSPM Executive Dashboard", "pie")}
            {renderChartSection("CWPP Dashboard", "bar")}
            {renderChartSection("Line Dashboard", "line")}
            {renderChartSection("Radial Dashboard", "radial")}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default App;
