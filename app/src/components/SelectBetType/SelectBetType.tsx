import React from "react";
import { BetType, betTypes } from "../../types";
import { Select } from "../Select";

type Props = {
  onChange: (value: BetType | "") => void;
};

export function SelectBetType({ onChange }: Props) {
  return (
    <Select
      label="Select bet type"
      onChange={(e) => onChange(e.currentTarget.value as BetType | "")}
    >
      <option value="" />
      {betTypes.map((betType) => (
        <option key={betType} value={betType}>
          {betType}
        </option>
      ))}
    </Select>
  );
}
