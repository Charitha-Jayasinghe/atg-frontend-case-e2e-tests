import React, { useMemo } from "react";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { BetType, BetTypeResponse, SortOrder } from "../../types";
import { sortBy } from "../../utils/sortBy";
import { Alert } from "../Alert";
import { Severity } from "../Alert/Alert.types";
import { Game } from "../Game";

type Props = {
  betType: BetType;
  displayOrder?: SortOrder;
};

export function BetTypeResult({ betType, displayOrder }: Props) {
  const { data: betResult, error } = useFetchSuspense<BetTypeResponse>(
    `https://www.atg.se/services/racinginfo/v1/api/products/${betType}`,
  );

  const sortedBetResults = useMemo(() => {
    if (!betResult?.results.length) return [];
    if (!displayOrder) return betResult.results;

    return sortBy(
      ({ startTime }) => new Date(startTime).getTime(),
      displayOrder,
      betResult.results,
    );
  }, [betResult, displayOrder]);

  return (
    <div aria-live="polite">
      {error && (
        <Alert
          severity={Severity.ERROR}
          message={`Failed to fetch results for ${betType} game`}
        />
      )}

      {sortedBetResults.map((result) => {
        return (
          <Game
            key={result.id}
            id={result.id}
            tracks={result.tracks}
            startTime={result.startTime}
          />
        );
      })}
    </div>
  );
}
