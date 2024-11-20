export type Series = "F1" | "F1S" | "F2" | "F3" | "FA";
// Adapt to 2025 API:
export type F1Team = "Red Bull Racing" | "McLaren" | "Ferrari" | "Racing Bulls" | "Williams" | "Alpine" | "Haas" |
  "Aston Martin" | "Mercedes" | "Sauber";
export type F2Team = "AIX" | "ART" | "Campos" | "Dams" | "Hitech" | "Invicta" | "MP" | "Prema" | "Rodin" |
  "Trident" | "VAR";
export type F3Team = "AIX" | "ART" | "Campos" | "Dams" | "Hitech" | "MP" | "Prema" | "Rodin" | "Trident" | "VAR";
export type FATeam = "ART" | "Campos" | "MP" | "Prema" | "Rodin";
export type Team = F1Team | F2Team | F3Team | FATeam;

export interface CalendarRow {
  eventKey: string;
  countryCode: string;
  countryName: string;
  shortEventName: string;
  fullEventName: string;
  circuitName: string;
  sprint?: boolean;
  testingEvent?: boolean;
}
export interface SeriesData {
  year: number;
  series: Omit<Series, "F1S">;
  calendar: CalendarRow[];
}

export interface GridDriverData {
  position: number;
  firstName: string;
  lastName: string;
  chineseName?: boolean;
  team: Team;
  investigation?: boolean;
  penalty?: boolean;
  pitLaneStart?: boolean;
}