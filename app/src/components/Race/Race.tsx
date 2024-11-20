import React from "react";
import type { Race } from "../../types";
import { StartList } from "../StartList";
import { RaceContainer, RaceBorder } from "./Race.styles";

const timeFormatter = new Intl.DateTimeFormat("se-SV", { timeStyle: "short" });

const getRaceTitle = ({ number, name, startTime }: Race) => {
  const titleParts = [
    number,
    name,
    timeFormatter.format(new Date(startTime)),
    // not all races have a name, therefore we filter out any part from the title with a falsy value
  ].filter((part) => !!part);

  return titleParts.join(" - ");
};

export function Race({ race }: { race: Race }) {
  return (
    <RaceBorder>
      <RaceContainer>
        <h2 id={race.id}>{getRaceTitle(race)}</h2>
        <StartList aria-labelledby={race.id} starts={race.starts} />
      </RaceContainer>
    </RaceBorder>
  );
}
