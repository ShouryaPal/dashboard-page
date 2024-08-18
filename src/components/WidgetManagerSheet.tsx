import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus } from "lucide-react";
import { WidgetTabContent } from "./WidgetTabContent";

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

type WidgetManagerSheetProps = {
  charts: Widget[];
  onToggleWidget: (id: number) => void;
};

function WidgetManagerSheet({
  charts,
  onToggleWidget,
}: WidgetManagerSheetProps) {
  const [open, setOpen] = useState<boolean>(false);

  const dashboardTypes: string[] = ["CSPM", "CWPP", "Line", "Radial"];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="border-2 gap-2">
          Add/Remove Widget <Plus size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Manage Widgets</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="CSPM" className="w-full">
          <TabsList>
            {dashboardTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          {dashboardTypes.map((type) => (
            <WidgetTabContent
              key={type}
              type={type}
              charts={charts}
              onToggleWidget={onToggleWidget}
            />
          ))}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

export default WidgetManagerSheet;
