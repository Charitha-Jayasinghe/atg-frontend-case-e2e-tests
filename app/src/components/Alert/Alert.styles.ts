import styled from "@emotion/styled";
import { Severity } from "./Alert.types";

const backgroundColor = {
  [Severity.WARNING]: "#fbdec0",
  [Severity.ERROR]: "#f8c0c5",
};

export const AlertContainer = styled.div<{ severity: Severity }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ severity }) => backgroundColor[severity]};
  padding: 1em;
`;
