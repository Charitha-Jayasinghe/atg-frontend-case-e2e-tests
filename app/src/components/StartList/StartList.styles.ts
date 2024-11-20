import styled from "@emotion/styled";

export const Separator = styled.div`
  display: flex;
`;

export const Details = styled.details`
  > summary {
    padding: 8px 0;
    cursor: pointer;
    transition: background-color ease 175ms;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;
