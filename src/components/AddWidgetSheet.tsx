import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { WidgetForm } from "./WidgetForm";

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

type AddWidgetSheetProps = {
  onAddWidget: (widget: Widget) => void;
};

const AddWidgetSheet = ({ onAddWidget }: AddWidgetSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="flex items-center justify-center bg-white shadow-md rounded-lg"
          style={{ width: "300px", height: "100%" }}
        >
          <Button variant="ghost" className="text-sm border-dashed border-2">
            + Add Widget
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Widget</SheetTitle>
          <SheetDescription>
            Fill in the details to add a new chart widget.
          </SheetDescription>
        </SheetHeader>
        <WidgetForm onSubmit={onAddWidget} />
      </SheetContent>
    </Sheet>
  );
};

export default AddWidgetSheet;
