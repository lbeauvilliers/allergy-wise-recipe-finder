
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export type RegionType = 
  | "EU" 
  | "UK" 
  | "GCC" 
  | "SouthAfrica" 
  | "US" 
  | "Canada" 
  | "AustraliaNewZealand" 
  | "Japan" 
  | "Codex";

interface RegionSelectProps {
  selectedRegion: RegionType;
  onRegionChange: (region: RegionType) => void;
}

const RegionSelect = ({ selectedRegion, onRegionChange }: RegionSelectProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-5 w-5 text-gray-500" />
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Select region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EU">European Union</SelectItem>
          <SelectItem value="UK">United Kingdom</SelectItem>
          <SelectItem value="GCC">Gulf Cooperation Council</SelectItem>
          <SelectItem value="SouthAfrica">South Africa</SelectItem>
          <SelectItem value="US">United States</SelectItem>
          <SelectItem value="Canada">Canada</SelectItem>
          <SelectItem value="AustraliaNewZealand">Australia & New Zealand</SelectItem>
          <SelectItem value="Japan">Japan</SelectItem>
          <SelectItem value="Codex">Codex Alimentarius</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RegionSelect;
