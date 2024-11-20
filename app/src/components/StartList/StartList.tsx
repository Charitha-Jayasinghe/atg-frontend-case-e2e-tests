import React from "react";
import type { Start } from "../../types";
import { Details, Separator } from "./StartList.styles";

export interface StartListProps extends React.HTMLAttributes<HTMLOListElement> {
  starts: Start[];
}

export function StartList({ starts, ...rest }: StartListProps) {
  return (
    <ol {...rest}>
      {starts.map((start) => {
        const { number, horse, driver } = start;

        return (
          <li key={number}>
            <Details>
              <summary>
                {horse.name} - {driver.firstName} {driver.lastName}
              </summary>
              <dl>
                <Separator>
                  <dt>Tränare:</dt>
                  <dd>
                    {horse.trainer.firstName} {horse.trainer.lastName}
                  </dd>
                </Separator>
                <Separator>
                  <dt>Far:</dt>
                  <dd>{horse.pedigree.father.name}</dd>
                </Separator>
              </dl>
            </Details>
          </li>
        );
      })}
    </ol>
  );
}
