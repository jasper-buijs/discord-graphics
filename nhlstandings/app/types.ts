export const atlanticTeams = ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TBL", "TOR"] as const;
export type AtlanticTeam = (typeof atlanticTeams)[number];
export const isAtlanticTeam = (x: any): x is AtlanticTeam => atlanticTeams.includes(x);

export const metroTeams = ["CAR", "CBJ", "NJD", "NYI", "NYR", "PHI", "PIT", "WSH"] as const;
export type MetroTeam = (typeof metroTeams)[number];
export const isMetroTeam = (x: any): x is MetroTeam => metroTeams.includes(x);

export type EasternTeam = AtlanticTeam | MetroTeam;

export const centralTeams = ["CHI", "COL", "DAL", "MIN", "NSH", "STL", "UTA", "WPG"] as const;
export type CentralTeam = (typeof centralTeams)[number];
export const isCentralTeam = (x: any): x is CentralTeam => centralTeams.includes(x);

export const pacificTeams = ["ANA", "CGY", "EDM", "LAK", "SEA", "SJS", "VAN", "VGK"] as const;
export type PacificTeam = (typeof pacificTeams)[number];
export const isPacificTeam = (x: any): x is PacificTeam => pacificTeams.includes(x);

export type WesternTeam = CentralTeam | PacificTeam;

export interface StandingsRow {
  rank: number;
  team: EasternTeam | WesternTeam;
  gamesPlayed: number;
  won: number;
  lost: number;
  overtime: number;
  points: number;
  pointsPercentage: number;
  regularWins: number
  regularOvertimeWins: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  playoffClinch?: boolean;
}

export interface EasternStandingsRow extends Omit<StandingsRow, "team"> {
  team: EasternTeam;
}

export interface WesternStandingsRow extends Omit<StandingsRow, "team"> {
  team: WesternTeam;
}