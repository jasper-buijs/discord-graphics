"use client";

import { teamFullNames } from "@/app/components/teams";
import { WesternStandingsRow, isCentralTeam, isPacificTeam } from "@/app/types";
import { Inter } from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function showWesternGraphic(westernStandings: WesternStandingsRow[]) {
  const goalDiffColorClass = (gd: number) => {
    if (gd > 0) return "text-green-800";
    else if (gd < 0) return "text-red-800";
    else return "text-gray-500";
  }

  let centralTable: JSX.Element[] = [];
  let centralStandings = westernStandings.filter(row => isCentralTeam(row.team));
  centralStandings.sort((a, b) => a.rank < b.rank ? -1 : 1);
  centralStandings = centralStandings.slice(0, 3);
  centralStandings.forEach(row => {
    centralTable.push(<>
      <tr key={row.rank}>
        <td className="font-semibold">{centralStandings.indexOf(row) + 1}</td>
        <td className="text-left font-semibold">
          <img src={`/assets/logos/${row.team}.png`} className={"inline-block align-middle h-4 w-8 object-scale-down"}/>
          {teamFullNames[row.team]}
          {
            row.playoffClinch &&
            (<div className={"w-12 ml-2 inline-block"}>
              <div className={"flex w-5 h-5 justify-center items-center bg-gray-300 text-black rounded-md"}>x</div>
            </div>)
          }
        </td>
        <td>{row.gamesPlayed}</td>
        <td>{row.won}</td>
        <td>{row.lost}</td>
        <td>{row.overtime}</td>
        <td className="font-semibold">{row.points}</td>
        <td className="text-gray-500">{Math.round(row.pointsPercentage * 100)}</td>
        <td className="text-gray-500">{row.regularWins}</td>
        <td className="text-gray-500">{row.regularOvertimeWins}</td>
        <td className="text-gray-500">{row.goalsFor}</td>
        <td className="text-gray-500">{row.goalsAgainst}</td>
        <td className={goalDiffColorClass(row.goalDiff)}>{row.goalDiff}</td>
      </tr>
    </>);
  });

  let pacificTable: JSX.Element[] = [];
  let pacificStandings = westernStandings.filter(row => isPacificTeam(row.team));
  pacificStandings.sort((a, b) => a.rank < b.rank ? -1 : 1);
  pacificStandings = pacificStandings.slice(0, 3);
  pacificStandings.forEach(row => {
    pacificTable.push(<>
      <tr key={row.rank}>
        <td className="font-semibold">{pacificStandings.indexOf(row) + 1}</td>
        <td className="text-left font-semibold">
          <img src={`/assets/logos/${row.team}.png`}
            className={"inline-block align-middle h-4 w-8 object-scale-down"}
          />
          {teamFullNames[row.team]}
          {
            row.playoffClinch &&
            (<div className={"w-12 ml-2 inline-block"}>
              <div className={"flex w-5 h-5 justify-center items-center bg-gray-300 text-black rounded-md"}>x</div>
            </div>)
          }
        </td>
        <td>{row.gamesPlayed}</td>
        <td>{row.won}</td>
        <td>{row.lost}</td>
        <td>{row.overtime}</td>
        <td className="font-semibold">{row.points}</td>
        <td className="text-gray-500">{Math.round(row.pointsPercentage * 100)}</td>
        <td className="text-gray-500">{row.regularWins}</td>
        <td className="text-gray-500">{row.regularOvertimeWins}</td>
        <td className="text-gray-500">{row.goalsFor}</td>
        <td className="text-gray-500">{row.goalsAgainst}</td>
        <td className={goalDiffColorClass(row.goalDiff)}>{row.goalDiff}</td>
      </tr>
    </>);
  });

  let wildCardTable: JSX.Element[] = [];
  let wildCardStandings = westernStandings.filter(e => !(centralStandings.includes(e) || pacificStandings.includes(e)));
  wildCardStandings.sort((a, b) => a.rank < b.rank ? -1 : 1);
  wildCardStandings.forEach(row => {
    wildCardTable.push(<>
      <tr key={row.rank}>
        <td className={wildCardStandings.indexOf(row) < 2 ? "font-semibold" : "font-normal"}>{wildCardStandings.indexOf(row) + 1}</td>
        <td className={"text-left font-semibold"}>
          <img src={`/assets/logos/${row.team}.png`}
            className={"inline-block align-middle h-4 w-8 object-scale-down"}
          />
          {teamFullNames[row.team]}
          {
            row.playoffClinch &&
            (<div className={"w-12 ml-2 inline-block"}>
              <div className={"flex w-5 h-5 justify-center items-center bg-gray-300 text-black rounded-md"}>x</div>
            </div>)
          }
        </td>
        <td>{row.gamesPlayed}</td>
        <td>{row.won}</td>
        <td>{row.lost}</td>
        <td>{row.overtime}</td>
        <td className="font-semibold">{row.points}</td>
        <td className="text-gray-500">{Math.round(row.pointsPercentage * 100)}</td>
        <td className="text-gray-500">{row.regularWins}</td>
        <td className="text-gray-500">{row.regularOvertimeWins}</td>
        <td className="text-gray-500">{row.goalsFor}</td>
        <td className="text-gray-500">{row.goalsAgainst}</td>
        <td className={goalDiffColorClass(row.goalDiff)}>{row.goalDiff}</td>
      </tr>
    </>);
  });

  return (<>
    {/* CENTRAL DIVISION */}
    <p className={"font-semibold text-white mt-2 mx-auto w-fit " + inter.className}>Central Division</p>
    <table className={"table-auto max-w-[calc(100%-2rem)] mb-4 mx-auto text-white text-center"}>
      <thead>
      <tr>
        <th className={"w-8"}>#</th>
        <th className={"min-w-[20vw] text-left"}>Team</th>
        <th className={"w-8"}>GP</th>
        <th className={"w-8"}>W</th>
        <th className={"w-8"}>L</th>
          <th className={"w-8"}>OT</th>
          <th className={"w-8"}>Pts</th>
          <th className={"w-10 text-gray-500"}>P%</th>
          <th className={"w-10 text-gray-500"}>RW</th>
          <th className={"w-10 text-gray-500"}>ROW</th>
          <th className={"w-10 text-gray-500"}>GF</th>
          <th className={"w-10 text-gray-500"}>GA</th>
          <th className={"w-10 text-gray-500"}>ΔG</th>
        </tr>
      </thead>
      <tbody>
        {centralTable}
      </tbody>
    </table>

    {/* PACIFIC DIVISION */}
    <p className={"font-semibold text-white mt-2 mx-auto w-fit " + inter.className}>Pacific Division</p>
    <table className={"table-auto max-w-[calc(100%-2rem)] mb-4 mx-auto text-white text-center"}>
      <thead>
      <tr>
        <th className={"w-8"}>#</th>
        <th className={"min-w-[20vw] text-left"}>Team</th>
        <th className={"w-8"}>GP</th>
        <th className={"w-8"}>W</th>
        <th className={"w-8"}>L</th>
        <th className={"w-8"}>OT</th>
        <th className={"w-8"}>Pts</th>
        <th className={"w-10 text-gray-500"}>P%</th>
        <th className={"w-10 text-gray-500"}>RW</th>
        <th className={"w-10 text-gray-500"}>ROW</th>
        <th className={"w-10 text-gray-500"}>GF</th>
        <th className={"w-10 text-gray-500"}>GA</th>
        <th className={"w-10 text-gray-500"}>ΔG</th>
      </tr>
      </thead>
      <tbody>
      {pacificTable}
      </tbody>
    </table>

    {/* WESTERN WILD CARD */}
    <p className={"font-semibold text-white mt-2 mx-auto w-fit " + inter.className}>Western Wild Card</p>
    <table className={"table-auto max-w-[calc(100%-2rem)] mb-4 mx-auto text-white text-center"}>
      <thead>
      <tr>
        <th className={"w-8"}>#</th>
        <th className={"min-w-[20vw] text-left"}>Team</th>
        <th className={"w-8"}>GP</th>
        <th className={"w-8"}>W</th>
        <th className={"w-8"}>L</th>
        <th className={"w-8"}>OT</th>
        <th className={"w-8"}>Pts</th>
        <th className={"w-10 text-gray-500"}>P%</th>
        <th className={"w-10 text-gray-500"}>RW</th>
        <th className={"w-10 text-gray-500"}>ROW</th>
        <th className={"w-10 text-gray-500"}>GF</th>
        <th className={"w-10 text-gray-500"}>GA</th>
        <th className={"w-10 text-gray-500"}>ΔG</th>
      </tr>
      </thead>
      <tbody>
      {wildCardTable}
      </tbody>
    </table>
  </>);
}