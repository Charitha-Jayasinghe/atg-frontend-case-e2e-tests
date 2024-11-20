import React, { useLayoutEffect } from "react";

export const useDebouncedLayoutEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList,
  delay: number,
) => {
  useLayoutEffect(() => {
    const timeout = setTimeout(effect, delay);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
