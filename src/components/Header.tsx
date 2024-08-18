import { BellRingIcon, ChevronRight, Search } from "lucide-react";
import { Input } from "./ui/input";

export function Header() {
  return (
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
  );
}