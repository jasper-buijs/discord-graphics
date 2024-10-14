"use client";

import showEasternGraphic from "@/app/components/easternGraphic";
import { fetchStandings } from "@/app/components/fetchAPI";
import showWesternGraphic from "@/app/components/westernGraphic";
import {
  atlanticTeams,
  centralTeams,
  EasternStandingsRow,
  EasternTeam,
  metroTeams,
  pacificTeams, WesternStandingsRow,
  WesternTeam,
} from "@/app/types";
import {Inter} from "next/font/google";
import { useState } from "react";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const easternTeams = [...atlanticTeams, ...metroTeams];
  const initialEasternStandings = easternTeams.map((t: EasternTeam, i): EasternStandingsRow => {
      return {
        rank: i + 1,
        team: t,
        gamesPlayed: 0,
        won: 0,
        lost: 0,
        overtime: 0,
        points: 0,
        pointsPercentage: 0,
        regularWins: 0,
        regularOvertimeWins: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDiff: 0
      }
  });
  const [easternStandings, setEasternStandings] = useState<EasternStandingsRow[]>(initialEasternStandings);

  const westernTeams = [...centralTeams, ...pacificTeams];
  const initialWesternStandings = westernTeams.map((t: WesternTeam, i): WesternStandingsRow => {
    return {
      rank: i + 1,
      team: t,
      gamesPlayed: 0,
      won: 0,
      lost: 0,
      overtime: 0,
      points: 0,
      pointsPercentage: 0,
      regularWins: 0,
      regularOvertimeWins: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0
    }
  });
  const [westernStandings, setWesternStandings] = useState<WesternStandingsRow[]>(initialWesternStandings);



  function onFetchStandings() {
    fetchStandings(setEasternStandings, setWesternStandings);
  }



  function updateEasternRanking(r: number, i: number) {
    let oldStandings = [...easternStandings];
    if (r < i) {
      const rowToMove = oldStandings.splice(i, 1)[0];
      oldStandings.splice(r - 1, 0, rowToMove);
      for (let j = r; j <= i; j++) {
        oldStandings[j].rank++;
      }
    } else if (r > i) {
      const rowToMove = oldStandings.splice(i, 1)[0];
      oldStandings.splice(r - 1, 0, rowToMove);
      for (let j = r - 2; j >= i; j--) {
        oldStandings[j].rank--;
      }
    }
    setEasternStandings(oldStandings);
  }

  function onEditEasternStanding(i: number) {
    let oldStandings = [...easternStandings];
    oldStandings[i].rank = Number(prompt(`#Rank of ${oldStandings[i].team}:`, String(oldStandings[i].rank)));
    oldStandings[i].gamesPlayed = Number(prompt(`GP by ${oldStandings[i].team}:`, String(oldStandings[i].gamesPlayed)));
    oldStandings[i].won = Number(prompt(`W by ${oldStandings[i].team}:`, String(oldStandings[i].won)));
    oldStandings[i].overtime = Number(prompt(`OT by ${oldStandings[i].team}:`, String(oldStandings[i].overtime)));
    oldStandings[i].lost = oldStandings[i].gamesPlayed - (oldStandings[i].won + oldStandings[i].overtime);
    oldStandings[i].points = (oldStandings[i].won * 2) + oldStandings[i].overtime;
    oldStandings[i].pointsPercentage = Number(prompt(`P% by ${oldStandings[i].team}:`, String(oldStandings[i].pointsPercentage)));
    oldStandings[i].regularWins = Number(prompt(`Regulation Wins by ${oldStandings[i].team}:`, String(oldStandings[i].regularWins)));
    oldStandings[i].regularOvertimeWins = Number(prompt(`Regulation or OT Wins by ${oldStandings[i].team}:`, String(oldStandings[i].regularOvertimeWins)));
    oldStandings[i].goalsFor = Number(prompt(`Goals For ${oldStandings[i].team}:`, String(oldStandings[i].goalsFor)));
    oldStandings[i].goalsAgainst = Number(prompt(`Goals Against ${oldStandings[i].team}:`, String(oldStandings[i].goalsAgainst)));
    oldStandings[i].goalDiff = oldStandings[i].goalsFor - oldStandings[i].goalsAgainst;
    setEasternStandings(oldStandings);
    updateEasternRanking(oldStandings[i].rank, i);
  }

  function toggleEasternPlayoffClinch(i: number, event: any) {
    let oldStandings = [...easternStandings];
    oldStandings[i].playoffClinch = event.target.checked;
    setEasternStandings(oldStandings);
  }

  function showEasternStandings() {
    let returnValue = [];
    returnValue.push(<>
      <div className={"inline-block mt-2"}>{`#R - TEA - W/OT/GP - Pts`}</div>
      <br />
    </>);
    for (let i = 0; i < easternStandings.length; i++) {
      returnValue.push(<>
        <div key={easternStandings[i].team} className={"inline-block mt-2"}>{`#${easternStandings[i].rank} - ${easternStandings[i].team} - ${easternStandings[i].won}/${easternStandings[i].overtime}/${easternStandings[i].gamesPlayed} - ${easternStandings[i].points}`}</div>
        <button
          className={"inline-block ml-4 px-2 border-[1px] border-orange-600 text-orange-600 rounded-md hover:text-black hover:bg-orange-600"}
          onClick={() => onEditEasternStanding(i)}
        >
          EDIT STANDINGS
        </button>
        <div className={"inline-block ml-4 px-2 border-[1px] border-orange-600 text-orange-600 rounded-md"}>
          <input type={"checkbox"} name={"playoffClinchEasternSelector"} defaultValue={easternStandings[i].playoffClinch ? 1 : 0} onChange={(e) => toggleEasternPlayoffClinch(i, e)} />
          <div className={"inline-block ml-2"}>TOGGLE PLAYOFF CLINCH</div>
        </div>
        <br />
      </>);
    }
    return returnValue;
  }



  function updateWesternRanking(r: number, i: number) {
    let oldStandings = [...westernStandings];
    if (r < i) {
      const rowToMove = oldStandings.splice(i, 1)[0];
      oldStandings.splice(r - 1, 0, rowToMove);
      for (let j = r; j <= i; j++) {
        oldStandings[j].rank++;
      }
    } else if (r > i) {
      const rowToMove = oldStandings.splice(i, 1)[0];
      oldStandings.splice(r - 1, 0, rowToMove);
      for (let j = r - 2; j >= i; j--) {
        oldStandings[j].rank--;
      }
    }
    setWesternStandings(oldStandings);
  }

  function onEditWesternStanding(i: number) {
    let oldStandings = [...westernStandings];
    oldStandings[i].rank = Number(prompt(`#Rank of ${oldStandings[i].team}:`, String(oldStandings[i].rank)));
    oldStandings[i].gamesPlayed = Number(prompt(`GP by ${oldStandings[i].team}:`, String(oldStandings[i].gamesPlayed)));
    oldStandings[i].won = Number(prompt(`W by ${oldStandings[i].team}:`, String(oldStandings[i].won)));
    oldStandings[i].overtime = Number(prompt(`OT by ${oldStandings[i].team}:`, String(oldStandings[i].overtime)));
    oldStandings[i].lost = oldStandings[i].gamesPlayed - (oldStandings[i].won + oldStandings[i].overtime);
    oldStandings[i].points = (oldStandings[i].won * 2) + oldStandings[i].overtime;
    oldStandings[i].pointsPercentage = Number(prompt(`P% by ${oldStandings[i].team}:`, String(oldStandings[i].pointsPercentage)));
    oldStandings[i].regularWins = Number(prompt(`Regulation Wins by ${oldStandings[i].team}:`, String(oldStandings[i].regularWins)));
    oldStandings[i].regularOvertimeWins = Number(prompt(`Regulation or OT Wins by ${oldStandings[i].team}:`, String(oldStandings[i].regularOvertimeWins)));
    oldStandings[i].goalsFor = Number(prompt(`Goals For ${oldStandings[i].team}:`, String(oldStandings[i].goalsFor)));
    oldStandings[i].goalsAgainst = Number(prompt(`Goals Against ${oldStandings[i].team}:`, String(oldStandings[i].goalsAgainst)));
    oldStandings[i].goalDiff = oldStandings[i].goalsFor - oldStandings[i].goalsAgainst;
    setWesternStandings(oldStandings);
    updateWesternRanking(oldStandings[i].rank, i);
  }

  function toggleWesternPlayoffClinch(i: number, event: any) {
    let oldStandings = [...westernStandings];
    oldStandings[i].playoffClinch = event.target.checked;
    setWesternStandings(oldStandings);
  }

  function showWesternStandings() {
    let returnValue = [];
    returnValue.push(<>
      <div className={"inline-block mt-2"}>{`#R - TEA - W/OT/GP - Pts`}</div>
      <br />
    </>);
    for (let i = 0; i < westernStandings.length; i++) {
      returnValue.push(<>
        <div key={westernStandings[i].team} className={"inline-block mt-2"}
        >{`#${westernStandings[i].rank} - ${westernStandings[i].team} - ${westernStandings[i].won}/${westernStandings[i].overtime}/${westernStandings[i].gamesPlayed} - ${westernStandings[i].points}`}</div>
        <button
          className={"inline-block ml-4 px-2 border-[1px] border-orange-600 text-orange-600 rounded-md hover:text-black hover:bg-orange-600"}
          onClick={() => onEditWesternStanding(i)}
        >
          EDIT STANDINGS
        </button>
        <div className={"inline-block ml-4 px-2 border-[1px] border-orange-600 text-orange-600 rounded-md"}>
          <input type={"checkbox"} name={"playoffClinchWesternSelector"}
            defaultValue={(westernStandings[i].playoffClinch ? 1 : 0)} onChange={(e) => toggleWesternPlayoffClinch(i, e)}
          />
          <div className={"inline-block ml-2"}>TOGGLE PLAYOFF CLINCH</div>
        </div>
        <br />
      </>);
    }
    return returnValue;
  }


  function showLegendItem(icon: string, text: string) {
    if (icon == "_PLAYOFF") {
      return (<>
        <div className={"w-12 inline-block"}>
          <div className={"flex w-5 h-5 justify-center items-center bg-gray-300 text-black rounded-md"}>x</div>
        </div>
        <div className={"inline-block"}>{text}</div>
        <br />
      </>);
    }
    return (<>
      <div className={"font-semibold w-12 inline-block"}>{icon}</div>
      <div className={"inline-block"}>{text}</div>
      <br />
    </>);
  }


  return (
    <>
      {/* GRAPHIC PREVIEW */}
      <div className="bg-black w-[1800px] overflow-y-scroll" id={"graphic"}>
        {/* Header */}
        <div className="sticky top-0 w-full h-32 bg-[#252525] text-center">
          <img src="/assets/NHL.png" className="h-full py-4 pr-8 inline-block" alt="NHL" />
          <div className={"inline-block text-white font-semibold text-5xl align-middle " + inter.className}>
            NHL Stanley Cup: Regular Season Standings
          </div>
        </div>

        {/* Left Column (Western) */}
        <div className="w-1/2 float-left">
          <div className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}>
            Western Conference
          </div>
          <div className="relative">
            {showWesternGraphic(westernStandings)}
          </div>
        </div>

        {/* Right Column (Eastern) */}
        <div className="w-1/2 float-right">
          <div className={"h-16 text-center bg-[#1f1f1f] text-white leading-[4rem] text-2xl border-r-[1px] border-black " + inter.className}>
            Eastern Conference
          </div>
          <div className="relative">
            {showEasternGraphic(easternStandings)}
          </div>
        </div>

        {/* Legend */}
        <div className={"flex flex-row gap-x-4 float-end w-full py-4 px-20"}>
          <div className={"flex-auto flex flex-row gap-x-4 border border-white rounded-lg w-fit p-4"}>
            <div className={"text-white " + inter.className}>
              {showLegendItem("GP", "Games Started")}
              {showLegendItem("W", "Wins (2 points)")}
              {showLegendItem("L", "Losses (no points")}
              {showLegendItem("OT", "OT/PSS Losses (1 point)")}
              {showLegendItem("Pts", "Points")}
              {showLegendItem("_PLAYOFF", "Playoff Spot Clinched")}
            </div>
            <div className={"text-white " + inter.className}>
              {showLegendItem("P%", "Season Points Percentage")}
              {showLegendItem("RW", "Wins in Regulation Time")}
              {showLegendItem("ROW", "Wins in Regulation or OT")}
              {showLegendItem("GF", "Goals For")}
              {showLegendItem("GA", "Goals Against")}
              {showLegendItem("ΔG", "Goal Differential")}
            </div>
          </div>
          <div className={"flex-auto border border-white rounded-lg w-fit p-4 inline-block"}>
            <div className={"text-white " + inter.className}>
              <div className={"font-semibold"}>Tie-Breaking Procedure</div>
              <div>If two or more teams are tied in points during the regular season, the standing of the clubs is determined in the following order:</div>
              <ol className={"list-decimal ml-6"}>
                <li>The fewer number of games played (GP&darr;) and thus a superior points percentage (P%&uarr;).</li>
                <li>The greater number of games won in regulation time (RW&uarr;).</li>
                <li>The greater number of games won in regulation time or overtime (ROW&uarr;).</li>
                <li>The greater number of games won in any manner (W&uarr;).</li>
              </ol>
            </div>
          </div>
        </div>
        <div className={"float-end w-full pb-4 px-20"}>
          <div className={"border border-white rounded-lg p-4"}>
            <div className={"text-white " + inter.className}>
              <div className={"font-semibold"}>Playoff Qualification</div>
              <div>
                A total of 16 teams will qualify for the Stanley Cup Playoffs.
                The top three teams in each division will make up the first 12 teams in the playoffs.
                The remaining four spots will be filled by the next two highest-placed finishers in each conference, based on regular-season record and regardless of division (as shown in the wild card Standings above).
                It is possible for one division in each conference to send five teams to the postseason while the other sends just three.
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* API FETCH CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Fetch Standings from NHL API</div>
        <div className={"m-4"}>
          <div className={"inline-block mr-4"}>Fetch current standings:</div>
          <button className={"border-black border-[1px] px-2 rounded-md"} onClick={onFetchStandings}>
            FETCH & OVERWRITE
          </button>
        </div>
      </div>

      {/* EASTERN CONFERENCE CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Eastern Conference</div>
        <div className={"m-4"}>
          {showEasternStandings()}
        </div>
      </div>

      {/* WESTERN CONFERENCE CONFIG */}
      <div className={"m-4"}>
        <div className={"text-2xl"}>Western Conference</div>
        <div className={"m-4"}>
          {showWesternStandings()}
        </div>
      </div>
    </>
  );
}