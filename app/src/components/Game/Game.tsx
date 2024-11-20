import React from "react";
import { useFetchSuspense } from "../../hooks/useFetchSuspense";
import { GameResponse, Track } from "../../types";
import { Alert } from "../Alert";
import { Severity } from "../Alert/Alert.types";
import { Race } from "../Race";
import { GameContainer } from "./Game.styles";

type Props = {
  id: string;
  tracks: Track[];
  startTime: string;
};

const timeFormatter = new Intl.DateTimeFormat("se-SV", {
  dateStyle: "short",
  timeStyle: "short",
});

const getGameTitle = ({
  tracks,
  startTime,
}: {
  tracks: Track[];
  startTime: string;
}) => {
  const trackNames = tracks.map((track) => track.name).join(" & ");
  const formattedStartTime = timeFormatter.format(new Date(startTime));

  return `${trackNames} - ${formattedStartTime}`;
};

export function Game({ id, tracks, startTime }: Props) {
  const { data: game, error } = useFetchSuspense<GameResponse>(
    `https://www.atg.se/services/racinginfo/v1/api/games/${id}`,
  );

  const renderedRaces = React.useMemo(() => {
    if (error) {
      return (
        <Alert
          severity={Severity.ERROR}
          message="Failed to fetch races for game"
        />
      );
    }

    return game?.races.map((race) => {
      return <Race key={race.id} race={race} />;
    });
  }, [game, error]);

  return (
    <GameContainer>
      <h1>{getGameTitle({ tracks, startTime })}</h1>
      {renderedRaces}
    </GameContainer>
  );
}
