export interface ScheduleGame {
  upcoming: boolean;
  final: boolean;
  overtime: boolean;
  shootout: boolean;
  group: "A" | "B";
  utcDate: string;
  utcTime: string;
  date: Date;
  localZOffset: string;
  localDate: string;
  home: string;
  visiting: string;
}