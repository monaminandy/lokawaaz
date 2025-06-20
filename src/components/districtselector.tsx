interface DistrictSelectorProps {
  districts: string[];
  selectedDistrict?: string;
  onChange: (district: string) => void;
}

export const DistrictSelector = ({
  districts,
  selectedDistrict,
  onChange,
}: DistrictSelectorProps) => {
  return (
    <select
      value={selectedDistrict}
      onChange={(e) => onChange(e.target.value)}
      required
    >
      <option value="">Select District</option>
      {districts.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};
