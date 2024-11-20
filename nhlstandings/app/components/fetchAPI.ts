import { EasternStandingsRow, WesternStandingsRow } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

export function fetchStandings(setEasternStandings: Dispatch<SetStateAction<EasternStandingsRow[]>>, setWesternStandings: Dispatch<SetStateAction<WesternStandingsRow[]>>) {
  //OLD const nhlUrl = `https://api-web.nhle.com/v1/standings/now`;
  //OLD const url = `https://api.allorigins.win/get?url=${encodeURIComponent(nhlUrl)}`;
  const url = `http://localhost:8888/v1/standings/now`;
  fetch(url, {
    method: "GET"
  }).then((r: any) => {
    return r.json();
  }).then((data: any) => {
    console.log(data);
    //data = JSON.parse(data.contents);
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