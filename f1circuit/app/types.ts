export type Series = "F1" | "F1S" | "F2" | "F3" | "FA";

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