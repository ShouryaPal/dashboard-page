import { Pie, Bar, Line, PolarArea } from "react-chartjs-2";

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

type ChartWidgetProps = {
  chart: Widget;
};

export function ChartWidget({ chart }: ChartWidgetProps) {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const renderChart = () => {
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

  return (
    <div
      className="bg-white rounded-lg shadow p-4"
      style={{ width: "300px", height: "100%" }}
    >
      <h3 className="text-sm font-semibold mb-2">{chart.title}</h3>
      <div className="flex items-center">
        {renderChart()}
        {chart.type === "pie" && (
          <div className="w-1/2 pl-4">
            <ul className="text-xs">
              {chart.data.labels.map((label, index) => (
                <li key={label} className="flex items-center mb-1">
                  <span
                    className="w-3 h-3 mr-2"
                    style={{
                      backgroundColor:
                        chart.data.datasets[0].backgroundColor?.[index],
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
  );
}
