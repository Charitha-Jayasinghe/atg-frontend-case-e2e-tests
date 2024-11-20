import styled from "@emotion/styled";

export const Container = styled.div`
  width: 80%;
  margin: auto;
`;

export const SelectWrapper = styled.div`
  > * {
    display: inline-block;
  }

  > *:not(:last-child) {
    margin-right: 1em;
  }
`;
