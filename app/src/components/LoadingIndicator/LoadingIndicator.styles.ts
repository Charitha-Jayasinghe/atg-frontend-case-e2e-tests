import styled from "@emotion/styled";

export const Rect = styled.div<{ index: number }>`
  background: #004f9f;
  height: 100%;
  width: 7px;
  margin: 0 3px 0 0;
  display: inline-block;
  animation: stretchdelay 1.2s infinite ease-in-out;
  animation-delay: ${({ index }) => -1.2 + index / 10}s;

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
`;

export const LoadingIndicatorRoot = styled.div`
  margin: 30px auto;
  width: 70px;
  height: 50px;
  text-align: center;
  transform: skew(-22.5deg, 0);
`;
