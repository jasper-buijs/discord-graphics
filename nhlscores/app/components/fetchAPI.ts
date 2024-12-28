import {FinalType, ScheduleListItem, ScoreListItem} from "@/app/types";
import {Dispatch, SetStateAction} from "react";

export function fetchSchedule(updateScheduleList: Dispatch<SetStateAction<ScheduleListItem[]>>) {
  let toScheduleGames: ScheduleListItem[] = [];
  const now = new Date();
  //now.setDate(now.getDate() - 1); //uncomment for yesterday
  //const now = new Date("November 21, 2024 19:00:00");
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  //OLD const nhlUrl = `https://api-web.nhle.com/v1/schedule/${year}-${month}-${day}`;
  //OLD const url = `https://api.allorigins.win/get?url=${encodeURIComponent(nhlUrl)}`;
  //RUN opel -e https://api-web.nhle.com -p 8888
  const url = `http://localhost:8888/v1/schedule/${year}-${month}-${day}`;
  fetch(url, {
    method: "GET"
  }).then((r: any) => {
    return r.json();
  }).then((data: any) => {
    //data = JSON.parse(data);
    const gameWeek = data.gameWeek.filter((week: any) => week.date == `${year}-${month}-${day}`);
    gameWeek[0].games.forEach((g: any) => {
      let toScheduleGame: ScheduleListItem = {
        time: new Date(g.startTimeUTC),
        visitingTeam: g.awayTeam.abbrev,
        homeTeam: g.homeTeam.abbrev,
        neutralIce: g.neutralSite
      }
      toScheduleGames.push(toScheduleGame);
    });
    updateScheduleList(toScheduleGames);
  });
}

export function fetchScores(updateScoreList: Dispatch<SetStateAction<ScoreListItem[]>>) {
  let toScoreGames: ScoreListItem[] = [];
  const now = new Date();
  now.setDate(now.getDate() - 1);
  //now.setDate(now.getDate() - 1); //uncomment for yesterday
  //const now = new Date("November 20, 2024 19:00:00");
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  //const nhlUrl = `https://api-web.nhle.com/v1/score/${year}-${month}-${day}`;
  //const url = `https://api.allorigins.win/get?url=${encodeURIComponent(nhlUrl)}`;
  const url = `http://localhost:8888/v1/score/${year}-${month}-${day}`;
  fetch(url, {
    method: "GET"
  }).then((r: any) => {
    return r.json();
  }).then((data: any) => {
    //data = JSON.parse(data.contents);
    data.games.forEach((g: any) => {
      // REG / OT / SO
      let gameEnd: FinalType = "F";
      switch (g.gameOutcome.lastPeriodType) {
        case "REG":
          gameEnd = "F";
          break;
        case "OT":
          if (!g.gameOutcome.otPeriods) gameEnd = "OT";
          else {
            switch (g.gameOutcome.otPeriods) {
              case 1:
                gameEnd = "OT";
                break;
              case 2:
                gameEnd = "2OT";
                break;
              case 3:
                gameEnd = "3OT";
                break;
              case 4:
                gameEnd = "4OT";
                break;
              case 5:
                gameEnd = "5OT";
                break;
              case 6:
                gameEnd = "6OT";
                break;
            }
          }
          break;
        case "SO":
          gameEnd = "SO";
          break;
      }


      let toScoreGame: ScoreListItem = {
        final: gameEnd,
        visitingTeam: g.awayTeam.abbrev,
        visitingTeamScore: g.awayTeam.score,
        visitingTeamShootoutScore: gameEnd == "SO" ? 0 : undefined,
        homeTeam: g.homeTeam.abbrev,
        homeTeamScore: g.homeTeam.score,
        homeTeamShootoutScore: gameEnd == "SO" ? 0:undefined,
      }
      toScoreGames.push(toScoreGame);
    });
    updateScoreList(toScoreGames);
  });
}