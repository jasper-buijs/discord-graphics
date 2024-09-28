export type Team = "ANA" | "BOS" | "BUF" | "CAR" | "CBJ" | "CGY" | "CHI" | "COL" | "DAL" | "DET" | "EDM" | "FLA" |
  "LAK" | "MIN" | "MTL" | "NJD" | "NSH" | "NYI" | "NYR" | "OTT" | "PHI" | "PIT" | "SEA" | "SJS" | "STL" |
  "TBL" | "TOR" | "UTA" | "VAN" | "VGK" | "WPG" | "WSH";

export type FinalType = "F" | "OT" | "SO" | "2OT" | "3OT" | "4OT" | "5OT" | "6OT";

export interface ScoreListItem {
    final: FinalType;
    visitingTeam: Team;
    visitingTeamScore: number;
    visitingTeamShootoutScore?: number;
    homeTeam: Team;
    homeTeamScore: number;
    homeTeamShootoutScore?: number;
}

export interface ScheduleListItem {
    visitingTeam: Team;
    homeTeam: Team;
    time: Date;
    neutralIce?: boolean;
}