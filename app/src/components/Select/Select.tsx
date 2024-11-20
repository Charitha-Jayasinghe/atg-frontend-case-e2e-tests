import React from "react";
import { Select as StyledSelect } from "./Select.styles";

type Props = {
  label: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ label, children, ...selectProps }: Props) {
  return (
    <label>
      {label}: <StyledSelect {...selectProps}>{children}</StyledSelect>
    </label>
  );
}
