"use client";

import { useState, useEffect } from "react";
import { StateSelector } from "./statesselector";
import { DistrictSelector } from "./districtselector";

interface Props {
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
}

export const StateDistrictForm = ({ onStateChange, onDistrictChange }: Props) => {
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const stateDistrictMap: Record<string, string[]> = {
    WB: ["Kolkata", "Howrah", "Darjeeling", "Burdwan"],
    MH: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    DL: ["Central Delhi", "South Delhi", "North Delhi"],
    KA: ["Bangalore Urban", "Mysuru", "Mangalore"],
    TN: ["Chennai", "Coimbatore", "Madurai"],
    RJ: ["Jaipur", "Jodhpur", "Udaipur"],
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setDistricts(stateDistrictMap[state] || []);
    setSelectedDistrict("");
    onStateChange(state); // Send to parent
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    onDistrictChange(district); // Send to parent
  };

  useEffect(() => {
    // Reset district when state changes
    setSelectedDistrict("");
  }, [selectedState]);

  return (
    <div className="space-y-4">
      <StateSelector onChange={handleStateChange} />
      <DistrictSelector
        districts={districts}
        selectedDistrict={selectedDistrict}
        onChange={handleDistrictChange}
      />
    </div>
  );
};
