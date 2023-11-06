import { Badge } from "@/components/ui/badge";
import {
  Playstation,
  Xbox,
  NintendoSwitch,
  Windows,
} from "react-bootstrap-icons";

export function PS5Badge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-slate-50 text-slate-950 hover:bg-slate-200 duration-300">
      <Playstation />
      <span>PS5</span>
    </Badge>
  );
}

export function PS4Badge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-[#006FCD] text-white hover:bg-[#1043B3] duration-300">
      <Playstation />
      <span>PS4</span>
    </Badge>
  );
}

export function XSeriesBadge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-[#107C11] text-white hover:bg-[#073808] duration-300">
      <Xbox />
      <span>Series</span>
    </Badge>
  );
}

export function XOneBadge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-[#7EB900] text-white hover:bg-[#4a6d00] duration-300">
      <Xbox />
      <span>XBO</span>
    </Badge>
  );
}

export function NSwitchBadge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-[#E70009] text-white hover:bg-[#9b0006] duration-300">
      <NintendoSwitch />
      <span>Switch</span>
    </Badge>
  );
}

export function PCBadge() {
  return (
    <Badge className="flex gap-1 px-1.5 bg-[#00BCF2] text-white hover:bg-[#0081a6] duration-300">
      <Windows />
      <span>PC</span>
    </Badge>
  );
}
