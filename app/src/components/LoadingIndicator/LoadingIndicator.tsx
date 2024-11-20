import React, { useState } from "react";
import { LoadingIndicatorRoot, Rect } from "./LoadingIndicator.styles";
import { useDebouncedLayoutEffect } from "../../hooks/useDebouncedLayoutEffect";

const NUMBER_OF_RECTS = 5;
const Rects = Array.from([...new Array(NUMBER_OF_RECTS)]).map((_, index) => (
  <Rect key={index} index={index} />
));

type Props = {
  delay?: number;
};

export function LoadingIndicator({ delay = 200 }: Props) {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

  useDebouncedLayoutEffect(
    () => {
      // delay showing loading indicator (default: 200ms) in case loading is quick to avoid flickering
      setShowLoadingIndicator(true);
    },
    [],
    delay,
  );

  return showLoadingIndicator ? (
    <LoadingIndicatorRoot>{Rects}</LoadingIndicatorRoot>
  ) : null;
}
