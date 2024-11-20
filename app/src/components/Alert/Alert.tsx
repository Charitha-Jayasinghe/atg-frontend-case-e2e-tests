import React from "react";
import { AlertContainer } from "./Alert.styles";
import { Severity } from "./Alert.types";

type Props = {
  severity: Severity;
  message: string;
};

export function Alert({ severity, message }: Props) {
  return (
    <AlertContainer role="alert" severity={severity}>
      {message}
    </AlertContainer>
  );
}
