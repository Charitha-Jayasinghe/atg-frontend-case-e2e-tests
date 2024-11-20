import React from "react";
import { SortOrder } from "../../types";
import { Select } from "../Select";

type Props = {
  value?: SortOrder;
  onChange: (value: SortOrder) => void;
};

const options = [
  {
    label: "Most recent first",
    value: SortOrder.DESC,
  },
  {
    label: "Oldest first",
    value: SortOrder.ASC,
  },
];

export function SelectDisplayOrder({ onChange, value }: Props) {
  return (
    <Select
      label="Display order"
      onChange={(e) => onChange(e.currentTarget.value as unknown as SortOrder)}
      value={value}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
