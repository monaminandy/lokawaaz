interface StateSelectorProps {
  onChange: (stateCode: string) => void;
}

export const StateSelector = ({ onChange }: StateSelectorProps) => {
  return (
    <select onChange={(e) => onChange(e.target.value)} required>
      <option value="">Select State</option>
      <option value="WB">West Bengal</option>
      <option value="MH">Maharashtra</option>
      <option value="DL">Delhi</option>
      <option value="KA">Karnataka</option>
      <option value="TN">Tamil Nadu</option>
      <option value="RJ">Rajasthan</option>
    </select>
  );
};
