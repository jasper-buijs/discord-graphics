import { EasternStandingsRow, WesternStandingsRow } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

export function fetchStandings(setEasternStandings: Dispatch<SetStateAction<EasternStandingsRow[]>>, setWesternStandings: Dispatch<SetStateAction<WesternStandingsRow[]>>) {
  const nhlUrl = `https://api-web.nhle.com/v1/standings/now`;
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(nhlUrl)}`;
  fetch(url, {
    method: "GET"
  }).then((r: any) => {
    return r.json();
  }).then((data: any) => {
    data = JSON.parse(data.contents);
    const standings = data.standings;
    let newEasternStandings: EasternStandingsRow[] = [];
    let newWesternStandings: WesternStandingsRow[] = [];
    standings.forEach((s: any) => {
      if (s.conferenceAbbrev == "E") {
        let easternStandingRow: EasternStandingsRow = {
          rank: s.conferenceSequence,
          team: s.teamAbbrev.default,
          gamesPlayed: s.gamesPlayed,
          won: s.wins,
          lost: s.losses,
          overtime: s.otLosses,
          points: s.points,
          pointsPercentage: s.pointPctg,
          regularWins: s.regulationWins,
          regularOvertimeWins: s.regulationPlusOtWins,
          goalsFor: s.goalFor,
          goalsAgainst: s.goalAgainst,
          goalDiff: s.goalDifferential
        };
        newEasternStandings.push(easternStandingRow);
      } else if (s.conferenceAbbrev == "W") {
        let westernStandingRow: WesternStandingsRow = {
          rank: s.conferenceSequence,
          team: s.teamAbbrev.default,
          gamesPlayed: s.gamesPlayed,
          won: s.wins,
          lost: s.losses,
          overtime: s.otLosses,
          points: s.points,
          pointsPercentage: s.pointPctg,
          regularWins: s.regulationWins,
          regularOvertimeWins: s.regulationPlusOtWins,
          goalsFor: s.goalFor,
          goalsAgainst: s.goalAgainst,
          goalDiff: s.goalDifferential
        };
        newWesternStandings.push(westernStandingRow);
      }
    });
    setEasternStandings(newEasternStandings);
    setWesternStandings(newWesternStandings);
  });
}