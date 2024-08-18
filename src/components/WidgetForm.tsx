import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

type WidgetFormProps = {
  onSubmit: (widget: Widget) => void;
};

export function WidgetForm({ onSubmit }: WidgetFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Widget["type"]>("pie");
  const [labels, setLabels] = useState(["", ""]);
  const [data, setData] = useState(["", ""]);

  const handleAddLabel = () => {
    setLabels([...labels, ""]);
    setData([...data, ""]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newWidget: Widget = {
      id: Date.now(),
      type,
      title,
      data: {
        labels: labels.filter((label) => label !== ""),
        datasets: [
          {
            data: data.filter((d) => d !== "").map(Number),
            backgroundColor: labels.map(
              () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
            ),
            borderColor:
              type === "line"
                ? `#${Math.floor(Math.random() * 16777215).toString(16)}`
                : undefined,
          },
        ],
      },
      isVisible: true,
    };
    if (type === "pie") {
      newWidget.total = data.reduce((acc, curr) => acc + Number(curr), 0);
    }
    onSubmit(newWidget);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setType("pie");
    setLabels(["", ""]);
    setData(["", ""]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label htmlFor="title">Chart Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Chart Type</Label>
        <Select
          onValueChange={(value: string) => setType(value as Widget["type"])}
          value={type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectContent>
              <SelectItem value="pie">CSPM Dashboard</SelectItem>
              <SelectItem value="bar">CWPP Dashboard</SelectItem>
              <SelectItem value="line">Line Dashboard</SelectItem>
              <SelectItem value="radial">Radial Dashboard</SelectItem>
            </SelectContent>
          </SelectContent>
        </Select>
      </div>
      {labels.map((label, index) => (
        <div key={index} className="flex space-x-2">
          <div className="flex-1">
            <Label htmlFor={`label-${index}`}>Label {index + 1}</Label>
            <Input
              id={`label-${index}`}
              value={label}
              onChange={(e) => {
                const newLabels = [...labels];
                newLabels[index] = e.target.value;
                setLabels(newLabels);
              }}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`data-${index}`}>Value {index + 1}</Label>
            <Input
              id={`data-${index}`}
              type="number"
              value={data[index]}
              onChange={(e) => {
                const newData = [...data];
                newData[index] = e.target.value;
                setData(newData);
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <Button type="button" onClick={handleAddLabel}>
          Add Label
        </Button>
        <Button type="submit">Create Widget</Button>
      </div>
    </form>
  );
}
