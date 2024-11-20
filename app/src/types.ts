export const betTypes = ["V75", "V86", "GS75"] as const;

export type BetType = typeof betTypes[number];

export enum SortOrder {
  ASC = 1,
  DESC = -1,
}

export interface GameResponse {
  id: string;
  races: Race[];
}

export interface Race {
  id: string;
  name: string;
  number: number;
  startTime: string;
  starts: Start[];
}

export interface BetTypeResult {
  id: string;
  tracks: Track[];
  startTime: string;
}

export interface Track {
  id: number;
  name: string;
}

export interface BetTypeResponse {
  results: BetTypeResult[];
}

export interface Start {
  number: number;
  horse: Horse;
  driver: Driver;
}

export interface Driver {
  firstName: string;
  lastName: string;
}

export interface Horse {
  id: number;
  name: string;
  pedigree: Pedigree;
  trainer: Trainer;
}

export interface Trainer {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Pedigree {
  father: { id: number; name: string };
  mother: { id: number; name: string };
}
